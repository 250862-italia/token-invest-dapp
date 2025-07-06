import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { dbHelpers } from '../../../lib/database';

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), 'uploads', 'kyc');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${uuidv4()}-${file.originalname}`;
      cb(null, uniqueName);
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images and PDFs
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed'), false);
    }
  }
});

// Disable default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Handle file upload
const uploadMiddleware = upload.single('document');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  uploadMiddleware(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const { documentType, userEmail } = req.body;

      if (!documentType || !userEmail) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Get user from database
      const user = await dbHelpers.getUserByEmail(userEmail);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Save document info to database
      const documentId = await dbHelpers.saveKycDocument(
        user.id,
        documentType,
        req.file.path,
        req.file.originalname,
        req.file.size,
        req.file.mimetype
      );

      res.status(200).json({
        success: true,
        message: 'Document uploaded successfully',
        documentId,
        filename: req.file.originalname,
        size: req.file.size
      });

    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
} 