const app = require('./app');
const config = require('./config/env');
const connectDB = require('./config/database');
const { initChangeStream } = require('./modules/flags/flag.service');

// Connect to database
connectDB().then(() => {
  // Initialize real-time flag engine
  initChangeStream();
});

// Start server
const PORT = config.PORT;
const HOST = config.HOST;

app.listen(PORT, HOST, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║     🚩 SENTINEL FLAG - Backend Server          ║
╠════════════════════════════════════════════════╣
║  Server:  ${config.NODE_ENV.toUpperCase()}
║  Host:    http://${HOST}:${PORT}
║  Env:     ${config.NODE_ENV}
║  Status:  ✅ Running
╚════════════════════════════════════════════════╝
  `);
});
