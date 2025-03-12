"use client";
import { useState } from 'react';
import { PositionList } from '@/app/employee_hierarch/components/positionList';
import { PositionForm } from '@/app/employee_hierarch/components/positionForm';
import { Button, Modal,Title ,AppShell, Burger} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// Define the Position interface directly here
interface Position {
  id: number;
  name: string;
  parent_id: number | null;
}

export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<Position | undefined>(undefined);
  const [opened, { toggle }] = useDisclosure();

  const handleEdit = (position: Position) => {
    setCurrentPosition(position);
    setIsFormOpen(true); // Open the form to edit the selected position
  };

  const handleAdd = () => {
    setCurrentPosition(undefined);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setCurrentPosition(undefined);
    setIsFormOpen(false); // Close the modal
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
         <Title order={2} mb="md" className='text-gray-700 text-center'>
                Employee Hierarchy
              </Title>
      </AppShell.Header>
      <AppShell.Main>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">

          <PositionList onEdit={handleEdit} />

          <Button onClick={handleAdd} className="mt-4">
            Add Position
          </Button>

          <Modal
            opened={isFormOpen}
            onClose={handleClose}
            title={currentPosition ? "Edit Position" : "Add Position"}
          >
            {currentPosition ? (
              <EditForm position={currentPosition} onClose={handleClose} />
            ) : (
              <PositionForm onClose={handleClose} />
            )}
          </Modal>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
