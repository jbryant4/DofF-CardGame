import { NextApiRequest, NextApiResponse } from 'next';
import { connectFateCollection } from '~/utils/connectFateCollection';

export default async function getCards(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db, client } = await connectFateCollection();

  try {
    const cards = await db.collection('cards').find().toArray();
    console.log(cards);
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving cards from database.' });
  } finally {
    // Close the database connection when done
    await client.close();
  }
}
