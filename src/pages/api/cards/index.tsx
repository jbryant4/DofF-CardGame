import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import Card from '~/models/Card';
import connectFateCollection from '~/utils/connectFateCollection';

let cachedConnection: mongoose.Connection;

export const getAllCards = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const cards = await Card.find();

    return res.status(200).json(cards);
  } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error}` });
  }
};

export const createCard = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //TODO make user check from here
    // if (!user.isAdmin) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }

    const card = await Card.create(req.body);

    return res.status(201).json(card);
  } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error}` });
  }
};

export const editCard = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //TODO make user check from here
    // if (!user.isAdmin) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id } = req.body;
    const card = await Card.findByIdAndUpdate(
      new mongoose.Types.ObjectId(_id),
      req.body,
      { new: true }
    );

    if (!card) {
      return res.status(404).json({ error: 'UpdatedCard not found' });
    }

    return res.status(200).json(card);
  } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error}` });
  }
};

export const deleteCard = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //TODO make user check from here
    // if (!user.isAdmin) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }

    const { id } = req.query;
    const card = await Card.findByIdAndDelete(id);

    if (!card) {
      return res.status(404).json({ error: 'UpdatedCard not found' });
    }

    res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error}` });
  }
};

export default async function cardHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Connect to the database
  await connectFateCollection();

  //TODO grab accessToken from local stoage to see if they are admin or not and pass that into functions

  switch (req.method) {
    case 'POST':
      await createCard(req, res);
      break;
    case 'PUT':
      await editCard(req, res);
      break;
    case 'DELETE':
      await deleteCard(req, res);
      break;
    case 'GET':
      await getAllCards(req, res);
      break;
    default:
      return res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
