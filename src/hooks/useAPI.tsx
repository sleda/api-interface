import { useState } from 'react';
import { makeAPIRequest } from '../utils/api';

const useAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [response, setResponse] = useState(null);

  const sendRequest = async (endpoint: string, data: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await makeAPIRequest(endpoint, data);
      setResponse(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendRequest, isLoading, error, response };
};

export default useAPI;
