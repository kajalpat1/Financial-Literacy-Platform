const router = require('express').Router();
const db = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const scenarios = await db.BudgetScenario.find();
    res.json(scenarios);
  } catch (err) {
    next(err);
  }
});
