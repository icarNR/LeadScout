import React, { useState } from 'react';

const Question = ({ onAnswer }) => {
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!question.trim()) {
            alert("Please enter a question.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response data:", data);
            setLoading(false);
            onAnswer(data.answer);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching data:', error);
            onAnswer("Sorry, something went wrong. Please try again later.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={question}
                    onChange={handleInputChange}
                    placeholder="Ask your question here..."
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Asking...' : 'Ask'}
                </button>
            </form>
        </div>
    );
};

export default Question;
