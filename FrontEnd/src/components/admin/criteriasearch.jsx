import React, { useState, useEffect } from 'react';
import { GrPlug } from "react-icons/gr";

const CriteriaSearch = () => {
    const [criteriaData, setCriteriaData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedCriteria, setSearchedCriteria] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/criteria');
            const data = await response.json();
            setCriteriaData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleItemClick = (criteria) => {
        setSelectedId(criteria.id);
    };

    const handleSearch = async () => {
        if (!searchTerm) return;
        try {
            const response = await fetch(`http://localhost:8000/criteria/${searchTerm}`);
            if (response.ok) {
                const data = await response.json();
                setCriteriaData([data]);
                setSearchedCriteria(data);
            } else {
                console.error('Error fetching data:', response.statusText);
                setSearchedCriteria(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setSearchedCriteria(null);
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const containerStyle = {
        border: '2px solid #ddd',
        padding: '30px',
        margin: '1px',
        marginLeft: '10px',
        backgroundColor: 'rgb(162, 193, 226)',
        width: '600px',
        paddingRight: '1px',
        borderRadius: '10px',
        position: 'relative',
        cursor: 'pointer'
    };

    const selectedContainerStyle = {
        ...containerStyle,
        border: '2px solid #333',
        backgroundColor: 'rgb(102, 153, 204)'
    };

    const h4Style = {
        textAlign: 'left',
        marginLeft: '15px'
    };

    const rowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative'
    };

    const idStyle = {
        position: 'absolute',
        left: '20px'
    };

    const nameStyle = {
        position: 'absolute',
        left: '150px'
    };

    const departmentStyle = {
        position: 'absolute',
        left: '450px'
    };

    const plugStyle = {
        position: 'absolute',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)'
    };

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Search by ID"
                    style={{
                        padding: '10px',
                        width: '200px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                />
                <button
                    onClick={handleSearch}
                    style={{
                        padding: '10px 20px',
                        marginLeft: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        cursor: 'pointer'
                    }}
                >
                    Search
                </button>
            </div>
            {searchedCriteria && (
                <div style={{ marginBottom: '20px' }}>
                    <h2>Criteria Name: {searchedCriteria.name}</h2>
                </div>
            )}
            <pre>
                <b><h4 style={h4Style}>        Id                             Name                                                            Department</h4></b>
                <div>
                    {criteriaData.map((criteria, index) => (
                        <div
                            key={index}
                            style={criteria.id === selectedId ? selectedContainerStyle : containerStyle}
                            onClick={() => handleItemClick(criteria)}
                        >
                            <div style={rowStyle}>
                                <div style={idStyle}>{criteria.id}</div>
                                <div style={nameStyle}>{criteria.name}</div>
                                <div style={departmentStyle}>{criteria.department}</div>
                                <span style={plugStyle}><GrPlug /></span>
                            </div>
                        </div>
                    ))}
                </div>
            </pre>
        </div>
    );
};

export default CriteriaSearch;
