import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import User, { UserDocument } from '~/models/User';
import connectFateCollection from '~/utils/connectFateCollection';

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  await connectFateCollection();

  try {
    const { userName, password, email } = req.body;

    // input validation
    if (!userName || !password || !email) {
      return res
        .status(400)
        .json({ error: 'Please provide all required fields' });
    }

    if (
      typeof userName !== 'string' ||
      typeof password !== 'string' ||
      typeof email !== 'string'
    ) {
      return res
        .status(400)
        .json({ error: 'Please provide all fields as strings' });
    }

    const user: UserDocument = new User({
      userName,
      password,
      email,
      cards: [],
      decks: []
    });

    await user.save();

    // return created user data
    res
      .status(201)
      .json({ message: 'User created successfully', user: user.toJSON() });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default createUser;
