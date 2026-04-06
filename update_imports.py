import os

backend_src = r"c:\Users\kartikey\OneDrive\Desktop\Projects\SentinalFlag\backend\src"
scripts_dir = r"c:\Users\kartikey\OneDrive\Desktop\Projects\SentinalFlag\backend\scripts"

replacements = {
    os.path.join(backend_src, "server.js"): [
        ("require('./routes/flagRoutes')", "require('./modules/flags/flag.routes')"),
        ("require('./routes/authRoutes')", "require('./modules/auth/auth.routes')"),
        ("require('./routes/auditRoutes')", "require('./modules/audit/audit.routes')"),
        ("require('./services/flagService')", "require('./modules/flags/flag.service')")
    ],
    os.path.join(backend_src, r"modules\flags\flag.service.js"): [
        ("require('../models/Flag')", "require('./flag.model')")
    ],
    os.path.join(backend_src, r"modules\flags\flag.routes.js"): [
        ("require('../controllers/flagController')", "require('./flag.controller')"),
        ("require('../middleware/authMiddleware')", "require('../../middleware/authMiddleware')"),
        ("require('../middleware/validation')", "require('../../middleware/validation')")
    ],
    os.path.join(backend_src, r"modules\flags\flag.controller.js"): [
        ("require('../models/Flag')", "require('./flag.model')"),
        ("require('../models/AuditLog')", "require('../audit/audit.model')"),
        ("require('../services/flagService')", "require('./flag.service')")
    ],
    os.path.join(backend_src, r"modules\auth\auth.routes.js"): [
        ("require('../controllers/authController')", "require('./auth.controller')"),
        ("require('../middleware/authMiddleware')", "require('../../middleware/authMiddleware')"),
        ("require('../middleware/validation')", "require('../../middleware/validation')")
    ],
    os.path.join(backend_src, r"modules\auth\auth.controller.js"): [
        ("require('../models/User')", "require('./user.model')")
    ],
    os.path.join(backend_src, r"modules\audit\audit.routes.js"): [
        ("require('../controllers/auditController')", "require('./audit.controller')"),
        ("require('../middleware/authMiddleware')", "require('../../middleware/authMiddleware')")
    ],
    os.path.join(backend_src, r"modules\audit\audit.controller.js"): [
        ("require('../models/AuditLog')", "require('./audit.model')")
    ],
    os.path.join(backend_src, r"middleware\authMiddleware.js"): [
        ("require('../models/User')", "require('../modules/auth/user.model')")
    ],
    os.path.join(scripts_dir, "test-realtime.js"): [
        ("require('./services/flagService')", "require('../src/modules/flags/flag.service')"),
        ("require('./models/Flag')", "require('../src/modules/flags/flag.model')")
    ]
}

for file_path, reps in replacements.items():
    if not os.path.exists(file_path):
        print(f"Skipping {file_path}, does not exist")
        continue
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    for old, new in reps:
        content = content.replace(old, new)
        
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {file_path}")

print("Import replacement complete.")
