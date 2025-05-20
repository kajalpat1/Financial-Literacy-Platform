const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  label: String,
  description: String,
  type: { type: String, enum: ['invest', 'save', 'spend', 'debt'] },
  rate: Number, // % for investment/saving; interest rate for debt
  value: Number, // initial amount to apply the rate to
});

const scenarioSchema = new mongoose.Schema({
  question: String,
  options: [optionSchema],
});

module.exports = mongoose.model('BudgetScenario', scenarioSchema);
