import { useState } from "react";

const App = () => {
  const [value, setValue] =useState("")
  const [error, setError] = useState("")
  const [chatHistory, setChatHistory] = useState("")
  const surpriseOptions = [
    'Who is the richest man?',
    'Where does milk come from ?',
    'How to make chowmein?',
    'When is New year in 2025?'
  ]

  const surprise = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random()*surpriseOptions.length)]
    setValue(randomValue)
  }

  const getResponse = async () => {
    if (!value) {
      setError('Error! Please ask a question!')
      return
    }
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch('http://localhost:3000/gemini', options)
      const data = await response.text()
      console.log(data)
    }catch (error){
      setError("som ting wong! Please try again later.")
    }
  }

  return (
    <div className="app">
        <p>
          What do you want to know?
          <button className="surprise" onClick={surprise} disabled={chatHistory}>Surprise Me!</button>
        </p>
        <div className="input-container">
          <input 
          value={value} 
          type="text" 
          placeholder="How are you?"
          onChange={(e) => setValue(e.target.value)}
          />

          
          {!error && <button>Ask me</button>}
          {error && <button>Clear</button>}
        </div>
        {error && <p>{error}</p>}
        <div className="search-result">
          <div key={""}>
            <p className="answer"></p>
          </div>
        </div>
    </div>
  );
};

export default App;
