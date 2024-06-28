import React, { useState, useEffect } from 'react';

const Skills = () => {
    const [skillsData, setSkillsData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/skills'); // Replace 'skills' with the appropriate endpoint
            const data = await response.json();
            setSkillsData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const containerStyle = {
        border: '1px solid #ddd',
        padding: '10px',
        margin: '1px',
        backgroundColor: 'rgb(25, 118, 210)',
        width: '300px',
        height: '50px', // Increase height for larger boxes
        marginRight: '10px',
        paddingLeft: '20px',
        textAlign: 'left',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
    };
    const h5Style = {
        textAlign: 'left',
        marginLeft: '15px'
    };

    const h1Style = {
        textAlign: 'left',
        marginLeft: '15px'
    };

    const nameStyle = {
        position: 'absolute',
        left: '50px'
    };

    const scoreStyle = {
        position: 'absolute',
        left: '250px'
    };

    return (
        <div>
            
            <pre>
                
            
              
                {skillsData.map((skill, index) => (
                    <div key={index} style={containerStyle}>
                        <input type="checkbox" id={skill.name} name={skill.name} style={{ marginLeft: '10px' }} />
                        <span style={nameStyle}>{skill.name}</span>
                        
                    </div>
                ))}
            </pre>
        </div>
    );
}

export default Skills;
