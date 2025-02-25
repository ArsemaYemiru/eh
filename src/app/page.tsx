"use client";
import { useState } from 'react';
import { PositionList } from '@/app/employee_hierarch/components/positionList';
import { PositionForm } from '@/app/employee_hierarch/components/positionForm';
import { EditForm } from '@/app/employee_hierarch/components/editForm';
import { Button, Modal } from '@mantine/core';

// Define the Position interface directly here
interface Position {
  id: number;
  name: string;
  parent_id: number | null;
}

export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<Position | undefined>(undefined);

  // Handle edit action when the edit button is clicked
  const handleEdit = (position: Position) => {
    setCurrentPosition(position);
    setIsFormOpen(true); // Open the form to edit the selected position
  };

  // Handle add action when the add button is clicked
  const handleAdd = () => {
    setCurrentPosition(undefined); // No position to edit, so it's a new position
    setIsFormOpen(true); // Open the form to add a new position
  };

  // Close the form and reset state
  const handleClose = () => {
    setCurrentPosition(undefined);
    setIsFormOpen(false); // Close the modal
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Position list with the onEdit callback */}
      <PositionList onEdit={handleEdit} />

      {/* Button to open the Add Position form */}
      <Button onClick={handleAdd} className="mt-4">
        Add Position
      </Button>

      {/* Modal for both adding and editing positions */}
      <Modal
        opened={isFormOpen}
        onClose={handleClose}
        title={currentPosition ? "Edit Position" : "Add Position"}
      >
        {/* Conditionally render PositionForm or EditForm */}
        {currentPosition ? (
          <EditForm position={currentPosition} onClose={handleClose} />
        ) : (
          <PositionForm onClose={handleClose} />
        )}
      </Modal>
    </div>
  );
}
