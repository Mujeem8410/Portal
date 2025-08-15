const express = require('express');
const router = express.Router();
const Course = require('../models/CareerOpportunity'); 

// Get all courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get branches of a specific course
router.get('/:courseId/branches', async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);  
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course.branches);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/:courseId/branches/:branchId/careers', async (req, res) => {


    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const branch = course.branches.id(req.params.branchId);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.json(branch.careers);  // Branch ke careers return karo
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get details of a specific career in a specific branch of a specific course
router.get('/:courseId/branches/:branchId/careers/:careerId', async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const branch = course.branches.id(req.params.branchId);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        const career = branch.careers.id(req.params.careerId);
        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }
        res.json(career);  // Specific career details return karo
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
