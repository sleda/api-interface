import React, { useState, FormEvent, useRef } from 'react';
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

  const systemContentRef = useRef<HTMLTextAreaElement>(null);
  const promptRef = useRef<HTMLTextAreaElement>(null);

  const handleFileContent = (content: string) => {
    setPrompt(content);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, ref: React.RefObject<HTMLTextAreaElement>) => {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
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
              ref={systemContentRef}
              value={systemContent}
              onChange={(e) => {
                setLocalSystemContent(e.target.value);
                handleTextareaChange(e, systemContentRef);
              }}
              placeholder="System content here... (You're a helpful pharmacist)"
              className="system-content-input"
            />
          </div>
        </div>

        <div className="prompt-container">
          <div className="prompt-wrapper">
            <div className="prompt-label">USER</div>
            <textarea
              id="prompt-input"
              ref={promptRef}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                handleTextareaChange(e, promptRef);
              }}
              placeholder="Write your prompt here or upload a file..."
              className="prompt-input"
            />
            <button type="submit" className="send-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 12 12)"></path>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default APIForm;
