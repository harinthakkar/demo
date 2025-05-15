const express = require('express');
const Result = require('../models/Result');
const Quiz = require('../models/Quiz');
const Student = require('../models/Student'); // Import the Student model
const router = express.Router();


router.post('/submit', async (req, res) => {
  const { studentId, quizId, answers } = req.body;

  try {
    
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctOptionIndex) score++;
    });

    const result = new Result({
      studentId: student._id, 
      quizId,
      answers,
      score
    });

    await result.save();
    res.status(201).json({ message: 'Result saved', score });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/student/:studentId', async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const results = await Result.find({ studentId: student._id }).populate('quizId', 'title');
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;