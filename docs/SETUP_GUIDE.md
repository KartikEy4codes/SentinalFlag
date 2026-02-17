# Setup Guide

## Prerequisites
- Node.js v16+ 
- MongoDB v5.0+
- npm or yarn
- Git

---

## Installation Steps

### 1. Clone Repository
```bash
git clone https://github.com/KartikEy4codes/SentinalFlag.git
cd sentinel-flag
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Environment
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
HOST=localhost

MONGODB_URI=mongodb://localhost:27017/sentinel-flag
JWT_SECRET=your-superSecret-key-change-in-production
JWT_EXPIRE=7d

CORS_ORIGIN=http://localhost:3000
```

#### Start MongoDB
```bash
# Using local MongoDB
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:5.0
```

#### Run Backend Server
```bash
npm run dev
```

Backend will start at: `http://localhost:5000`

---

### 3. Frontend Setup

#### Navigate to Frontend Directory
```bash
cd frontend
```

#### Install Dependencies
```bash
npm install
```

#### Configure Environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

#### Start React Dev Server
```bash
npm start
```

Frontend will start at: `http://localhost:3000`

---

## Verification

### Test Backend
```bash
# Health check
curl http://localhost:5000/health

# Should return:
# {"success":true,"message":"Server is running","timestamp":"..."}
```

### Test Frontend
Open your browser and navigate to:
```
http://localhost:3000
```

You should see the Sentinel Flag home page.

---

## Docker Setup (Optional)

### Using Docker Compose
```bash
# From project root, run:
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop services
docker-compose down
```

This will start:
- MongoDB on port 27017
- Backend API on port 5000
- Frontend on port 3000

---

## Using Docker Separately

### Backend Docker Build
```bash
cd backend
docker build -t sentinel-flag-backend .
docker run -p 5000:5000 --env-file .env sentinel-flag-backend
```

### Frontend Docker Build
```bash
cd frontend
docker build -t sentinel-flag-frontend .
docker run -p 3000:3000 sentinel-flag-frontend
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify connection string format

### CORS Issues
- Backend CORS_ORIGIN must match frontend URL
- Default: `http://localhost:3000`

### Node Modules Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Database Setup

### Create Test User
```bash
# The system will auto-create users on registration
# Or manually insert via MongoDB:

db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2a$10$...", // bcrypt hashed password
  role: "admin"
})
```

### Sample Flag Data
```bash
db.flags.insertOne({
  name: "new_dashboard",
  description: "New dashboard redesign",
  enabled: true,
  environment: "dev",
  rolloutPercentage: 50,
  tags: ["ui", "experimental"]
})
```

---

## Development Commands

### Backend
```bash
npm run dev          # Start with hot reload
npm run build        # Build for production
npm test             # Run tests
npm run lint         # Check code quality
npm run seed         # Seed database (optional)
```

### Frontend
```bash
npm start            # Start dev server
npm build            # Build production bundle
npm test             # Run component tests
npm run eject        # Eject (not reversible)
```

---

## Next Steps

1. **Create Test Data**: Register a user and create flags
2. **Explore Dashboard**: View statistics and flag management
3. **Read Documentation**: Check API_DOCUMENTATION.md
4. **Contribute**: See CONTRIBUTING.md for guidelines

---

## Support
For issues or questions, open a GitHub issue or check the documentation.
