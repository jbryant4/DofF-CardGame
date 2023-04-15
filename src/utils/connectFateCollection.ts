import mongoose from 'mongoose';
//turn into env for prod

export default async function connectToDatabase() {
  const uri =
    'mongodb+srv://jbryant:Pqbnj7GIsu3KX4S5@duel-of-fates.dwbj3zc.mongodb.net/duel-of-fates?retryWrites=true&w=majority';
  // const MONGODB_URI = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  let cachedConnection;

  if (cachedConnection) {
    return cachedConnection;
  }
  try {
    const connection = await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    cachedConnection = connection;

    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}
