import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EmployeeList from './components/Employee/EmployeeList';
import CreateEmployee from './components/Employee/CreateEmployee';
import EditEmployee from './components/Employee/EditEmployee';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/employees"
            element={
              <PrivateRoute>
                <EmployeeList />
              </PrivateRoute>
            }
          />
          <Route
            path="/employees/create"
            element={
              <PrivateRoute>
                <CreateEmployee />
              </PrivateRoute>
            }
          />
          <Route
            path="/employees/edit/:id"
            element={
              <PrivateRoute>
                <EditEmployee />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
