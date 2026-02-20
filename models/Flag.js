const mongoose = require('mongoose');

const flagSchema = new mongoose.Schema({
  key: { 
    type: String,
    required: true, 
    unique: true 
    }, // e.g., 'premium-ui'

  isActive: { 
    type: Boolean, 
    default: false 
    },        // Master switch

  rolloutPercentage: { 
    type: Number, 
    default: 0 
    },    // 0-100 gradual rollout
  rules: [{                                           // Targeted rules
    attribute: String, // e.g., 'email'
    value: String      // e.g., '@gla.ac.in'
  }]
});

module.exports = mongoose.model('Flag', flagSchema);