const API_URL = 'http://localhost:3000/positions'; // Adjust API endpoint

// Fetch all positions
export const getPositions = async () => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  const text = await response.text(); // Fetch raw response first
  console.log("Raw API Response:", text); // Debugging 

  try {
    return JSON.parse(text); 
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error("Invalid JSON response from server");
  }
};

// Create a new position
export const createPosition = async (position: { name: string; parent_id: number | null }) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(position) 
  });

  return response.json();
};

// Update an existing position
export const updatePosition = async (position: { id: number; name: string; parent_id: number | null }) => {
  const validParentId = position.parent_id === position.id ? null : position.parent_id;

  const response = await fetch(`${API_URL}/${position.id}`, { 
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: position.name, parent_id: validParentId }) 
  });

  return response.json();
};


// Delete a position
export const deletePosition = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, { 
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  return response.json();
};
