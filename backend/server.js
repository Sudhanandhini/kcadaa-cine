const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your-secret-key-change-this-to-something-secure';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Change this to your MySQL password
  database: 'kcadaa_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
});

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// ==================== AUTH ROUTES ====================

// Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM admins WHERE username = ?', [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = results[0];
    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, {
      expiresIn: '24h'
    });

    res.json({ token, username: admin.username });
  });
});

// Verify token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// ==================== MEMBERS ROUTES ====================

// Get all members
app.get('/api/members', (req, res) => {
  const { category } = req.query;
  let query = 'SELECT * FROM members';
  const params = [];

  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }

  query += ' ORDER BY created_at DESC';

  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Get single member
app.get('/api/members/:id', (req, res) => {
  db.query('SELECT * FROM members WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(results[0]);
  });
});

// Create member
app.post('/api/members', authenticateToken, upload.single('image'), (req, res) => {
  const { name, role, member_id, category, biography, awards, filmography, social_links } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO members (name, role, member_id, category, image, biography, awards, filmography, social_links) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [name, role, member_id, category, image, biography, awards, filmography, social_links], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err });
    }
    res.status(201).json({ id: result.insertId, message: 'Member created successfully' });
  });
});

// Update member
app.put('/api/members/:id', authenticateToken, upload.single('image'), (req, res) => {
  const { name, role, member_id, category, biography, awards, filmography, social_links } = req.body;
  let image = req.body.existingImage;

  if (req.file) {
    image = `/uploads/${req.file.filename}`;
    // Delete old image if exists
    if (req.body.existingImage) {
      const oldImagePath = path.join(__dirname, req.body.existingImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
  }

  const query = 'UPDATE members SET name = ?, role = ?, member_id = ?, category = ?, image = ?, biography = ?, awards = ?, filmography = ?, social_links = ? WHERE id = ?';
  
  db.query(query, [name, role, member_id, category, image, biography, awards, filmography, social_links, req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Member updated successfully' });
  });
});

// Delete member
app.delete('/api/members/:id', authenticateToken, (req, res) => {
  // First get the member to delete the image
  db.query('SELECT image FROM members WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0 && results[0].image) {
      const imagePath = path.join(__dirname, results[0].image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    db.query('DELETE FROM members WHERE id = ?', [req.params.id], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Member deleted successfully' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});