import React, { useState } from 'react';
import axios from 'axios';

function QuizGenerator() {
    const [fileText, setFileText] = useState('');
    const [quizQuestions, setQuizQuestions] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/generate-quiz', { fileText });
            setQuizQuestions(response.data.quizQuestions);
        } catch (error) {
            console.error('Error generating quiz:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={fileText}
                    onChange={(e) => setFileText(e.target.value)}
                    placeholder="Paste file text here"
                />
                <button type="submit">Generate Quiz</button>
            </form>
            {quizQuestions && <div>{quizQuestions}</div>}
        </div>
    );
}

export default QuizGenerator;
