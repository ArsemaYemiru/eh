"use client";
import { useState } from "react";
import { PositionList } from "@/app/employee_hierarch/components/positionList";
import { PositionForm } from "@/app/employee_hierarch/components/positionForm";
import { Button, Modal, Title, AppShell, Burger, Container, Paper, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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
    setIsFormOpen(true); // Open form to edit the selected position
  };

  const handleAdd = () => {
    setCurrentPosition(undefined);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setCurrentPosition(undefined);
    setIsFormOpen(false); // Close modal
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 280,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      {/* Header Section */}
      <AppShell.Header className="bg-blue-600 text-white flex items-center px-4">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="white" />
        <Title order={2} className="ml-4 text-black">
          Employee Hierarchy
        </Title>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="md" align="start" className="py-10">
          <Paper shadow="sm" radius="md" p="lg"  className="bg-white">
            <Title order={3} mb="md" align="center" className="text-gray-700">
              Manage Positions
            </Title>
            <Divider mb="lg" />

            <PositionList onEdit={handleEdit} />

            <div className="flex justify-center mt-6">
              <Button onClick={handleAdd} size="md">
                + Add Position
              </Button>
            </div>
          </Paper>
        </Container>

        {/* Modal for Adding/Editing Positions */}
        <Modal
          opened={isFormOpen}
          onClose={handleClose}
          title={currentPosition ? "Edit Position" : "Add Position"}
          centered
          size="md"
        >
          <PositionForm position={currentPosition} onClose={handleClose} />
        </Modal>
      </AppShell.Main>
    </AppShell>
  );
}
