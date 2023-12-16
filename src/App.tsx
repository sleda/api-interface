import React, { useState } from 'react';
import Header from '../src/components/Header';
import useOpenAI from './hooks/useOpenAI';
import APIForm from './components/APIForm';
import './App.css';


const App: React.FC = () => {
  const { response, error, isLoading, sendRequest } = useOpenAI();
  const [systemContent, setSystemContent] = useState('');

  const handleFormSubmit = (model: string, prompt: string) => {
    if (!model || !model.trim()) {
      alert('Please enter a valid model name.');
      return;
    }

    sendRequest(model, prompt, systemContent);
  };

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <APIForm onSubmit={handleFormSubmit} setSystemContent={setSystemContent} />
        <div className="app-response-container">
          {isLoading && <div className="loading">Loading...</div>}
          {error && <p className="error">{error.message}</p>}
          {response && <div className="response">{response}</div>}
        </div>
      </main>
    </div>
  );
};

export default App;
