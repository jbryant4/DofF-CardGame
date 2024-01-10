import { NextApiRequest, NextApiResponse } from 'next';
import Collector from '~/models/Collector'; // Import your Collector model
import connectFateCollection from '~/utils/connectFateCollection';
import { generateJWTToken } from '~/utils/token';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { userName, codePhrase } = req.body;

    // Validate the credentials
    const collector = await Collector.findOne(
      { userName },
      { password: 0, email: 0 }
    );

    if (!collector) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (collector.codePhrase !== codePhrase) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateJWTToken(collector.userName);

    // Send the user data (excluding password) and the JWT token
    res.status(200).json({ collector, token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
