module.exports = {
  // Flag environments
  ENVIRONMENTS: {
    DEV: 'dev',
    STAGING: 'staging',
    PRODUCTION: 'production',
  },

  // User roles
  ROLES: {
    ADMIN: 'admin',
    USER: 'user',
    VIEWER: 'viewer',
  },

  // Audit actions
  AUDIT_ACTIONS: {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    ENABLE: 'ENABLE',
    DISABLE: 'DISABLE',
  },

  // API constants
  API: {
    DEFAULT_PAGE_LIMIT: 50,
    MAX_PAGE_LIMIT: 100,
    RATE_LIMIT_WINDOW: 900000, // 15 minutes
    RATE_LIMIT_MAX_REQUESTS: 100,
  },
};
