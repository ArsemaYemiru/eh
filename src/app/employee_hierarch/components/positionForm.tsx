"use client";
import { useState } from 'react';
import { Button, TextInput, Select, Group } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPosition, getPositions, updatePosition } from '../utils/api';
import { Position } from 'postcss';

interface PositionFormProps {
  position?: { id: number; name: string; parent_id: number | null };
  onClose: () => void;
}

export const PositionForm = ({ position, onClose }: PositionFormProps) => {
  const { data: positions = [] } = useQuery({
    queryKey: ['positions'],
    queryFn: getPositions,
    staleTime: Infinity,
  });

  const [name, setName] = useState(position?.name || '');
  const [parentId, setParentId] = useState<number | null>(position?.parent_id || null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: position ? updatePosition : createPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['positions'] });
      onClose();
    },
  });

  const flattenPositions = (positions: Position[]) => {
    const flattenedPositions: Position[] = [];
    positions.forEach(position => {
      flattenedPositions.push(position);
      if ('children' in position && position.children) {
        flattenedPositions.push(...flattenPositions(position.children as Position[]));
      }
    });
    return flattenedPositions;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, parent_id: parentId };
    if (position) {
      mutation.mutate({ ...payload, id: position.id });
    } else {
      mutation.mutate(payload as any);
    }
  };

  const filteredParents = flattenPositions(positions).filter(p => p.id !== position?.id);

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Position Name"
        placeholder="Enter position name"
        value={name}
        onChange={(e: { target: { value: any } }) => setName(e.target.value)}
        required
      />
      <Select
        label="Parent Position"
        value={parentId !== null ? parentId.toString() : ''}
        onChange={(value: string | null) => setParentId(value ? parseInt(value) : null)}
        data={[
          { value: "", label: 'No Parent' },
          ...filteredParents.map((p: any) => ({ value: p.id.toString(), label: p.name })),
        ]}
      />

      <Group mt="md" grow>
        <Button type="submit">{position ? 'Update Position' : 'Create Position'}</Button>
      </Group>
    </form>
  );
};

export default PositionForm;
