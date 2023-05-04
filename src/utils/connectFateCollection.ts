import mongoose from 'mongoose';

export default async function connectFateCollection() {
  const uri = process.env.NEXT_PUBLIC_DOF_URI;
  const testUri = process.env.NEXT_PUBLIC_DOF_TEST_URI;

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
