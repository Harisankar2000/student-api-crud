const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const marksController = require('../controllers/marksController');

// Student routes
router.post('/students', studentController.createStudent);
router.get('/students', studentController.getStudents);
router.get('/students/:id', studentController.getStudentById);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);

// Marks routes
router.post('/students/:student_id/marks', marksController.createMarks);
router.get('/students/:student_id/marks', marksController.getMarksByStudentId);
router.put('/marks/:marks_id', marksController.updateMarks);
router.delete('/marks/:marks_id', marksController.deleteMarks);

module.exports = router;