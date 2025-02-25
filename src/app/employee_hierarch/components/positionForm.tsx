"use client";
import { useState } from 'react';
import { Button, TextInput, Select, Group } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPosition, updatePosition } from '../utils/api';

interface PositionFormProps {
  position?: { id: number; name: string; parent_id: number | null };
  onClose: () => void;
}

export const PositionForm = ({ position, onClose }: PositionFormProps) => {
  const [name, setName] = useState(position?.name || '');
  const [parentId, setParentId] = useState<number | null>(position?.parent_id || null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: { id?: number; name: string; parent_id: number | null }) => {
      if (position) {
        return updatePosition({ id: payload.id!, name: payload.name, parent_id: payload.parent_id }, {name, parentId, description: ''});
      } else {
        return createPosition(payload);
      }
    },
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
      mutation.mutate(payload);
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
        data={[{ value: '', label: 'No Parent' }, /* Add dynamic data here */]}
      />
      <Group mt="md" grow>
        <Button type="submit">{position ? 'Update Position' : 'Create Position'}</Button>
      </Group>
    </form>
  );
};

export default PositionForm;
