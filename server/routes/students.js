import express from 'express';
import studentsCtrl from '../controllers/students.js';

const router = express.Router();

// POST : /import
router.post('/import', studentsCtrl.importStudents);

// GET : /
router.get('/', studentsCtrl.getAllStudents);

// GET : /search
router.get('/search', studentsCtrl.searchStudents);

export default router;
