import mongoose from 'mongoose';
//turn into env for prod

export default async function connectFateCollection() {
  const uri =
    'mongodb://dueloffatescards:OKgDFvK7OI6RYtptdbcIOxpjC6nQEtSdFxiVpYCEGLDWAn63C9wgS28RlsAxbra6ECrKgQfgDvWwACDb2nhdWw==@dueloffatescards.mongo.cosmos.azure.com:10255/DuelOfFates?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@dueloffatescards@';
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
