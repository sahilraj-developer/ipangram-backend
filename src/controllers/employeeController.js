const Employee = require('../models/Employee');
const User = require('../models/User');
const Department = require('../models/Department');

exports.createEmployee = async (req, res) => {
  const { userId, departmentId, location,name } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: 'Invalid user ID' });

    const department = await Department.findById(departmentId);
    if (!department) return res.status(400).json({ error: 'Invalid department ID' });

    const employee = new Employee({ user: userId, department: departmentId, location,name });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    
    if (employees.length === 0) {
      return res.status(404).json({ error: 'No employees found' });
    }

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeesSortedByLocation = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ location: 1 });
    if (employees.length === 0) {
      return res.status(404).json({ error: 'No employees found' });
    }

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeesSortedByName = async (req, res) => {
  let { order } = req.query;

  try {
    let employees;
    if (order === "ascending") {
      employees = await Employee.find().sort({ 'user.name': 1 });
    } else if (order === 'descending') {
      employees = await Employee.find().sort({ 'user.name': -1 });
    } else {
      return res.status(400).json({ error: 'Invalid order parameter' });
    }

    if (employees.length === 0) {
      return res.status(404).json({ error: 'No employees found' });
    }

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
