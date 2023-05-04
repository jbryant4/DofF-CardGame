import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import CardCollector, { UserDocument } from '~/models/Collector';
import connectFateCollection from '~/utils/connectFateCollection';

async function editUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const { userName, password, email } = req.body;
    const user = await CardCollector.findByIdAndUpdate(
      id as string,
      { userName, password, email },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.error('Error editing user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    await CardCollector.findByIdAndDelete(id as string);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

//only for test
export const getAllUsers = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    // get all users, including the test user
    const users: UserDocument[] = await CardCollector.find();

    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Connect to the database
  await connectFateCollection();

  switch (req.method) {
    case 'POST':
      await createUser(req, res);
      break;
    case 'PUT':
      await editUser(req, res);
      break;
    case 'DELETE':
      await deleteUser(req, res);
      break;
    case 'GET':
      await getAllUsers(req, res);
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
