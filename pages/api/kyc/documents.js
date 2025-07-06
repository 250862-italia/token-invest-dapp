import { dbHelpers } from '../../../lib/database';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userEmail } = req.query;

    if (!userEmail) {
      return res.status(400).json({ error: 'User email is required' });
    }

    // Get user from database
    const user = await dbHelpers.getUserByEmail(userEmail);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get KYC documents for user
    const documents = await dbHelpers.getKycDocuments(user.id);

    // Group documents by type
    const documentsByType = {
      identity: documents.find(doc => doc.document_type === 'identity'),
      residence: documents.find(doc => doc.document_type === 'residence'),
      selfie: documents.find(doc => doc.document_type === 'selfie')
    };

    res.status(200).json({
      success: true,
      documents: documentsByType,
      totalDocuments: documents.length,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        status: user.status
      }
    });

  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 