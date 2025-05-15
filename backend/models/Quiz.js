const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.length === 4;
      },
      message: props => `Each question must have exactly 4 options.`
    },
    required: true
  },
  correctOptionIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
