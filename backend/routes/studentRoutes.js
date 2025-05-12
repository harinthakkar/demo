const express = require('express');
const Student = require('../models/Student');

const router = express.Router();


router.post('/', async (req, res) => {
  const { studentId, studentName, phone, email, standard } = req.body;
  console.log("Student Data:", req.body);
  try {
    const newStudent = new Student({ studentId, studentName, phone, email, standard });
    await newStudent.save();
    console.log('Student added:', newStudent);
    res.status(201).json({
      message: 'Student added successfully!',
      student: newStudent
    });
  } catch (error) {
    res.status(400).json({ error: 'Error adding student', details: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students', details: error.message });
  }
});



router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Student updated successfully!', student: updatedStudent });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update student', details: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student', details: error.message });
  }
});


module.exports = router;
