import { dbHelpers } from '../../../lib/database';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({ error: 'User email is required' });
    }

    // Get user from database
    const user = await dbHelpers.getUserByEmail(userEmail);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user has uploaded all required documents
    const documents = await dbHelpers.getKycDocuments(user.id);
    const requiredTypes = ['identity', 'residence', 'selfie'];
    const uploadedTypes = documents.map(doc => doc.document_type);

    const missingDocuments = requiredTypes.filter(type => !uploadedTypes.includes(type));

    if (missingDocuments.length > 0) {
      return res.status(400).json({
        error: 'Missing required documents',
        missingDocuments
      });
    }

    // Create KYC submission
    const submissionId = await dbHelpers.createKycSubmission(user.id);

    res.status(200).json({
      success: true,
      message: 'KYC submission created successfully',
      submissionId,
      status: 'pending',
      estimatedTime: '24-48 hours'
    });

  } catch (error) {
    console.error('KYC submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 