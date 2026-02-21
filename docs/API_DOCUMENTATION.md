# API Documentation

## Overview
Sentinel Flag REST API provides comprehensive endpoints for managing feature flags, user authentication, and audit logs.

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints (except `/auth/register` and `/auth/login`) require JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### Authentication

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

Response: 201 Created
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response: 200 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### Flags Management

#### Get All Flags
```
GET /flags?environment=dev&search=dashboard&enabled=true
Authorization: Bearer <token>

Query Parameters:
- environment: dev, staging, production
- enabled: true, false
- search: filter by name or description

Response: 200 OK
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "new_dashboard",
      "description": "New dashboard redesign",
      "enabled": true,
      "environment": "dev",
      "rolloutPercentage": 50,
      "tags": ["ui", "experimental"],
      "createdAt": "2024-02-17T10:30:00Z",
      "updatedAt": "2024-02-17T10:30:00Z"
    }
  ]
}
```

#### Get Single Flag
```
GET /flags/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "new_dashboard",
    "description": "New dashboard redesign",
    "enabled": true,
    "environment": "dev",
    "rolloutPercentage": 50,
    "tags": ["ui", "experimental"],
    "createdAt": "2024-02-17T10:30:00Z",
    "updatedAt": "2024-02-17T10:30:00Z"
  }
}
```

#### Create Flag
```
POST /flags
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "new_dashboard",
  "description": "New dashboard redesign",
  "enabled": true,
  "environment": "dev",
  "rolloutPercentage": 50,
  "tags": ["ui", "experimental"]
}

Response: 201 Created
{
  "success": true,
  "message": "Flag created successfully",
  "data": { ... }
}
```

#### Update Flag
```
PUT /flags/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "description": "Updated description",
  "rolloutPercentage": 75
}

Response: 200 OK
{
  "success": true,
  "message": "Flag updated successfully",
  "data": { ... }
}
```

#### Delete Flag
```
DELETE /flags/:id
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "success": true,
  "message": "Flag deleted successfully",
  "data": { ... }
}
```

#### Toggle Flag Status
```
PATCH /flags/:id/toggle
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "success": true,
  "message": "Flag enabled successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "enabled": true,
    ...
  }
}
```

---

### Audit Logs

#### Get Audit Logs
```
GET /audit?page=1&limit=50&flagId=507f1f77bcf86cd799439011&action=UPDATE
Authorization: Bearer <admin_token>

Query Parameters:
- page: page number (default: 1)
- limit: items per page (default: 50)
- flagId: filter by flag ID
- userId: filter by user ID
- action: CREATE, UPDATE, DELETE, ENABLE, DISABLE

Response: 200 OK
{
  "success": true,
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 50,
    "pages": 2
  },
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "action": "UPDATE",
      "flagId": "507f1f77bcf86cd799439011",
      "flagName": "new_dashboard",
      "userId": "507f1f77bcf86cd799439013",
      "userName": "John Doe",
      "changes": {
        "enabled": { "old": false, "new": true }
      },
      "createdAt": "2024-02-17T10:35:00Z"
    }
  ]
}
```

#### Get Audit Statistics
```
GET /audit/stats/summary
Authorization: Bearer <admin_token>

Response: 200 OK
{
  "success": true,
  "data": {
    "stats": [
      { "_id": "UPDATE", "count": 45 },
      { "_id": "CREATE", "count": 12 },
      { "_id": "DELETE", "count": 3 }
    ],
    "totalLogs": 60,
    "successLogs": 58,
    "failedLogs": 2
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["Flag name is required"]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "User role 'user' is not authorized to access this resource"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Flag not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Rate Limiting
- Default: 100 requests per 15 minutes per IP
- Limit exceeded returns 429 Too Many Requests

---

## Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Create Flag
```bash
curl -X POST http://localhost:5000/api/flags \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name":"new_feature",
    "description":"A new feature",
    "enabled":true,
    "environment":"dev"
  }'
```

---

## SDK Integration (Coming Soon)
SDKs for JavaScript, Python, and Go will be available for easy client-side integration.
