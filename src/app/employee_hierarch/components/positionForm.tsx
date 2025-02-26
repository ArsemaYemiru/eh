"use client";
import { useState } from 'react';
import { Button, TextInput, Select, Group } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPosition, getPositions, updatePosition } from '../utils/api';

interface PositionFormProps {
  position?: { id: number; name: string; parent_id: number | null };
  onClose: () => void;
}

export const PositionForm = ({ position, onClose }: PositionFormProps) => {
  const { data: positions} = useQuery({
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



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, parent_id: parentId };
    if (position) {
      mutation.mutate({ ...payload, id: position.id });
    } else {
      mutation.mutate(payload as any);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Position Name"
        placeholder="Enter position name"
        value={name}
        onChange={(e: { target: { value: any; }; }) => setName(e.target.value)}
        required
      />
      <Select
        label="Parent Position"
        placeholder="Select parent position"
        value={parentId !== null ? parentId.toString() : ''}
        onChange={(value: string | null) => setParentId(value ? parseInt(value) : null)}
        data={[{ value: "", label: 'No Parent' }, ...positions.map((position: any) => ({ value: position.id.toString(), label: position.name }))]}
      />
      <Group mt="md" grow>
        <Button type="submit">{position ? 'Update Position' : 'Create Position'}</Button>
      </Group>
    </form>
  );
};

export default PositionForm;