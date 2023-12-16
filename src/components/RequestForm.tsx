import React, { useState } from 'react';

type RequestFormProps = {
  onFormSubmit: (request: string) => void;
};

const RequestForm: React.FC<RequestFormProps> = ({ onFormSubmit }) => {
  const [request, setRequest] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(request);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={request} onChange={(e) => setRequest(e.target.value)} />
      <button type="submit">Send Request</button>
    </form>
  );
};

export default RequestForm;
