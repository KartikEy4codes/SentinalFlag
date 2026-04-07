# 🚩 Sentinel Flag – Feature Flag Management

## What is it?
Sentinel Flag is a system to **turn features ON or OFF** without restarting your app. You can enable new features for some users and disable them for others - all in real-time.

## Real-World Example
```
Instead of: Push new code → Deploy → Restart server
You do: Click a button → Feature is ON/OFF instantly
```

---

## How It Works

### Simple Flow
```
1. You CREATE a Flag (example: "dark-mode")
2. You SET it to "enabled: true"  
3. Your app CHECKS if the flag is enabled
4. Feature shows up based on the flag status
5. You can TOGGLE it ON/OFF anytime without redeploying
```

### Real-Time Updates
- Server watches the database for changes
- When you toggle a flag, it updates instantly
- All users see the change immediately

---

## Setup (Quick Start)

### 1. Install & Run Backend
```bash
cd backend
npm install
npm start
// this will start the frontend.
```
Backend runs on: **http://localhost:5000**

### 2. Install & Run Frontend  
```bash
cd frontend
npm install
npm start
```
Frontend runs on: **http://localhost:3000**

### 3. Configure Database
Create `.env` file in backend folder:
```
MONGODB_URI=mongodb://localhost:27017/sentinel-flag
JWT_SECRET=your-secret-key
PORT=5000
```

---

## How to Access Routes

### Step 1: Register & Login

**Register User:**
```
POST http://localhost:5000/api/auth/register
Body: { "name": "Admin", "email": "admin@example.com", "password": "pass123", "role": "admin" }
```

**Login (Get Token):**
```
POST http://localhost:5000/api/auth/login
Body: { "email": "admin@example.com", "password": "pass123" }
Response: { "token": "eyJhbGci..." }
```
**Save this token! You'll need it for all other requests.**

---

### Step 2: Create a Flag

**Create Flag:**
```
POST http://localhost:5000/api/flags
Headers: Authorization: Bearer TOKEN
Body: {
  "name": "dark-mode",
  "description": "Toggle dark mode",
  "enabled": false,
  "environment": "Prod",
  "rolloutPercentage": 50,
  "strategyType": "percentage",
  "tags": ["ui"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "123abc",
    "name": "dark-mode",
    "enabled": false,
    ...
  }
}
```

---

### Step 3: Get All Flags

**Get All Flags:**
```
GET http://localhost:5000/api/flags
Headers: Authorization: Bearer TOKEN
```

**With Filters:**
```
GET http://localhost:5000/api/flags?environment=Prod&enabled=true
GET http://localhost:5000/api/flags?search=dark
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    { "name": "dark-mode", "enabled": false, ... },
    { "name": "new-dashboard", "enabled": true, ... }
  ]
}
```

---

### Step 4: Enable/Disable a Flag

**Toggle Flag (ON → OFF or OFF → ON):**
```
PATCH http://localhost:5000/api/flags/FLAG_ID/toggle
Headers: Authorization: Bearer TOKEN
```

**Update Flag (Set exact values):**
```
PUT http://localhost:5000/api/flags/FLAG_ID
Headers: Authorization: Bearer TOKEN
Body: {
  "enabled": true,
  "rolloutPercentage": 75
}
```

---

### Step 5: Delete a Flag

**Delete Flag:**
```
DELETE http://localhost:5000/api/flags/FLAG_ID
Headers: Authorization: Bearer TOKEN
```

---

### Step 6: View Audit Logs

**Get All Changes:**
```
GET http://localhost:5000/api/audit
Headers: Authorization: Bearer TOKEN
```

**View Who Made Changes:**
```json
{
  "action": "UPDATE",
  "flagName": "dark-mode",
  "userName": "Admin",
  "changes": { "enabled": { "old": false, "new": true } },
  "timestamp": "2026-03-27T10:15:00Z"
}
```

---

## Use Flags in Frontend

### Method 1: Fetch Flags (React)

```javascript
useEffect(() => {
  const fetchFlags = async () => {
    const response = await fetch('http://localhost:5000/api/flags', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    setFlags(data.data); // Store flags
  };
  
  fetchFlags();
}, []);

// Use in Component
{flags.find(f => f.name === 'dark-mode')?.enabled ? (
  <DarkMode />
) : (
  <LightMode />
)}
```

### Method 2: Check if Feature is Enabled

```javascript
const isEnabled = (flagName) => {
  const flag = flags.find(f => f.name === flagName);
  return flag?.enabled || false;
};

// Use it
{isEnabled('new-dashboard') && <NewDashboard />}
{isEnabled('beta-feature') && <BetaFeature />}
```

### Method 3: With User Targeting

```javascript
const isEnabledForUser = (flagName, userId) => {
  const flag = flags.find(f => f.name === flagName);
  
  if (!flag?.enabled) return false;
  
  // Percentage-based (50% of users)
  if (flag.rolloutPercentage) {
    const hash = userId.charCodeAt(0) % 100;
    return hash < flag.rolloutPercentage;
  }
  
  return true;
};

// Use it
{isEnabledForUser('premium-feature', userId) && <PremiumUI />}
```

---

## API Routes Summary

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/register` | POST | Create new user |
| `/api/auth/login` | POST | Get JWT token |
| `/api/flags` | GET | Get all flags |
| `/api/flags` | POST | Create new flag |
| `/api/flags/:id` | GET | Get one flag |
| `/api/flags/:id` | PUT | Update flag |
| `/api/flags/:id` | DELETE | Delete flag |
| `/api/flags/:id/toggle` | PATCH | Toggle ON/OFF |
| `/api/audit` | GET | View all changes |
| `/health` | GET | Check if server is running |

---

## Quick Test (Terminal)

### 1. Check if Backend is Running
```bash
curl http://localhost:5000/health
```
Response: `{"success":true,"message":"Server is running"}`

### 2. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@example.com","password":"pass123","role":"admin"}'
```

### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"pass123"}'
```
Copy the `token` from response

### 4. Create a Flag
```bash
curl -X POST http://localhost:5000/api/flags \
  -H "Authorization: Bearer TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"name":"my-feature","enabled":true,"environment":"Dev","rolloutPercentage":50,"strategyType":"percentage"}'
```

### 5. Get All Flags
```bash
curl -X GET http://localhost:5000/api/flags \
  -H "Authorization: Bearer TOKEN_HERE"
```

---

## Common Scenarios

### Scenario 1: Gradual Rollout
1. Create flag `new-dashboard` with `enabled: false`
2. Enable for 10% of users (`rolloutPercentage: 10`)
3. Wait a week, increase to 50%
4. Wait a week, increase to 100%
5. Everyone has the feature!

### Scenario 2: Emergency Disable
1. A bug appears in production
2. Go to flag dashboard
3. Click "Disable" on `payment-processing` flag
4. Feature turns OFF instantly
5. No server restart needed!

### Scenario 3: Beta Testing
1. Create flag `beta-feature` with `enabled: true`
2. Add beta tester user IDs to targeting
3. Only those users see the feature
4. Get feedback safely

---

## Project Structure

```
SentinalFlag/
├── backend/           ← Node.js server
│   ├── src/
│   │   ├── controllers/    (Handle requests)
│   │   ├── routes/         (API paths)
│   │   ├── models/         (Database schemas)
│   │   └── services/       (Business logic)
│   └── package.json
│
├── frontend/          ← React dashboard
│   ├── src/
│   │   ├── components/     (UI components)
│   │   ├── pages/          (Pages)
│   │   ├── services/       (API calls)
│   │   └── hooks/          (React hooks)
│   └── package.json
│
└── README.md          ← This file
```

---

## Troubleshooting

### Backend won't start?
- Check MongoDB is running
- Check `.env` file has `MONGODB_URI`
- Check port 5000 isn't in use

### Token expired?
- Login again to get a new token
- Tokens last 7 days by default

### Flag not showing?
- Make sure flag `enabled: true`
- Make sure you have the right JWT token
- Check browser console for errors

---

## Next Steps

 taskkill /F /IM node.exe
1. ✅ Backend running on http://localhost:5000
2. ✅ Frontend running on http://localhost:3000
3. 📝 Create your first flag
4. 🔌 Connect flags to your components
5. 🎉 Toggle features without redeploying!

---

**That's it! You now know how to use Sentinel Flag.** 🎯
