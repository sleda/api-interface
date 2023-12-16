import React, { useState, FormEvent } from 'react';
import './APIForm.css';
import APISelector from './APISelector';
import FileParser from './FileParser';

interface APIFormProps {
  onSubmit: (model: string, prompt: string) => void;
  setSystemContent: (content: string) => void; 
}

const APIForm: React.FC<APIFormProps> = ({ onSubmit, setSystemContent }) => {
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [prompt, setPrompt] = useState('');
  const [systemContent, setLocalSystemContent] = useState(''); 

  const handleFileContent = (content: string) => {
    setPrompt(content);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSystemContent(systemContent); 
    if (model && prompt) {
      onSubmit(model, prompt);
    }
  };

  return (
    <div className="api-form-container">
      <form onSubmit={handleSubmit} className="api-form">
        <div className="api-selector-container">
          <APISelector model={model} setModel={setModel} />
          <FileParser onFileContentAvailable={handleFileContent} />
        </div>
        <div className="system-content-container">
          <div className="system-content-wrapper">
            <div className="system-content-label">SYSTEM</div>
            <textarea
              id="system-content"
              value={systemContent}
              onChange={(e) => setLocalSystemContent(e.target.value)}
              placeholder="System content here... (You're a helpful pharmacist)"
              className="system-content-input"
            />
          </div>
        </div>

        <div className="prompt-container">
          {prompt && <div className="prompt-user-label">USER</div>}
          <textarea
            id="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write your prompt here or upload a file..."
            className="prompt-input"
          />
        </div>
        <button type="submit" className="send-button">
          Gönder
        </button>
      </form>
    </div>
  );
};

export default APIForm;
