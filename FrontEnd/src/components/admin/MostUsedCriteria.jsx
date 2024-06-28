<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Criteria from './Criteria';

const MostUsedCriteria = () => {
    const [mostUsedCriteria, setMostUsedCriteria] = useState(null);
    const [sortedCriteria, setSortedCriteria] = useState([]);
    const [sortByUsage, setSortByUsage] = useState(false);

    useEffect(() => {
        const criteriaUsage = JSON.parse(sessionStorage.getItem('criteriaUsage')) || {};
        let maxCount = 0;
        let mostUsed = null;

        for (const key in criteriaUsage) {
            if (criteriaUsage[key].count > maxCount) {
                maxCount = criteriaUsage[key].count;
                mostUsed = criteriaUsage[key].criteria;
            }
        }

        setMostUsedCriteria(mostUsed);
    }, []);

    const handleSortByUsage = () => {
        const criteriaUsage = JSON.parse(sessionStorage.getItem('criteriaUsage')) || {};

        // Sort criteria by usage count descending
        const sorted = Object.values(criteriaUsage)
            .sort((a, b) => b.count - a.count)
            .map(entry => entry.criteria);

        setSortedCriteria(sorted);
        setSortByUsage(true);
    };

    return (
        <div>
            {mostUsedCriteria ? (
                <div>
                    <h3>Most Used Criteria</h3>
                    <p>Id: {mostUsedCriteria.id}</p>
                    <p>Name: {mostUsedCriteria.name}</p>
                    <p>Department: {mostUsedCriteria.department}</p>
                </div>
            ) : (
                <p>No criteria has been used yet.</p>
            )}

            <button onClick={handleSortByUsage}>Most Used Criteria</button>

            {sortByUsage && sortedCriteria.length > 0 && (
                <div>
                    <h3>Sorted Criteria by Usage</h3>
                    {sortedCriteria.map(criteria => (
                        <div key={criteria.id}>
                            <p>Id: {criteria.id}</p>
                            <p>Name: {criteria.name}</p>
                            <p>Department: {criteria.department}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MostUsedCriteria;
