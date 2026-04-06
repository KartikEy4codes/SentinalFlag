import os
import shutil
import re
from pathlib import Path

# Paths
FRONTEND_SRC = Path(r"c:\Users\kartikey\OneDrive\Desktop\Projects\SentinalFlag\frontend\src")

MOVES = {
    "components/Dashboard/Dashboard.jsx": "features/dashboard/components/Dashboard.jsx",
    "components/Dashboard/ChartsSection.jsx": "features/dashboard/components/ChartsSection.jsx",
    "components/FlagForm/FlagForm.jsx": "features/flags/components/FlagForm.jsx",
    "components/FlagList/FlagCard.jsx": "features/flags/components/FlagCard.jsx",
    "components/FlagList/FlagList.jsx": "features/flags/components/FlagList.jsx",
    "components/Common/Loading.jsx": "components/ui/Loading.jsx",
    "components/Common/Modal.jsx": "components/ui/Modal.jsx",
    "components/Common/Navbar.jsx": "components/layout/Navbar.jsx",
    "components/Common/Sidebar.jsx": "components/layout/Sidebar.jsx",
    "context/FlagContext.jsx": "features/flags/context/FlagContext.jsx",
    "context/AuthContext.jsx": "features/auth/context/AuthContext.jsx",
    "hooks/useFlagAPI.js": "features/flags/hooks/useFlagAPI.js",
    "hooks/useAuth.js": "features/auth/hooks/useAuth.js",
    "services/flagService.js": "features/flags/services/flagService.js",
}

# 1. First, delete any partially-refactored orphans to avoid duplicate errors:
orphans = [
    FRONTEND_SRC / "pages/DashboardPage.jsx",
    FRONTEND_SRC / "features/dashboard/components/ChartsSection.jsx",
]
for orphan in orphans:
    if orphan.exists():
        orphan.unlink()

# Build absolute move maps
abs_moves = {}
for old_rel, new_rel in MOVES.items():
    old_abs = FRONTEND_SRC / Path(old_rel)
    new_abs = FRONTEND_SRC / Path(new_rel)
    abs_moves[old_abs.resolve()] = new_abs.resolve()

def resolve_import_path(source_file, import_path):
    if not (import_path.startswith('./') or import_path.startswith('../')):
        return None
    source_dir = source_file.parent
    target_path = (source_dir / import_path).resolve()
    for ext in ['', '.js', '.jsx', '/index.js', '/index.jsx']:
        candidate = Path(str(target_path) + ext)
        if candidate.exists() and candidate.is_file():
            return candidate.resolve()
    
    # Check if target is in the moves mapping
    for old_abs in abs_moves.keys():
        if target_path == old_abs.with_suffix(''):
             return old_abs
    return None

import_pattern = re.compile(r"""(import\s+.*?from\s+['"]|import\s+['"])(.*?)(['"])""", re.DOTALL)

# Collect all files
all_files = list(FRONTEND_SRC.rglob('*.js')) + list(FRONTEND_SRC.rglob('*.jsx'))

# 2. Update contents in memory
new_contents = {}
for file_path in all_files:
    file_path_resolved = file_path.resolve()
    try:
        content = file_path_resolved.read_text(encoding='utf-8')
    except Exception:
        continue
        
    file_new_path = abs_moves.get(file_path_resolved, file_path_resolved)
    base_dir = file_new_path.parent
    
    def replacer(match):
        prefix = match.group(1)
        imp_path = match.group(2)
        suffix = match.group(3)
        
        target_abs = resolve_import_path(file_path_resolved, imp_path)
        if not target_abs:
            return match.group(0)
            
        final_target_abs = abs_moves.get(target_abs, target_abs)
        
        try:
            rel = os.path.relpath(final_target_abs, base_dir)
            rel = rel.replace('\\', '/')
            if not rel.startswith('.'):
                rel = './' + rel
            if rel.endswith('.jsx') and not imp_path.endswith('.jsx'):
                rel = rel[:-4]
            elif rel.endswith('.js') and not imp_path.endswith('.js'):
                rel = rel[:-3]
            return prefix + rel + suffix
        except ValueError:
            return match.group(0)
            
    updated_content = import_pattern.sub(replacer, content)
    new_contents[file_path_resolved] = updated_content

# 3. Write contents and move files
for file_path_resolved, updated_content in new_contents.items():
    file_new_path = abs_moves.get(file_path_resolved, file_path_resolved)
    if file_path_resolved in abs_moves:
        file_new_path.parent.mkdir(parents=True, exist_ok=True)
        file_path_resolved.unlink(missing_ok=True)
    
    file_new_path.parent.mkdir(parents=True, exist_ok=True)
    file_new_path.write_text(updated_content, encoding='utf-8')

# 4. Clean empty directories
for root, dirs, files in os.walk(FRONTEND_SRC, topdown=False):
    for d in dirs:
        dir_path = Path(root) / d
        try:
            if not any(dir_path.iterdir()):
                dir_path.rmdir()
        except:
            pass

print("Frontend refactoring complete and pristine!")
