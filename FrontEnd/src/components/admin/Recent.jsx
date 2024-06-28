<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { FaClockRotateLeft } from "react-icons/fa6";
import { GrPlug } from "react-icons/gr";

const Recent = () => {
    const [recentCriteria, setRecentCriteria] = useState(null);

    useEffect(() => {
        const recent = JSON.parse(sessionStorage.getItem('recentCriteria'));
        setRecentCriteria(recent);
    }, []);

    const pStyle = {
        border: '1px solid #ddd',
        padding: '15px',
        margin: '1px',
        backgroundColor: 'rgb(233, 244, 248)',
        width: '400px',
        marginRight: '10px',
        paddingLeft: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '10px' // Add this line for rounded corners
    };

    const h1Style = {
        textAlign: 'left',
        marginLeft: '15px'
    };

    return (
        <div>
            <h1 style={h1Style}>Recent</h1>
            <FaClockRotateLeft />
            <pre>
                {recentCriteria ? (
                    <div style={pStyle}>
                        {recentCriteria.name}
                        <span><GrPlug /></span>
                    </div>
                ) : (
                    <div style={pStyle}>
                        No recent criteria
                    </div>
                )}
            </pre>
        </div>
    );
}

export default Recent;
=======
import React, { useState, useEffect } from 'react';
import { FaClockRotateLeft } from "react-icons/fa6";
import { GrPlug } from "react-icons/gr";

const Recent = () => {
    const [recentCriteria, setRecentCriteria] = useState(null);

    useEffect(() => {
        const recent = JSON.parse(sessionStorage.getItem('recentCriteria'));
        setRecentCriteria(recent);
    }, []);

    const pStyle = {
        border: '1px solid #ddd',
        padding: '15px',
        margin: '1px',
        backgroundColor: 'rgb(233, 244, 248)',
        width: '400px',
        marginRight: '10px',
        paddingLeft: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '10px' // Add this line for rounded corners
    };

    const h1Style = {
        textAlign: 'left',
        marginLeft: '15px'
    };

    return (
        <div>
            <h1 style={h1Style}>Recent</h1>
            <FaClockRotateLeft />
            <pre>
                {recentCriteria ? (
                    <div style={pStyle}>
                        {recentCriteria.name}
                        <span><GrPlug /></span>
                    </div>
                ) : (
                    <div style={pStyle}>
                        No recent criteria
                    </div>
                )}
            </pre>
        </div>
    );
}

export default Recent;
>>>>>>> 0cd8f09c925e41c13ff6256645bfbba3d3ebd74d
