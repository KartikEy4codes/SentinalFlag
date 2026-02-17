require('express-async-errors');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const config = require('./config/env');
const connectDB = require('./config/database');
const {
  errorHandler,
  requestLogger,
  notFound,
} = require('./middleware/errorHandler');

const flagRoutes = require('./routes/flagRoutes');
const authRoutes = require('./routes/authRoutes');
const auditRoutes = require('./routes/auditRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet());
app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(morgan('combined'));
app.use(requestLogger);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/flags', flagRoutes);
app.use('/api/audit', auditRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

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

module.exports = app;
