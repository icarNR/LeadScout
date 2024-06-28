import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CriteriaFilter = () => {
  const [department, setDepartment] = useState('');
  const [criteria, setCriteria] = useState([]);
  const [error, setError] = useState(null);

  const fetchCriteria = async (selectedDepartment = '') => {
    try {
      const response = await axios.get('/criteriafilter', {
        params: {
          department_name: selectedDepartment || undefined
        }
      });

      // Ensure the response is an array
      if (Array.isArray(response.data)) {
        setCriteria(response.data);
      } else {
        setCriteria([]);
        console.error('API response is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching criteria:', error);
      setError('Error fetching criteria. Please try again later.');
    }
  };

  useEffect(() => {
    fetchCriteria();
  }, []);

  useEffect(() => {
    fetchCriteria(department);
  }, [department]);

  return (
    <div>
      <h1>Filter Criteria by Department</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select value={department} onChange={(e) => setDepartment(e.target.value)}>
        <option value="">All Departments</option>
        <option value="it">IT</option>
        <option value="hr">HR</option>
        <option value="management">Management</option>
      </select>
      <ul>
        {criteria.map((criterion, index) => (
          <li key={index}>
            <p>Department: {criterion.department}</p>
            <p>Other Field 1: {criterion.other_field_1}</p>
            <p>Other Field 2: {criterion.other_field_2}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CriteriaFilter;
