import React from 'react';

const DepartmentFilter = ({ department, setDepartment, handleSortByUsage, sortByUsage }) => {
    const departments = ['All Departments', 'it', 'HR', 'management'];

    return (
        <>
            <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                style={{ backgroundColor: 'rgb(37, 150, 190)', color: 'white', padding: '5px', borderRadius: '5px', border: 'none', marginRight: '10px', cursor: 'pointer' }}
            >
                {departments.map((dep, index) => (
                    <option key={index} value={dep}>
                        {dep}
                    </option>
                ))}
            </select>
            <button
                onClick={handleSortByUsage}
                style={{ backgroundColor: 'rgb(37, 150, 190)', color: 'white', padding: '8px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
            >
                {sortByUsage ? 'Show All Criteria' : 'Most Used Criteria'}
            </button>
        </>
    );
};

export default DepartmentFilter;
