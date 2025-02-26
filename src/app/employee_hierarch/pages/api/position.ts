import { NextApiRequest, NextApiResponse } from 'next';
import { getPositions, createPosition, updatePosition, deletePosition } from '../../utils/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const positions = await getPositions();
      res.status(200).json(positions);
      return;
    }

    if (req.method === 'POST') {
      const { name, parent_id } = req.body;
      const newPosition = await createPosition({ name, parent_id });
      res.status(201).json(newPosition);
      return;
    }

    if (req.method === 'PUT') {
      const { id, name, parent_id } = req.body;
      const updatedPosition = await updatePosition({ id, name, parent_id });
      if (updatedPosition) {
        res.status(200).json(updatedPosition);
      } else {
        res.status(404).json({ message: 'Position not found' });
      }
      return;
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      const success = await deletePosition(id);
      if (success) {
        res.status(200).json({ message: 'Position deleted' });
      } else {
        res.status(404).json({ message: 'Position not found' });
      }
      return;
    }

    res.status(405).json({ message: 'Method Not Allowed' }); // Handle unsupported methods
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: 'Error processing request', error: err.message });
  }
}
