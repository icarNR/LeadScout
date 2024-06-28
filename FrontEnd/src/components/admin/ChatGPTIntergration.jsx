import React, { useState } from 'react';
import Question from './Question';

const ChatGPTIntegration = () => {
    const [answer, setAnswer] = useState('');

    const handleAnswer = (response) => {
        setAnswer(response);
    };

    return (
        <div>
            <h1>Ask ChatGPT</h1>
            <Question onAnswer={handleAnswer} />
            {answer && (
                <div>
                    <h2>Answer:</h2>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

export default ChatGPTIntegration;
