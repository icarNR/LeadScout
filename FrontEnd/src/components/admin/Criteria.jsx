<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { GrPlug } from 'react-icons/gr';
import SearchBar from './SearchBar';

const Criteria = ({ onSelect }) => {
    const [criteriaData, setCriteriaData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [plugMessage, setPlugMessage] = useState('');
    const [department, setDepartment] = useState('All Departments');
    const [sortByUsage, setSortByUsage] = useState(false);
    const [sortedCriteria, setSortedCriteria] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAllCriteria, setShowAllCriteria] = useState(true);
    const departments = ['All Departments', 'it', 'HR', 'management'];

    useEffect(() => {
        fetchData();
    }, [department, showAllCriteria]);

    useEffect(() => {
        if (sortByUsage) {
            const criteriaUsage = JSON.parse(sessionStorage.getItem('criteriaUsage')) || {};

            const sorted = Object.values(criteriaUsage)
                .sort((a, b) => b.count - a.count)
                .map(entry => entry.criteria);

            setSortedCriteria(sorted);
        } else {
            fetchData();
        }
    }, [department, sortByUsage, showAllCriteria]);

    const fetchData = async () => {
        try {
            const url = department && department !== 'All Departments'
                ? `http://localhost:8000/criteriafilter?department=${department}`
                : 'http://localhost:8000/criteriafilter';
            const response = await fetch(url);
            const data = await response.json();
            if (Array.isArray(data)) {
                setCriteriaData(data);
            } else {
                console.error('Expected an array but got:', data);
                setCriteriaData([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setCriteriaData([]);
        }
    };

    const handleItemClick = (criteria) => {
        setSelectedId(criteria.id);
        onSelect(criteria);
    };

    const handlePlugClick = (event, criteria) => {
        event.stopPropagation();
        setPlugMessage(`Plug in for criteria ID: ${criteria.id}`);

        let criteriaUsage = JSON.parse(sessionStorage.getItem('criteriaUsage')) || {};

        if (criteriaUsage[criteria.id]) {
            criteriaUsage[criteria.id].count += 1;
        } else {
            criteriaUsage[criteria.id] = { count: 1, criteria };
        }

        sessionStorage.setItem('criteriaUsage', JSON.stringify(criteriaUsage));
        sessionStorage.setItem('recentCriteria', JSON.stringify(criteria));

        setTimeout(() => setPlugMessage(''), 2000);
    };

    const handleSortByUsage = () => {
        setSortByUsage(prev => !prev);
    };

    const handleSearch = (id) => {
        if (id.trim() === '') {
            setShowAllCriteria(true);
        } else {
            const filteredCriteria = criteriaData.filter(criteria => criteria.id.toString() === id.trim());
            setCriteriaData(filteredCriteria);
            setShowAllCriteria(false);
        }
    };

    const handleShowAllCriteria = () => {
        setSearchTerm('');
        setShowAllCriteria(true);
        fetchData();
    };

    return (
        <div style={{ width: '100%', padding: '20px' }}>
            {plugMessage && <p>{plugMessage}</p>}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <select value={department} onChange={(e) => setDepartment(e.target.value)} style={{ backgroundColor: 'rgb(37, 150, 190)', color: 'white', padding: '5px', borderRadius: '5px', border: 'none', marginRight: '10px', cursor: 'pointer' }}>
                        {departments.map((dep, index) => (
                            <option key={index} value={dep}>
                                {dep}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleSortByUsage} style={{ backgroundColor: 'rgb(37, 150, 190)', color: 'white', padding: '8px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                        {sortByUsage ? 'Show All Criteria' : 'Most Used Criteria'}
                    </button>
                </div>
                <div style={{ marginLeft: '10px' }}>
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>

            <div style={{ maxHeight: '500px', overflowY: 'auto', display: 'block' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #ddd' }}>
                            <th style={{ textAlign: 'left', padding: '10px', width: '10%' }}>Id</th>
                            <th style={{ textAlign: 'left', padding: '10px', width: '50%' }}>Name</th>
                            <th style={{ textAlign: 'left', padding: '10px', width: '25%' }}>Department</th>
                            <th style={{ textAlign: 'left', padding: '10px', width: '10%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(showAllCriteria ? (sortByUsage ? sortedCriteria : criteriaData) : criteriaData).length > 0 ? (
                            (showAllCriteria ? (sortByUsage ? sortedCriteria : criteriaData) : criteriaData).map((criteria, index) => (
                                <tr
                                    key={index}
                                    style={criteria.id === selectedId ? { backgroundColor: 'rgb(37, 150, 190)', color: 'white' } : { borderBottom: '1px solid #ddd', backgroundColor: 'rgba(37, 150, 190, 0.1)' }}
                                    onClick={() => handleItemClick(criteria)}
                                >
                                    <td style={{ textAlign: 'left', padding: '20px', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>
                                        {criteria.id}
                                    </td>
                                    <td style={{ textAlign: 'left', padding: '20px' }}>{criteria.name}</td>
                                    <td style={{ textAlign: 'left', padding: '20px' }}>{criteria.department}</td>
                                    <td style={{ textAlign: 'left', padding: '20px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', cursor: 'pointer' }}>
                                        {!sortByUsage && (
                                            <span onClick={(event) => handlePlugClick(event, criteria)}><GrPlug /></span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ padding: '8px', textAlign: 'center' }}>No criteria available for the selected department</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {!showAllCriteria && (
                <button onClick={handleShowAllCriteria}>Show All Criteria</button>
            )}
        </div>
    );
};

export default Criteria;
=======
import React, { useState, useEffect } from 'react';
import { GrPlug } from 'react-icons/gr';
import SearchBar from './SearchBar';

const Criteria = ({ onSelect }) => {
    const [criteriaData, setCriteriaData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [plugMessage, setPlugMessage] = useState('');
    const [department, setDepartment] = useState('All Departments');
    const [sortByUsage, setSortByUsage] = useState(false);
    const [sortedCriteria, setSortedCriteria] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAllCriteria, setShowAllCriteria] = useState(true);
    const departments = ['All Departments', 'it', 'HR', 'management'];

    useEffect(() => {
        fetchData();
    }, [department, showAllCriteria]);

    useEffect(() => {
        if (sortByUsage) {
            const criteriaUsage = JSON.parse(sessionStorage.getItem('criteriaUsage')) || {};

            const sorted = Object.values(criteriaUsage)
                .sort((a, b) => b.count - a.count)
                .map(entry => entry.criteria);

            setSortedCriteria(sorted);
        } else {
            fetchData();
        }
    }, [department, sortByUsage, showAllCriteria]);

    const fetchData = async () => {
        try {
            const url = department && department !== 'All Departments'
                ? `http://localhost:8000/criteriafilter?department=${department}`
                : 'http://localhost:8000/criteriafilter';
            const response = await fetch(url);
            const data = await response.json();
            if (Array.isArray(data)) {
                setCriteriaData(data);
            } else {
                console.error('Expected an array but got:', data);
                setCriteriaData([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setCriteriaData([]);
        }
    };

    const handleItemClick = (criteria) => {
        setSelectedId(criteria.id);
        onSelect(criteria);
    };

    const handlePlugClick = (event, criteria) => {
        event.stopPropagation();
        setPlugMessage(`Plug in for criteria ID: ${criteria.id}`);

        let criteriaUsage = JSON.parse(sessionStorage.getItem('criteriaUsage')) || {};

        if (criteriaUsage[criteria.id]) {
            criteriaUsage[criteria.id].count += 1;
        } else {
            criteriaUsage[criteria.id] = { count: 1, criteria };
        }

        sessionStorage.setItem('criteriaUsage', JSON.stringify(criteriaUsage));
        sessionStorage.setItem('recentCriteria', JSON.stringify(criteria));

        setTimeout(() => setPlugMessage(''), 2000);
    };

    const handleSortByUsage = () => {
        setSortByUsage(prev => !prev);
    };

    const handleSearch = (id) => {
        if (id.trim() === '') {
            setShowAllCriteria(true);
        } else {
            const filteredCriteria = criteriaData.filter(criteria => criteria.id.toString() === id.trim());
            setCriteriaData(filteredCriteria);
            setShowAllCriteria(false);
        }
    };

    const handleShowAllCriteria = () => {
        setSearchTerm('');
        setShowAllCriteria(true);
        fetchData();
    };

    return (
        <div style={{ width: '100%', padding: '20px' }}>
            {plugMessage && <p>{plugMessage}</p>}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <select value={department} onChange={(e) => setDepartment(e.target.value)} style={{ backgroundColor: 'rgb(37, 150, 190)', color: 'white', padding: '5px', borderRadius: '5px', border: 'none', marginRight: '10px', cursor: 'pointer' }}>
                        {departments.map((dep, index) => (
                            <option key={index} value={dep}>
                                {dep}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleSortByUsage} style={{ backgroundColor: 'rgb(37, 150, 190)', color: 'white', padding: '8px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                        {sortByUsage ? 'Show All Criteria' : 'Most Used Criteria'}
                    </button>
                </div>
                <div style={{ marginLeft: '10px' }}>
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>

            <div style={{ maxHeight: '500px', overflowY: 'auto', display: 'block' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #ddd' }}>
                            <th style={{ textAlign: 'left', padding: '10px', width: '10%' }}>Id</th>
                            <th style={{ textAlign: 'left', padding: '10px', width: '50%' }}>Name</th>
                            <th style={{ textAlign: 'left', padding: '10px', width: '25%' }}>Department</th>
                            <th style={{ textAlign: 'left', padding: '10px', width: '10%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(showAllCriteria ? (sortByUsage ? sortedCriteria : criteriaData) : criteriaData).length > 0 ? (
                            (showAllCriteria ? (sortByUsage ? sortedCriteria : criteriaData) : criteriaData).map((criteria, index) => (
                                <tr
                                    key={index}
                                    style={criteria.id === selectedId ? { backgroundColor: 'rgb(37, 150, 190)', color: 'white' } : { borderBottom: '1px solid #ddd', backgroundColor: 'rgba(37, 150, 190, 0.1)' }}
                                    onClick={() => handleItemClick(criteria)}
                                >
                                    <td style={{ textAlign: 'left', padding: '20px', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>
                                        {criteria.id}
                                    </td>
                                    <td style={{ textAlign: 'left', padding: '20px' }}>{criteria.name}</td>
                                    <td style={{ textAlign: 'left', padding: '20px' }}>{criteria.department}</td>
                                    <td style={{ textAlign: 'left', padding: '20px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', cursor: 'pointer' }}>
                                        {!sortByUsage && (
                                            <span onClick={(event) => handlePlugClick(event, criteria)}><GrPlug /></span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ padding: '8px', textAlign: 'center' }}>No criteria available for the selected department</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {!showAllCriteria && (
                <button onClick={handleShowAllCriteria}>Show All Criteria</button>
            )}
        </div>
    );
};

export default Criteria;
>>>>>>> 0cd8f09c925e41c13ff6256645bfbba3d3ebd74d
