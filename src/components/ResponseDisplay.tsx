import React from 'react';

const ResponseDisplay: React.FC<{ response: string }> = ({ response }) => {
  return (
    <div>
      <h3>Response:</h3>
      <p>{response}</p>
    </div>
  );
};

export default ResponseDisplay;
