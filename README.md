# ?? Sentinel Flag

A lightweight feature flag management application with a React frontend and a Node/Express backend.

It lets you create, update, and toggle feature flags in real time, including:
- percentage rollout flags
- user targeting flags
- environment filtering
- audit logging for flag changes

---

## Project Structure

```
SentinalFlag/
+-- backend/                # Express API server
¦   +-- src/
¦   ¦   +-- app.js          # Express app configuration
¦   ¦   +-- server.js       # Entry point and DB startup
¦   ¦   +-- config/         # Environment and database setup
¦   ¦   +-- middleware/     # Auth, validation, error handling
¦   ¦   +-- modules/
¦   ¦       +-- auth/       # User auth and registration
¦   ¦       +-- flags/      # Flag CRUD and evaluation logic
¦   ¦       +-- audit/      # Audit logging and history
¦   +-- package.json
+-- frontend/               # React app
¦   +-- public/
¦   +-- src/
¦   ¦   +-- components/     # Shared UI components
¦   ¦   +-- features/       # Auth, flags, dashboard modules
¦   ¦   +-- pages/          # Main page views
¦   ¦   +-- services/       # API client setup
¦   ¦   +-- styles/         # Tailwind and global CSS
¦   +-- package.json
+-- README.md
```

---

## How the App Works

### Backend flow
1. Client authenticates with `/api/auth/login`.
2. The backend validates requests with JWT middleware.
3. The flag API stores flags in MongoDB and refreshes the in-memory cache.
4. Created and updated flags are served by the API.
5. The backend supports:
   - `percentage` rollout
   - `user-targeting`
   - `branch-based` strategy metadata
6. Audit entries track who changed which flag.

### Frontend flow
1. Users sign in and the frontend loads user context.
2. The dashboard fetches flags from `/api/flags`.
3. Admin users can create, update, toggle, or delete flags.
4. The flag state drives UI behavior for feature visibility.

---

## Setup

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
# Update .env values if needed
npm run dev
```

The backend runs at `http://localhost:5000`.

### 2. Frontend
```bash
cd frontend
npm install
npm start
```

The frontend runs at `http://localhost:3000`.

---

## Backend Environment Variables

Copy `backend/.env.example` to `backend/.env`.

Important values:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `PORT` - Backend port (default `5000`)
- `CORS_ORIGIN` - Frontend origin (default `http://localhost:3000`)

---

## Testing the Project

### 1. Manual UI testing
- Start backend and frontend.
- Register or log in from the app.
- Create a new feature flag.
- Toggle `enabled` and verify the update.
- Use `percentage` and `user-targeting` options to confirm behavior.

### 2. Percentage rollout
- Set `strategyType` to `percentage`.
- Use `rolloutPercentage` = `0` to force off.
- Use `100` to force on.
- Use values like `50` to enable the flag for approximately half of users.

### 3. User targeting
- Set `strategyType` to `user-targeting`.
- Enter comma-separated user IDs in `Target Users`.
- The backend checks the authenticated user's ID against that list.
- If the current user ID is included, the flag becomes active for that user.

### 4. API testing
Use a tool like Postman or `curl` to verify endpoints.

Example:
```bash
curl -X GET http://localhost:5000/api/flags \
  -H "Authorization: Bearer <TOKEN>"
```

---

## API Reference

| Route | Method | Purpose |
|---|---|---|
| `/api/auth/register` | POST | Register a new user |
| `/api/auth/login` | POST | Login and receive JWT |
| `/api/auth/me` | GET | Get current authenticated user |
| `/api/auth/users` | GET | List users (admin only) |
| `/api/flags` | GET | Get all flags |
| `/api/flags` | POST | Create a new flag |
| `/api/flags/:id` | GET | Get a single flag |
| `/api/flags/:id` | PUT | Update a flag |
| `/api/flags/:id/toggle` | PATCH | Toggle a flag |
| `/api/flags/:id` | DELETE | Delete a flag |
| `/api/audit` | GET | Get audit logs |
| `/api/audit/stats/summary` | GET | Get audit summary stats |

---

## Notes
- The backend uses in-memory caching for flags and refreshes it after changes.
- `user-targeting` compares the authenticated user ID to the flag's `targetUsers` list.
- The frontend supports flag creation, listing, and toggling through the dashboard.
- Automated tests are not currently defined in the repo; manual testing via UI and API is the recommended approach.
