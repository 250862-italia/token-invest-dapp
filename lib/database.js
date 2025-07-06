const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Database file path
const dbPath = path.join(process.cwd(), 'data', 'glg_database.db');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
    initDatabase();
  }
});

// Initialize database tables
function initDatabase() {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    phone TEXT,
    role TEXT DEFAULT 'Partecipante',
    status TEXT DEFAULT 'Verificato',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // KYC documents table
  db.run(`CREATE TABLE IF NOT EXISTS kyc_documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    document_type TEXT NOT NULL,
    file_path TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    status TEXT DEFAULT 'pending',
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    verified_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // KYC submissions table
  db.run(`CREATE TABLE IF NOT EXISTS kyc_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    verified_at DATETIME,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // Insert default user if not exists
  db.get("SELECT * FROM users WHERE email = ?", ['corefound@glgcapitalgroupllc.com'], (err, row) => {
    if (err) {
      console.error('Error checking default user:', err);
    } else if (!row) {
      db.run(`INSERT INTO users (email, firstName, lastName, phone, role, status) 
              VALUES (?, ?, ?, ?, ?, ?)`, 
        ['corefound@glgcapitalgroupllc.com', 'Utente', 'GLG', '+1 (555) 123-4567', 'Partecipante', 'Verificato'],
        (err) => {
          if (err) {
            console.error('Error inserting default user:', err);
          } else {
            console.log('✅ Default user created');
          }
        }
      );
    }
  });
}

// Helper functions
const dbHelpers = {
  // Get user by email
  getUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  // Get KYC documents for user
  getKycDocuments: (userId) => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM kyc_documents WHERE user_id = ? ORDER BY uploaded_at DESC", [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // Save KYC document
  saveKycDocument: (userId, documentType, filePath, originalFilename, fileSize, mimeType) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO kyc_documents (user_id, document_type, file_path, original_filename, file_size, mime_type) 
              VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, documentType, filePath, originalFilename, fileSize, mimeType],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  },

  // Create KYC submission
  createKycSubmission: (userId) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO kyc_submissions (user_id, status) VALUES (?, 'pending')`,
        [userId],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  },

  // Update KYC submission status
  updateKycSubmissionStatus: (submissionId, status, notes = null) => {
    return new Promise((resolve, reject) => {
      const verifiedAt = status === 'verified' ? new Date().toISOString() : null;
      db.run(`UPDATE kyc_submissions SET status = ?, verified_at = ?, notes = ? WHERE id = ?`,
        [status, verifiedAt, notes, submissionId],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }
};

module.exports = { db, dbHelpers }; 