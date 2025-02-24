import axios from 'axios';

const API_URL = '/api/positions'; // API endpoint for positions

export const getPositions = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPosition = async (position: { name: string; parent_id: number | null }) => {
  const response = await axios.post(API_URL, position);
  return response.data;
};

export const updatePosition = async ({ id, name, parent_id }: { id: number; name: string; parent_id: number | null }) => {
  const response = await axios.put(`${API_URL}/${id}`, { name, parent_id });
  return response.data;
};

export const deletePosition = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
