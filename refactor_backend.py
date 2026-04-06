import os
import shutil
import re

backend_src = r"c:\Users\kartikey\OneDrive\Desktop\Projects\SentinalFlag\backend\src"
backend_scripts = r"c:\Users\kartikey\OneDrive\Desktop\Projects\SentinalFlag\backend\scripts"

moves = {
    # Auth
    r"controllers\authController.js": r"modules\auth\auth.controller.js",
    r"routes\authRoutes.js": r"modules\auth\auth.routes.js",
    r"models\User.js": r"modules\auth\user.model.js",
    
    # Flags
    r"controllers\flagController.js": r"modules\flags\flag.controller.js",
    r"routes\flagRoutes.js": r"modules\flags\flag.routes.js",
    r"services\flagService.js": r"modules\flags\flag.service.js",
    r"models\Flag.js": r"modules\flags\flag.model.js",
    r"models\FlagRule.js": r"modules\flags\flag.rule.model.js",
    
    # Audit
    r"controllers\auditController.js": r"modules\audit\audit.controller.js",
    r"routes\auditRoutes.js": r"modules\audit\audit.routes.js",
    r"models\AuditLog.js": r"modules\audit\audit.model.js"
}

# Create module directories
os.makedirs(os.path.join(backend_src, "modules", "auth"), exist_ok=True)
os.makedirs(os.path.join(backend_src, "modules", "flags"), exist_ok=True)
os.makedirs(os.path.join(backend_src, "modules", "audit"), exist_ok=True)

# 1. MOVEMENT
for old, new in moves.items():
    old_full = os.path.join(backend_src, old)
    new_full = os.path.join(backend_src, new)
    if os.path.exists(old_full):
        shutil.move(old_full, new_full)
        print(f"Moved {old} -> {new}")

# We need a robust way to update imports. Since this is an AI script, we can define the old and new import names, 
# and use regex to replace require statements. However, different files are at different depths. 
# original structure depth: 
# src/controllers/ (depth 1) -> src/modules/auth/ (depth 2)

# It's better to process each file, and just replace specific strings.
# But wait, we can't do simple string replace because depth changed.
# Actually, we can!

print("Done moving files.")
