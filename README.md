# 🚩 Sentinel Flag – Flag Management System

## 📌 Overview
**Sentinel Flag** is a Flag Management System designed to efficiently manage, monitor, and control feature flags within an application. It enables dynamic activation and deactivation of features without redeploying the application, improving flexibility, testing workflows, and production stability.

---

## 🎯 Purpose
Modern applications require controlled feature rollouts, A/B testing, and emergency feature toggling. Sentinel Flag provides:
- **Centralized feature flag control**
- **Runtime configuration changes**
- **Safe feature deployment**
- **Controlled experimentation**

---

## ⚙️ Features
✅ **Create, update, and delete flags**  
✅ **Enable/Disable features dynamically**  
✅ **Environment-based flag control** (Dev / Staging / Prod)  
✅ **Role-based or user-based flag targeting**  
✅ **Persistent flag storage** (MongoDB)  
✅ **Real-time synchronization** via Change Streams  
✅ **Simple and scalable architecture**  

---

## 🏗️ System Architecture
The system follows a modular design:
**Client → API Layer → Flag Controller → Storage Layer**

1. **API Layer** – Handles incoming requests and authentication (JWT).
2. **Flag Controller** – Business logic for flag evaluation and cache management.
3. **Storage Layer** – MongoDB database with Change Stream integration for real-time updates.

---

## � Use Cases
- **Gradual feature rollout**
- **A/B testing**
- **Emergency feature kill-switch**
- **Beta feature access control**
- **Environment-specific configurations**

---

## 🛠️ Tech Stack
- **Backend**: Node.js / Express.js
- **Database**: MongoDB (Replica Set required for Real-Time Engine)
- **API**: RESTful services
- **Version Control**: Git & GitHub

---

## 📂 Project Structure
```
sentinel-flag/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Flag logic & Cache sync
│   │   ├── services/       # Business logic
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API endpoints
│   │   └── config/         # Database & Env config
├── frontend/               # React Dashboard
├── docs/                   # Documentation
└── package.json            # Project manifest
```

---

## � Installation
```bash
git clone https://github.com/KartikEy4codes/SentinalFlag.git
cd sentinel-flag
npm install
```

---

## 📡 Example Usage
```javascript
// Example logic in the application
if (isFeatureEnabled("new-dashboard")) {
  showNewDashboard();
} else {
  showOldDashboard();
}
```

---

## 📈 Future Enhancements
- **Dashboard UI** for flag monitoring
- **Analytics** for flag usage tracking
- **Real-time flag updates** (Completed in v0.3.0)
- **Distributed caching support** (Redis)

---

## 🤝 Contribution
Contributions are welcome!
1. **Fork the repository**
2. **Create a feature branch**
3. **Commit your changes**
4. **Open a Pull Request**

---

## � License
This project is open-source and available under the [MIT License](./LICENSE).

---

## 📌 Project Update: Real-Time Feature Flag Engine (30% Milestone)

This update covers the completion of the core engine, which allows for turning features ON or OFF for users instantly without needing a server restart.

### What the Code Does:
- **"Watch" Mode**: The server stays connected to MongoDB and monitors the database for any changes to the feature flags using Change Streams.
- **Instant Synchronization**: The moment a flag is toggled in the database, the server updates its internal cache instantly.
- **Smart Targeting**: The system evaluates specific rules (like userId) to decide access.
- **High Speed**: All flags are served from memory (RAM), ensuring evaluations in **<1ms**.

### Overall Workflow:
1. **Update**: A flag is updated in the MongoDB database.
2. **Detection**: MongoDB sends a "Change Alert" to the Node.js Server.
3. **Sync**: The server automatically updates its Internal Cache.
4. **Evaluation**: When a request comes in, the server checks the cache to instantly decide access.

---
**Version**: 0.3.0 | **Last Updated**: Feb 21, 2026 | **Status**: � Active Development
