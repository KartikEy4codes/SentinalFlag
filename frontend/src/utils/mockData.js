// Mock data service for demo/presentation purposes
export const mockFlags = [
  {
    _id: '1',
    name: 'Dark Mode Feature',
    description: 'Enable dark mode toggle for users',
    enabled: true,
    rolloutPercentage: 100,
    environment: 'production',
    targetSegments: ['beta-users', 'team'],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '2',
    name: 'New Checkout Flow',
    description: 'Optimized checkout process with stripe integration',
    enabled: true,
    rolloutPercentage: 45,
    environment: 'production',
    targetSegments: ['mobile-users'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '3',
    name: 'AI Chat Assistant',
    description: 'AI-powered chat support system',
    enabled: false,
    rolloutPercentage: 0,
    environment: 'staging',
    targetSegments: [],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    lastModified: new Date(),
  },
  {
    _id: '4',
    name: 'Advanced Analytics',
    description: 'New analytics dashboard with real-time metrics',
    enabled: true,
    rolloutPercentage: 20,
    environment: 'production',
    targetSegments: ['premium-users'],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '5',
    name: 'Social Login Integration',
    description: 'Google, GitHub, and Microsoft OAuth support',
    enabled: true,
    rolloutPercentage: 100,
    environment: 'production',
    targetSegments: ['all-users'],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    lastModified: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '6',
    name: 'Email Notifications v2',
    description: 'Redesigned email notification system',
    enabled: false,
    rolloutPercentage: 0,
    environment: 'development',
    targetSegments: [],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '7',
    name: 'Mobile App Redesign',
    description: 'New mobile app UI and UX improvements',
    enabled: true,
    rolloutPercentage: 60,
    environment: 'production',
    targetSegments: ['ios-users', 'android-users'],
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];

export const mockUser = {
  _id: 'user-123',
  email: 'admin@sentinelflag.dev',
  name: 'Admin User',
  role: 'admin',
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
};

export const mockStats = {
  totalFlags: mockFlags.length,
  enabledFlags: mockFlags.filter((f) => f.enabled).length,
  disabledFlags: mockFlags.filter((f) => !f.enabled).length,
  recentChanges: 12,
  avgRollout: Math.round(
    mockFlags.reduce((sum, f) => sum + f.rolloutPercentage, 0) / mockFlags.length
  ),
};

export const getMockAuthToken = () => {
  return 'mock-jwt-token-' + Date.now();
};
