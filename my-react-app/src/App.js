import './App.css';
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [randomNumber, setRandomNumber] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/random-number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRandomNumber(data.number);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="app-container">
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
        {randomNumber && <p>Random Number for {name}: {randomNumber}</p>}
    </div>
  );
}

export default App;