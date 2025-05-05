import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { employeeAPI } from '../../services/api';
import './Employee.css';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    salary: '',
    profilePic: null
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const response = await employeeAPI.getById(id);
      const employee = response.data;
      setFormData({
        name: employee.name,
        position: employee.position,
        department: employee.department,
        email: employee.email,
        phone: employee.phone,
        salary: employee.salary,
        profilePic: null
      });
      setPreviewUrl(employee.profilePic);
    } catch (err) {
      setError('Failed to fetch employee details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePic: file
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Convert salary to number
      const employeeData = {
        ...formData,
        salary: Number(formData.salary)
      };
      await employeeAPI.update(id, employeeData);
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="employee-form-container">
      <div className="employee-form">
        <h2>Edit Employee</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Position:</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Department:</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={loading}
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
            />
          </div>

          <div className="form-group">
            <label>Salary:</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              disabled={loading}
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label>Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading}
            />
            {previewUrl && (
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/employees')}
              className="cancel-button"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Updating...' : 'Update Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee; 