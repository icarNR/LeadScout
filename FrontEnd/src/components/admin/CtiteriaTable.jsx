<<<<<<< HEAD
import React from 'react';
import { GrPlug } from 'react-icons/gr';

const CriteriaTable = ({ criteria, selectedId, handleItemClick, handlePlugClick, sortByUsage }) => {
    return (
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
                {criteria.length > 0 ? (
                    criteria.map((criteria, index) => (
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
    );
};

export default CriteriaTable;
