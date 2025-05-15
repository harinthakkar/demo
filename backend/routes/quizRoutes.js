const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();


router.post('/create', async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:quizId', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    res.json(quiz);
  } catch (error) {
    res.status(404).json({ error: 'Quiz not found' });
  }
});

module.exports = router;
