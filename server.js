const express = require('express');
const mongoose = require('mongoose');
const Flag = require('./models/Flag');

const app = express();
const CACHE = new Map(); // High-speed in-memory store

// 1. Sync Logic: Load flags into memory and watch for changes
async function startEngine() {
  const flags = await Flag.find();
  flags.forEach(f => CACHE.set(f.key, f));
  console.log("✔ Cache Initialized");

  // Real-time synchronization using Change Streams
  Flag.watch().on('change', async () => {
    const updated = await Flag.find();
    CACHE.clear();
    updated.forEach(f => CACHE.set(f.key, f));
    console.log("Cache Synced with MongoDB");
  });
}

// 2. Evaluation Logic: Deterministic Hashing
function checkFeature(flagKey, user) {
  const flag = CACHE.get(flagKey);
  if (!flag || !flag.isActive) return false;

  // Rule Check: Does user email match?
  const ruleMatch = flag.rules.some(r => user.email.endsWith(r.value));
  if (ruleMatch) return true;

  // Rollout Check: Hash user ID to 0-99
  const hash = [...user.id].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 100;
  return hash < flag.rolloutPercentage;
}

// 3. API Route
app.get('/check/:feature', (req, res) => {
  const user = { id: req.query.id || '1', email: req.query.email || '' };
  const isEnabled = checkFeature(req.params.feature, user);
  res.json({ feature: req.params.feature, enabled: isEnabled });
});

// Fail-safe: Manual reload via Unix Signal
process.on('SIGHUP', () => {
  console.log("SIGHUP: Manual Cache Reloading...");
  startEngine();
});

mongoose.connect('mongodb://127.0.0.1:27017/featureflags?replicaSet=rs0')
  .then(() => {
    app.listen(3000, () => {
      startEngine();
      console.log("Server running on port 3000");
    });
  });