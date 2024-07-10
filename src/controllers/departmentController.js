const Department = require('../models/Department');
const User = require('../models/User');

exports.createDepartment = async (req, res) => {
  const { name, managerId } = req.body;
  try {
    const manager = await User.findById(managerId);
    if (!manager || manager.role !== 'manager') {
      return res.status(400).json({ error: 'Invalid manager ID' });
    }
    const department = new Department({ name, manager: managerId });
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDepartment = async (req, res) => {
  try {
    const department =await Department.find();
    if (department?.lenhth === 0) {
      return res.status(404).json({ message:"No Data Found"});
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  const {id} = req.params;
  const { name, managerId } = req.body;

  try {
    const manager = await User.findById(managerId);
    if (!manager || manager.role !== 'manager') {
      return res.status(400).json({ error: 'Invalid manager ID' });
    }

    const department = await Department.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({"message":"Department Updated Successfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {

    const department = await Department.findByIdAndDelete(id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


