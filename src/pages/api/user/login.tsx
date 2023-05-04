import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import CardCollector, { UserDocument } from '~/models/Collector';
import connectFateCollection from '~/utils/connectFateCollection';

async function login(req: NextApiRequest, res: NextApiResponse) {
  await connectFateCollection();

  try {
    const { userName, password } = req.body;

    // Find the user by their username
    const user: UserDocument | null = await CardCollector.findOne({ userName });
    // If the user is not found or the password is incorrect, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token with the user ID as the payload
    // TODO make this when we go to prod process.env.JWT_SECRET
    const token = jwt.sign({ sub: user._id }, 'testsecret', {
      expiresIn: '1h'
    });

    // Return the token and the user data
    res.json({ token, user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default login;
