const express = require('express');
const { createEmployee, getEmployees, getEmployeesSortedByLocation, getEmployeesSortedByName } = require('../controllers/employeeController');
const router = express.Router();

router.post('/create', createEmployee);
router.get('/get', getEmployees);
router.get('/sort/location', getEmployeesSortedByLocation); 
router.get('/sort/name', getEmployeesSortedByName); 

module.exports = router;
