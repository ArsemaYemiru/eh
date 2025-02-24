import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Replace with your actual API URL

// Fetch all positions
const getPositions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/positions`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching positions');
  }
};

const getPositionById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/positions/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching position with id ${id}`);
  }
};

// Create a new position
const createPosition = async (positionData: { name: string; parentId: number | null; description: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/positions`, positionData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating position');
  }
};

// Update an existing position
const updatePosition = async (id: number, positionData: { name: string; parentId: number | null; description: string }) => {
  try {
    const response = await axios.put(`${BASE_URL}/positions/${id}`, positionData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating position with id ${id}`);
  }
};

// Delete a position
const deletePosition = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/positions/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting position with id ${id}`);
  }
};

export { getPositions, getPositionById, createPosition, updatePosition, deletePosition };
