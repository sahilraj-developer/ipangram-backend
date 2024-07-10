const express = require('express');
const { createDepartment, getDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentController');
const router = express.Router();

router.post('/create', createDepartment);
router.get('/alldepartment', getDepartment);
router.put('/updatedepartment/:id', updateDepartment);
router.delete('/deletedepartment/:id', deleteDepartment);

// Add update, delete, and read routes similarly

module.exports = router;
