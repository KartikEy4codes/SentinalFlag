# System Architecture

## Overview
Sentinel Flag uses a modern MERN (MongoDB, Express, React, Node.js) stack with a clear separation of concerns following best practices for scalable applications.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│              Client Layer (React)                    │
│  Dashboard │ Components │ State Management │ Pages   │
└────────────────────┬────────────────────────────────┘
                     │ HTTP/REST
┌────────────────────▼────────────────────────────────┐
│           API Gateway (Express.js)                   │
│  Routes │ Middleware │ Error Handling │ Validation   │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│      Business Logic Layer (Controllers)              │
│  Flag Logic │ Auth Logic │ Audit Logic              │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│        Data Access Layer (Services)                  │
│  Flag Service │ User Service │ Audit Service        │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│      Database Layer (MongoDB)                        │
│  Collections │ Indexes │ Relationships              │
└─────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Component Hierarchy
```
App
├── AuthProvider (Context)
├── FlagProvider (Context)
├── Navbar
└── Routes
    ├── Home (Public)
    ├── LoginPage (Public)
    └── FlagsPage (Protected)
        ├── Dashboard
        ├── FlagList
        │   └── FlagCard (x N)
        ├── FlagForm
        ├── Modal
        └── Filters
```

### State Management
- **Global State**: AuthContext, FlagContext (using React Context API)
- **Local State**: Component-level useState
- **Server State**: Fetched via custom hooks (useFetch, useFlagAPI)
- **Storage**: LocalStorage for auth tokens

### Data Flow
```
User Action → Hook → Service → API → Server
    ↓                                      ↓
UI Update ← Context/State Update ← Response Processing
```

---

## Backend Architecture

### Request/Response Flow
```
Incoming Request
        ↓
Router (flagRoutes.js)
        ↓
Authentication Middleware
        ↓
Authorization Middleware
        ↓
Validation Middleware
        ↓
Controller (flagController.js)
        ↓
Service/Business Logic
        ↓
Model (Flag.js)
        ↓
MongoDB Query
        ↓
Audit Log Creation
        ↓
Response ← Controllers send JSON
```

### Module Structure

#### Routes (`/routes`)
- Handle HTTP methods and URL paths
- Apply middleware and route to controllers
- Separate routes by domain (flags, auth, audit)

#### Controllers (`/controllers`)
- Receive parsed requests from routes
- Orchestrate business logic
- Format and send responses
- Handle error catching

#### Models (`/models`)
- Define MongoDB schemas
- Add data validation
- Create indexes for performance
- Include methods for data manipulation

#### Middleware (`/middleware`)
- Authentication & Authorization
- Input validation
- Error handling
- Request logging

#### Config (`/config`)
- Database connection setup
- Environment variables
- Application constants

---

## Data Models

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin | user | viewer),
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Flag Model
```javascript
{
  _id: ObjectId,
  name: String (unique),
  description: String,
  enabled: Boolean,
  environment: String (dev | staging | production),
  rolloutPercentage: Number (0-100),
  targetUsers: Array[String],
  tags: Array[String],
  createdBy: ObjectId (ref: User),
  updatedBy: ObjectId (ref: User),
  metadata: Map,
  createdAt: Date,
  updatedAt: Date
}
```

### AuditLog Model
```javascript
{
  _id: ObjectId,
  action: String (CREATE | UPDATE | DELETE | ENABLE | DISABLE),
  flagId: ObjectId (ref: Flag),
  flagName: String,
  userId: ObjectId (ref: User),
  userName: String,
  changes: Map {
    fieldName: { old: value, new: value }
  },
  ipAddress: String,
  status: String (success | failed),
  createdAt: Date
}
```

### FlagRule Model
```javascript
{
  _id: ObjectId,
  flagId: ObjectId (ref: Flag),
  ruleType: String (USER_SEGMENT | PERCENTAGE_ROLLOUT | TIME_BASED | CUSTOM),
  condition: Object,
  enabled: Boolean,
  priority: Number,
  createdAt: Date
}
```

---

## API Design

### RESTful Principles
- **GET** - Retrieve resources
- **POST** - Create new resources
- **PUT** - Replace/update existing resources
- **PATCH** - Partial updates
- **DELETE** - Remove resources

### Response Format
```json
{
  "success": true|false,
  "message": "Human-readable message",
  "data": { /* actual data */ },
  "error": "Error details (if applicable)"
}
```

### Error Handling
- 4xx - Client errors (validation, auth, not found)
- 5xx - Server errors (database, processing)
- Consistent error response format
- Detailed error messages for debugging

---

## Authentication Flow

### Registration
```
User enters details
    ↓
Validate input
    ↓
Hash password with bcrypt
    ↓
Save user to MongoDB
    ↓
Generate JWT token
    ↓
Return token and user data
```

### Login
```
User enters credentials
    ↓
Find user by email
    ↓
Compare password with bcrypt
    ↓
Generate JWT token
    ↓
Update lastLogin
    ↓
Return token
```

### Protected Request
```
Client sends request with JWT
    ↓
Verify JWT signature
    ↓
Extract user ID from token
    ↓
Load user from database
    ↓
Check authorization (role)
    ↓
Allow request to proceed
```

---

## Database Indexing Strategy

### Performance Optimizations
```javascript
// Flag collection indexes
db.flags.createIndex({ environment: 1, enabled: 1 })
db.flags.createIndex({ name: "text", description: "text" })

// AuditLog collection indexes
db.auditlogs.createIndex({ flagId: 1, createdAt: -1 })
db.auditlogs.createIndex({ userId: 1, createdAt: -1 })

// User collection indexes
db.users.createIndex({ email: 1 }, { unique: true })
```

---

## Caching Strategy

### Current Implementation
- **In-Memory Cache**: The backend maintains a `Map` of all active feature flags.
- **Initialization**: Cache is populated when the server starts.
- **Refresh Mechanism**: The cache is automatically updated after any CRUD operation (Create, Update, Delete, Toggle).
- **Performance**: High-speed flag evaluation without database lookups.

---

## Gradual Rollout & Evaluation Logic

### Evaluation Function
Flags are evaluated based on the `strategyType` and user context:

1.  **Percentage Rollout**: 
    - Uses a hash of the `userId` (if provided) to determine a stable assignment.
    - If no `userId`, falls back to random assignment.
    - `(hash % 100) < flag.rolloutPercentage` determines if the feature is enabled.
2.  **User Targeting**: 
    - Explicitly checks if the `userId` is present in the `targetUsers` list.
3.  **Canary Evaluation**: 
    - Canaries are managed via small rollout percentages (e.g., 1-5%) or specific targeting rules.

---

## Security Architecture

### Authentication
- JWT tokens with expiration
- Bcrypt password hashing (10 rounds)
- Secure token storage in localStorage

### Authorization
- Role-based access control (RBAC)
- Middleware-based permission checks
- Admin-only operations for flag management

### Data Protection
- Input validation at all entry points
- SQL injection prevention via MongoDB
- CORS configured for trusted origins
- Helmet.js for HTTP security headers

### Audit Trail
- All flag changes logged
- User tracking for accountability
- Timestamp and IP recording

---

## Scalability Considerations

### Horizontal Scaling
- Stateless API design allows load balancing
- MongoDB connection pooling
- Session management via Redis (future)

### Vertical Scaling
- Efficient database queries with indexes
- Pagination for large datasets
- Rate limiting to prevent abuse

### Future Optimizations
- Microservices architecture
- GraphQL API layer
- Distributed caching
- Event-driven architecture

---

## Deployment Architecture

### Current (Single Server)
```
Docker Container (App)
├── Node.js Backend
└── React Frontend (Static)
     ↓
MongoDB Container
```

### Future (Kubernetes)
```
Kubernetes Cluster
├── API Pods (Load Balanced)
├── Frontend CDN
├── MongoDB StatefulSet
├── Redis Cache
└── Monitoring Stack
```

---

## Monitoring & Logging

### Implemented
- Morgan request logging
- Console error logs
- Application health endpoint

### Planned
- Structured JSON logging
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Distributed tracing

---

## Technology Rationale

| Technology | Reason |
|------------|--------|
| Express.js | Lightweight, ideal for REST APIs |
| MongoDB | Flexible schema, easy scaling |
| React | Component-based, rich ecosystem |
| JWT | Stateless, scalable authentication |
| Bcrypt | Standard password hashing |
| Mongoose | Schema validation, ODM features |

---

## Future Enhancements

1. **Real-time Updates**: Socket.io for live flag synchronization
2. **Advanced Targeting**: Segment-based rule engine
3. **Analytics**: Flag usage statistics and trends
4. **SDKs**: Client libraries for JS, Python, Go
5. **API Versioning**: Support multiple API versions
6. **Webhook System**: Event-driven integrations

---

**Last Updated**: Feb 17, 2026 | **Version**: 0.2.0
