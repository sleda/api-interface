import axios from 'axios';

export const makeAPIRequest = async (endpoint: string, data: any) => {
  try {
    const response = await axios.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
