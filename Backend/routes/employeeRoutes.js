const express = require('express');
const router = express.Router();
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
  .post(createEmployee);

router.route('/search')
  .get(searchEmployees);

router.route('/:id')
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router; 