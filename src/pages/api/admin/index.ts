import Admin from '~/models/Admin';
import connectFateCollection from '~/utils/connectFateCollection';

export default async function checkAdmin(req, res) {
  // Connect to the database
  await connectFateCollection();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, codePhrase } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ title });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Verify password
    if (admin.codePhrase !== codePhrase) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Admin exists and password is correct
    res.status(200).json({});
  } catch (error) {
    return res.status(500).json({ error: `Server error: ${error}` });
  }
}
