const Marks = require('../models/marks');

// Create marks for a student
exports.createMarks = async (req, res) => {
    try {
        const { subject, marks } = req.body;
        const { student_id } = req.params;  // Extract student_id from the URL parameters

        if (!student_id) {
            return res.status(400).json({ error: 'Student ID is required' });
        }

        const newMarks = await Marks.create({ student_id, subject, marks });
        res.status(201).json(newMarks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get marks for a student by student_id
exports.getMarksByStudentId = async (req, res) => {
    try {
        const marks = await Marks.findAll({ where: { student_id: req.params.student_id } });
        res.json(marks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update marks
exports.updateMarks = async (req, res) => {
    try {
        const marks = await Marks.findByPk(req.params.marks_id);
        if (!marks) {
            return res.status(404).json({ error: 'Marks not found' });
        }
        await marks.update(req.body);
        res.json(marks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete marks
exports.deleteMarks = async (req, res) => {
    try {
        const marks = await Marks.findByPk(req.params.marks_id);
        if (!marks) {
            return res.status(404).json({ error: 'Marks not found' });
        }
        await marks.destroy();
        res.json({ message: 'Marks deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
