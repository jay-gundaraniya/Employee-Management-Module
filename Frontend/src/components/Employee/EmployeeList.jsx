import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeAPI } from '../../services/api';
import EmployeeDetails from './EmployeeDetails';
import './Employee.css';

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to fetch employees. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    try {
      if (query.trim()) {
        const response = await employeeAPI.search(query);
        setEmployees(response.data);
      } else {
        fetchEmployees();
      }
    } catch (err) {
      setError('Search failed. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.delete(id);
        setEmployees(employees.filter(emp => emp._id !== id));
      } catch (err) {
        setError('Failed to delete employee. Please try again.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/employees/edit/${id}`);
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="employee-list-container">
      <div className="employee-list-header">
        <h3>Employee List</h3>
        <button onClick={() => navigate('/employees/create')} className="add-button">
          Add Employee
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="employee-grid">
        {employees.map(employee => (
          <div key={employee._id} className="employee-card">
            <img src={employee.profilePic} alt={employee.name} className="employee-image" />
            <div className="employee-info">
              <h3>{employee.name}</h3>
              <p>{employee.position}</p>
              <p>{employee.department}</p>
            </div>
            <div className="employee-actions">
              <button onClick={() => handleView(employee)} className="view-button">
                View
              </button>
              <button onClick={() => handleEdit(employee._id)} className="edit-button">
                Edit
              </button>
              <button onClick={() => handleDelete(employee._id)} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default EmployeeList; 