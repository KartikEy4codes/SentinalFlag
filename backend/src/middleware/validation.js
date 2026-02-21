const Joi = require('joi');

// @middleware   Validate flag input
exports.validateFlagInput = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(500),
    enabled: Joi.boolean(),
    environment: Joi.string().valid('Dev', 'Staging', 'Prod'),
    rolloutPercentage: Joi.number().min(0).max(100),
    strategyType: Joi.string().valid('percentage', 'user-targeting', 'branch-based'),
    targetingRules: Joi.object(),
    targetUsers: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: messages,
    });
  }

  req.body = value;
  next();
};

// @middleware   Validate authentication input
exports.validateAuthInput = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(100),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: messages,
    });
  }

  req.body = value;
  next();
};
