import React, { useState } from 'react';

function App() {
    const [name, setName] = useState('');
    const [greeting, setGreeting] = useState('');

    const handleSayHello = async () => {
        try {
            const response = await fetch(`http://localhost:8080/hello?myName=${name}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const greetingText = await response.text();
            setGreeting(greetingText);
        } catch (error) {
            setGreeting('Error fetching the greeting!');
            console.error('Fetch error:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Say Hello</h1>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: '10px', marginRight: '10px' }}
            />
            <button onClick={handleSayHello} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Say Hello
            </button>
            <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{greeting}</p>
        </div>
    );
}

export default App;
