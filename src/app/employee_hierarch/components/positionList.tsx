import { useQuery } from '@tanstack/react-query';
import { List, Group, Button } from '@mantine/core';
import { getPositions  } from '../utils/api';

interface Position {
  id: number;
  name: string;
  parent_id: number | null;
  children?: Position[]; // Add children if needed
}

export const PositionList = ({ onEdit }: { onEdit: (position: Position) => void }) => {
  const { data: positions, isLoading, error } = useQuery({
    queryKey: ['positions'],
    queryFn: getPositions,
    staleTime: Infinity,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  function renderPositions(positions: Position[] | undefined) {
    return (
      <List spacing="sm">
        {positions?.map((position) => (
          <List.Item key={position.id}>
            <Group justify="space-between">
              <span>{position.name}</span>
              <Group>
                <Button onClick={() => onEdit(position)}>Edit</Button>
                <Button color="red">Delete</Button>
              </Group>
            </Group>
            {position.children && renderPositions(position.children)}
          </List.Item>
        ))}
      </List>
    );
  }

  return <div>{renderPositions(positions)}</div>;
};

export default PositionList;