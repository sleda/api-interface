import { useState } from 'react';
import axios from 'axios';

interface OpenAIError {
  message: string;
}

const useOpenAI = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<OpenAIError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openAIKey = process.env.REACT_APP_OPENAI_SECRET;



  const sendRequest = async (model: string, prompt: string, systemContent: string) => {
    setIsLoading(true);
    setError(null);

    let endpoint = '';
    let payload = {};

    if (['gpt-4', 'gpt-4-1106-preview', 'gpt-4-vision-preview', 'gpt-4-32k', 'gpt-3.5-turbo'].includes(model)) {
      endpoint = '/v1/chat/completions';
      payload = {
        model,
        messages: [
          { role: "system", content: systemContent },
          { role: "user", content: prompt }
        ]
      };
    } else {
      endpoint = '/v1/completions';
      payload = {
        model,
        prompt,
        max_tokens: 150
      };
    }

    try {
      const response = await axios.post(`https://api.openai.com${endpoint}`, payload, {
        headers: {
          'Authorization': `Bearer ${openAIKey}`
        },
      });

      if (endpoint === '/v1/chat/completions') {
        setResponse(response.data.choices[0].message.content);
      } else {
        setResponse(response.data.choices[0].text);
      }
    } catch (err: unknown) {

      if (axios.isAxiosError(err) && err.response) {
        setError({ message: err.response.data.error?.message || 'An unknown error occurred' });
      } else if (err instanceof Error) {
        setError({ message: err.message });
      } else {
        setError({ message: "An unknown error occurred." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { response, error, isLoading, sendRequest };
};

export default useOpenAI;
