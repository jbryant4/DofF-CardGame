import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import Collector from '~/models/Collector';
import connectFateCollection from '~/utils/connectFateCollection';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectFateCollection();

  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { authString } = req.body;

    const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET;

    if (!secretKey) {
      throw new Error(
        'Secret key not provided. Ensure that your environment variable is set.'
      );
    }

    // Verify the token
    jwt.verify(authString, secretKey, async (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      try {
        // Token is valid, you can perform additional checks here if needed
        const collector = await Collector.findOne(
          { userName: decoded.userName },
          { password: 0, email: 0 }
        );

        if (!collector) {
          return res.status(404).json({ error: 'User not found' });
        }

        // For example, you might fetch user data based on the decoded information
        // const userData = await fetchUserData(decoded.userId);

        return res.status(200).json(collector);
      } catch (error) {
        console.error('Error during data retrieval:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  } catch (error) {
    console.error('Error during token validation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
