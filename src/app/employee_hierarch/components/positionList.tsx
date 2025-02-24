import { useQuery } from '@tanstack/react-query';
import { List, Group, Button, Card, Title, Text, Modal } from '@mantine/core';
import { getPositions } from '../services/positionService';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import PositionForm from './positionForm';

interface Position {
  id: number;
  name: string;
  parent_id: number | null;
  children?: Position[];
}

export const PositionList = () => {
  const { data: positions, isLoading, error } = useQuery({
    queryKey: ['positions'],
    queryFn: getPositions,
    staleTime: Infinity,
  });
  const [currentPosition, setCurrentPosition] = useState<Position | undefined>(undefined);
  const [opened, { open, close }] = useDisclosure(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  const onEdit = (position: Position) => {
    setCurrentPosition(position);
    open()
  }

  function renderPositions(positions: Position[] | undefined) {
    return (
      <>
       
        <List spacing="sm" listStyleType="none">
          {positions?.map((position) => (
            <List.Item key={position.id}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between">
                  <div>
                    <Title order={4}>{position.name}</Title>
                    {position.parent_id && (
                      <Text c="dimmed" size="sm">
                        Parent ID: {position.parent_id}
                      </Text>
                    )}
                  </div>
                  <Group>
                    <Button variant="outline" onClick={() => onEdit(position)}>
                      Edit
                    </Button>
                    <div>
                      <Button color="red" variant="outline">
                        Delete
                      </Button></div>
                  </Group>
                </Group>
                {position.children && (
                  <div style={{ marginLeft: '20px', marginTop: '10px' }}>
                    {renderPositions(position.children)}
                  </div>
                )}
              </Card>
            </List.Item>
          ))}
        </List>
      </>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <Title order={2} mb="md">
        Positions
      </Title>
      <Modal
          opened={opened}
          onClose={close}
          title={currentPosition ? "Edit Position" : "Add Position"}
        >
          <PositionForm position={currentPosition} onClose={close} />
        </Modal>
      {renderPositions(positions)}
    </div>
  );
};

export default PositionList;