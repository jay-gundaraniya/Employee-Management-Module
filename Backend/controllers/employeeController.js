const Employee = require('../models/Employee');

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = new Employee({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      department: req.body.department,
      position: req.body.position,
      salary: req.body.salary,
      profilePicture: req.body.profilePicture || '',
    });

    const createdEmployee = await employee.save();
    res.status(201).json(createdEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (employee) {
      employee.name = req.body.name || employee.name;
      employee.email = req.body.email || employee.email;
      employee.phone = req.body.phone || employee.phone;
      employee.department = req.body.department || employee.department;
      employee.position = req.body.position || employee.position;
      employee.salary = req.body.salary || employee.salary;
      employee.profilePicture = req.body.profilePicture || employee.profilePicture;
      employee.status = req.body.status || employee.status;

      const updatedEmployee = await employee.save();
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (employee) {
      await employee.deleteOne();
      res.json({ message: 'Employee removed' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchEmployees = async (req, res) => {
  try {
    const { query } = req.query;
    const employees = await Employee.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { department: { $regex: query, $options: 'i' } },
        { position: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees
}; 