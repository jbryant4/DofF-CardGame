import type { NextApiRequest, NextApiResponse } from 'next';
import { connectFateCollection } from '~/utils/connectFateCollection';

export default async function handleUserLogin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Connect to MongoDB
    const { db, client } = await connectFateCollection();

    try {
      // Find user in database by email and password
      const user = await db.collection('users').findOne({
        email,
        password
      });

      if (!user) {
        res.status(401).json({ message: 'Invalid login credentials' });

        return;
      }

      // User found, return success response
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      // Close the database connection when done
      await client.close();
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
