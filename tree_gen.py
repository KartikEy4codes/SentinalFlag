import os

def generate_tree(startpath):
    tree_str = []
    for root, dirs, files in os.walk(startpath):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.git' in dirs:
            dirs.remove('.git')
        if 'dist' in dirs:
            dirs.remove('dist')
        if 'build' in dirs:
            dirs.remove('build')
        
        level = root.replace(startpath, '').count(os.sep)
        indent = ' ' * 4 * (level)
        tree_str.append(f'{indent}{os.path.basename(root)}/')
        subindent = ' ' * 4 * (level + 1)
        for f in files:
            tree_str.append(f'{subindent}{f}')
    return '\n'.join(tree_str)

with open('tree_utf8.txt', 'w', encoding='utf-8') as f:
    f.write(generate_tree('.'))
