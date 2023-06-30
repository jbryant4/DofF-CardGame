import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import Collector, { CollectorDocument } from '~/models/Collector';
import connectFateCollection from '~/utils/connectFateCollection';

let cachedConnection: mongoose.Connection;

export const createCollector = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const collector = await Collector.create(req.body);
    res.status(201).json(collector);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Unable to create collector' });
  }
};
export const findCollector = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { email, userName } = req.query;
    const collector = await Collector.findOne(email ? { email } : { userName });
    if (!collector) {
      // @ts-ignore
      res.status(204).send();

      return;
    }
    res.status(200).json(collector);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateCollector = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { _id, ...update } = req.body;
    const collector = await Collector.findByIdAndUpdate(
      new mongoose.Types.ObjectId(_id),
      req.body,
      { new: true }
    );
    res.status(200).json(collector);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating collector' });
  }
};

// Delete a collector by their email
export const deleteCollector = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // TODO: Check admin in header
  try {
    const { id } = req.query;
    const collector = await Collector.findByIdAndDelete(id);
    if (!collector) {
      return res.status(404).json({ error: 'Collector not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting collector' });
  }
};

export default async function collectorHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Connect to the database
  await connectFateCollection();

  switch (req.method) {
    case 'POST':
      await createCollector(req, res);
      break;
    case 'PUT':
      await updateCollector(req, res);
      break;
    case 'DELETE':
      await deleteCollector(req, res);
      break;
    case 'GET':
      await findCollector(req, res);
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
