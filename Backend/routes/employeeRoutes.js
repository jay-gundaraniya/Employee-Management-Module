const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees
} = require('../controllers/employeeController');

router.route('/')
  .get(getEmployees)
  .post(upload.single('profilePicture'), createEmployee);

router.route('/search')
  .get(searchEmployees);

router.route('/:id')
  .get(getEmployeeById)
  .put(upload.single('profilePicture'), updateEmployee)
  .delete(deleteEmployee);

module.exports = router; 