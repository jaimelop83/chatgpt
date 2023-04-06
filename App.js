import React, { useState } from 'react';
import './App.css';

function App() {
  const [userPrompt, setUserPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setUserPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userPrompt }),
    };

    try {
      const res = await fetch('http://localhost:8080/chat', requestOptions);
      const data = await res.json();

      if (data.success) {
        setResponse(data.data);
      } else {
        setResponse('Error: ' + data.error);
      }
    } catch (error) {
      setResponse('Error: ' + error.message);
    }
  };

  return (
    <div className="App">
      <h1>GPT-3 Chat</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userPrompt">Enter your message:</label>
        <input
          type="text"
          id="userPrompt"
          value={userPrompt}
          onChange={handleChange}
          required
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
