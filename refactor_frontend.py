import os
import shutil
import re

frontend_src = r"c:\Users\kartikey\OneDrive\Desktop\Projects\SentinalFlag\frontend\src"

moves = {
    r"components\Dashboard\Dashboard.jsx": r"pages\DashboardPage.jsx",
    r"components\FlagForm\FlagForm.jsx": r"features\flags\components\FlagForm.jsx",
    r"components\FlagList\FlagCard.jsx": r"features\flags\components\FlagCard.jsx",
    r"components\FlagList\FlagList.jsx": r"features\flags\components\FlagList.jsx",
    r"hooks\useFlagAPI.js": r"features\flags\hooks\useFlagAPI.js",
    r"services\flagService.js": r"features\flags\services\flagService.js",
    r"context\FlagContext.jsx": r"features\flags\context\FlagContext.jsx",
    r"hooks\useAuth.js": r"features\auth\hooks\useAuth.js",
    r"context\AuthContext.jsx": r"features\auth\context\AuthContext.jsx",
    r"components\Common\Loading.jsx": r"components\ui\Loading.jsx",
    r"components\Common\Modal.jsx": r"components\ui\Modal.jsx",
    r"components\Common\Navbar.jsx": r"components\layout\Navbar.jsx",
    r"components\Common\Sidebar.jsx": r"components\layout\Sidebar.jsx",
    r"components\Dashboard\ChartsSection.jsx": r"features\dashboard\components\ChartsSection.jsx",
}

abs_moves = {}
for old, new in moves.items():
    old_full = os.path.normpath(os.path.join(frontend_src, old))
    new_full = os.path.normpath(os.path.join(frontend_src, new))
    abs_moves[old_full] = new_full

for new_full in abs_moves.values():
    os.makedirs(os.path.dirname(new_full), exist_ok=True)

file_contents = {}
all_files = []
for root, dirs, files in os.walk(frontend_src):
    for f in files:
        if f.endswith(('.js', '.jsx', '.css')):
            path = os.path.normpath(os.path.join(root, f))
            all_files.append(path)
            try:
                with open(path, 'r', encoding='utf-8') as file:
                    file_contents[path] = file.read()
            except Exception as e:
                pass

def resolve_import(source_path, import_str):
    if not (import_str.startswith('./') or import_str.startswith('../')):
        return None
    
    import_norm = import_str.replace('/', '\\')
    base_dir = os.path.dirname(source_path)
    target_base = os.path.normpath(os.path.join(base_dir, import_norm))
    
    if target_base in all_files:
        return target_base
        
    for ext in ['.js', '.jsx', '.css']:
        target_ext = target_base + ext
        if target_ext in all_files:
            return target_ext
            
    for ext in ['.js', '.jsx']:
        target_idx = os.path.join(target_base, f'index{ext}')
        if target_idx in all_files:
            return target_idx
            
    return None

# Use DOTALL to match multiline imports: import { ... } from '...'
import_pattern = re.compile(r"""(import\s+.*?from\s+['"]|import\s+['"]|require\(['"])(.*?)(['"]\)?;)?""", re.DOTALL)

new_contents = {}
for file_path, content in file_contents.items():
    file_new_path = abs_moves.get(file_path, file_path)
    
    def replacer(match):
        prefix = match.group(1)
        imp_path = match.group(2)
        suffix = match.group(3) or ""
        
        target_old_abs = resolve_import(file_path, imp_path)
        if not target_old_abs:
            return match.group(0)
            
        target_new_abs = abs_moves.get(target_old_abs, target_old_abs)
        
        rel = os.path.relpath(target_new_abs, os.path.dirname(file_new_path))
        rel = rel.replace('\\', '/')
        if not rel.startswith('.'):
            rel = './' + rel
            
        if target_new_abs.endswith(('.js', '.jsx')):
            if rel.endswith('.js'): rel = rel[:-3]
            if rel.endswith('.jsx'): rel = rel[:-4]
            if rel.endswith('/index') and not imp_path.endswith('index'):
                rel = rel[:-6]
            if rel == './index' and not imp_path.endswith('index'):
                rel = '.'

        return prefix + rel + suffix

    new_content = import_pattern.sub(replacer, content)
    new_contents[file_path] = new_content

for old_full, new_full in abs_moves.items():
    if os.path.exists(old_full):
        shutil.move(old_full, new_full)

for old_full, content in new_contents.items():
    write_path = abs_moves.get(old_full, old_full)
    with open(write_path, 'w', encoding='utf-8') as f:
        f.write(content)

for root, dirs, files in os.walk(frontend_src, topdown=False):
    for d in dirs:
        dir_path = os.path.join(root, d)
        if not os.listdir(dir_path):
            try: os.rmdir(dir_path)
            except: pass

print("Frontend refactoring complete.")
