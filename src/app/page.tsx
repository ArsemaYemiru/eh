"use client";
import { useState } from 'react';
import { PositionList } from '@/app/employee_hierarch/components/positionList';
import { PositionForm } from '@/app/employee_hierarch/components/positionForm';
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

  const handleEdit = (position: Position) => {
    setCurrentPosition(position);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setCurrentPosition(undefined);
    setIsFormOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <PositionList />
      <Button onClick={() => setIsFormOpen(true)} className="mt-4">
        Add Position
      </Button>
      <Modal
        opened={isFormOpen}
        onClose={handleClose}
        title={currentPosition ? "Edit Position" : "Add Position"}
      >
        <PositionForm position={currentPosition} onClose={handleClose} />
      </Modal>
    </div>
  );
}
