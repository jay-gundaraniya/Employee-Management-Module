import React from 'react';
import './Employee.css';

const EmployeeDetails = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Employee Details</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="employee-details">
            <div className="employee-image-container">
              <img src={employee.profilePic} alt={employee.name} className="employee-detail-image" />
            </div>
            <div className="employee-info-details">
              <h3>{employee.name}</h3>
              <div className="detail-row">
                <span className="detail-label">Position:</span>
                <span className="detail-value">{employee.position}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Department:</span>
                <span className="detail-value">{employee.department}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{employee.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails; 