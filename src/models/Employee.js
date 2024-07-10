const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  location: { type: String, required: true },
  name:{ type: String, required: true, required: true}
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
