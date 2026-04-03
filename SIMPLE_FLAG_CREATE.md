# ⚡ Simple Flag Creation

## The Absolute Minimum (Simplest Flag)

```json
{
  "name": "my-feature",
  "enabled": true,
  "environment": "Dev",
  "rolloutPercentage": 100,
  "strategyType": "percentage"
}
```

That's it! This creates a flag with only required fields.

---

## What Each Field Means

| Field | Value | Meaning |
|-------|-------|---------|
| **name** | `"my-feature"` | Flag identifier (unique name) |
| **enabled** | `true` | Feature is ON |
| **environment** | `"Dev"` | For development environment |
| **rolloutPercentage** | `100` | Available to 100% of users |
| **strategyType** | `"percentage"` | Use percentage-based rollout |

---

## How to Create It (Step-by-Step)

### 1. Get Your Token (Login First)
```
POST http://localhost:5000/api/auth/login
Body: {
  "email": "admin@example.com",
  "password": "AdminPass123"
}
Response: { "token": "eyJhbGci..." }
```
**Save the token**

### 2. Create the Flag
```
POST http://localhost:5000/api/flags
Headers: Authorization: Bearer TOKEN
Body: {
  "name": "my-feature",
  "enabled": true,
  "environment": "Dev",
  "rolloutPercentage": 100,
  "strategyType": "percentage"
}
```

### 3. You're Done! ✅
Flag is created and ready to use.

---

## Add Optional Fields (If Needed)

### With Description
```json
{
  "name": "my-feature",
  "description": "This is my first feature",
  "enabled": true,
  "environment": "Dev",
  "rolloutPercentage": 100,
  "strategyType": "percentage"
}
```

### With Tags
```json
{
  "name": "my-feature",
  "description": "This is my first feature",
  "enabled": true,
  "environment": "Dev",
  "rolloutPercentage": 100,
  "strategyType": "percentage",
  "tags": ["test", "new"]
}
```

---

## Real-World Examples

### Example 1: Turn ON a Feature for Everyone
```json
{
  "name": "dark-mode",
  "enabled": true,
  "environment": "Prod",
  "rolloutPercentage": 100,
  "strategyType": "percentage"
}
```

### Example 2: Rollout to 50% of Users
```json
{
  "name": "new-dashboard",
  "enabled": true,
  "environment": "Prod",
  "rolloutPercentage": 50,
  "strategyType": "percentage"
}
```

### Example 3: Turn OFF a Feature (Emergency Kill Switch)
```json
{
  "name": "payment-system",
  "enabled": false,
  "environment": "Prod",
  "rolloutPercentage": 0,
  "strategyType": "percentage"
}
```

### Example 4: Slow Rollout (Start at 10%)
```json
{
  "name": "experimental-feature",
  "enabled": true,
  "environment": "Prod",
  "rolloutPercentage": 10,
  "strategyType": "percentage"
}
```

---

## Using cURL (Terminal)

Save token to variable:
```bash
TOKEN="your-token-here"
```

Create flag:
```bash
curl -X POST http://localhost:5000/api/flags \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-feature",
    "enabled": true,
    "environment": "Dev",
    "rolloutPercentage": 100,
    "strategyType": "percentage"
  }'
```

---

## That's All You Need! 🎉

Create → Enable → Done!

Your flag is now ready to use in your app.
