import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import Collector from '~/models/Collector';
import connectFateCollection from '~/utils/connectFateCollection';
import { generateJWTToken } from '~/utils/token';

export const createCollector = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const collector = await Collector.create(req.body);

    return res.status(201).json(collector);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Unable to create collector: ${error}` });
  }
};

export const findCollector = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userName, codePhrase } = req.query;

    const collector = await Collector.findOne({ userName }, { password: 0 });

    if (!collector) {
      res.status(204).end();

      return;
    }

    if (collector.codePhrase !== codePhrase) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateJWTToken(collector.userName);

    // Send the user data (excluding password) and the JWT token
    res.status(200).json({ collector, token });
  } catch (error) {
    res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

export const updateCollector = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id } = req.body;
    const collector = await Collector.findByIdAndUpdate(
      new mongoose.Types.ObjectId(_id),
      req.body,
      { new: true }
    );

    return res.status(200).json(collector);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error updating collector: ${error}` });
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
    return res
      .status(500)
      .json({ message: `Error deleting collector: ${error}` });
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
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
