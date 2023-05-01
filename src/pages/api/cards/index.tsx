import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import Card, { CardDocument } from '~/models/Card';
import connectFateCollection from '~/utils/connectFateCollection';

let cachedConnection: mongoose.Connection;

export const getAllCards = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    console.error('Error getting all cards:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCard = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //TODO make user check from here
    // if (!user.isAdmin) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }

    const card = await Card.create(req.body);
    res.status(201).json(card);
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const editCard = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //TODO make user check from here
    // if (!user.isAdmin) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }

    const { _id } = req.body;
    const card = await Card.findByIdAndUpdate(
      new mongoose.Types.ObjectId(_id),
      req.body,
      { new: true }
    );

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.status(200).json(card);
  } catch (error) {
    console.error('Error editing card:', error);
    res.status(500).json({ error: 'Internal server error' });
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
      return res.status(404).json({ error: 'Card not found' });
    }

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ error: 'Internal server error' });
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
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
