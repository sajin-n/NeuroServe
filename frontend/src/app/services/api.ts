import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictData = async (features: number[]) => {
  const response = await api.post('/api/ml/predict', { features });
  return response.data;
};

export const checkHealth = async () => {
  const response = await api.get('/');
  return response.data;
};