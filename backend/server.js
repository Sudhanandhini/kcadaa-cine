const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your-secret-key-change-this-to-something-secure';

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kcadaa_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Email Configuration - UPDATE THESE
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sunsys06@gmail.com',        // CHANGE THIS
    pass: 'nfjvhovszzedsvib'            // CHANGE THIS
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log('Email error:', error);
  } else {
    console.log('Email ready');
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Only .png, .jpg and .jpeg allowed!'));
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// CONTACT FORM ROUTE
app.post('/api/contact', async (req, res) => {
  const { name, email, website, phone, subject, message } = req.body;

  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  try {
    const query = 'INSERT INTO contacts (name, email, website, phone, subject, message, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())';
    db.query(query, [name, email, website || '', phone, subject, message]);

    const adminMail = {
      from: email,
      to: 'kcadaa.blr@gmail.com',
      subject: `New Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${website ? `<p><strong>Website:</strong> ${website}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    };

    const userMail = {
      from: 'kcadaa.blr@gmail.com',
      to: email,
      subject: 'Thank you for contacting KCADAA',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: #005d9b; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Karnataka Cine Art-Directors Association</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; margin-top: 20px; border-radius: 8px;">
            <h2 style="color: #005d9b;">Hello ${name},</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Thank you for contacting the Karnataka Cine Art-Directors and Assistants Association. 
              We have received your message and will get back to you as soon as possible.
            </p>
            
            <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-left: 4px solid #005d9b; border-radius: 4px;">
              <h3 style="color: #005d9b; margin-top: 0;">Your Submitted Details:</h3>
              
              <table style="width: 100%; margin-top: 10px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333; width: 150px;">Name:</td>
                  <td style="padding: 8px 0; color: #666;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                  <td style="padding: 8px 0; color: #666;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Contact Number:</td>
                  <td style="padding: 8px 0; color: #666;">${phone}</td>
                </tr>
                ${website ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Website:</td>
                  <td style="padding: 8px 0; color: #666;">${website}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Subject:</td>
                  <td style="padding: 8px 0; color: #666;">${subject}</td>
                </tr>
              </table>
              
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;">
                <p style="color: #333; margin: 5px 0; font-weight: bold;">Your Message:</p>
                <p style="color: #666; line-height: 1.6; margin: 10px 0;">${message}</p>
              </div>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              Our team typically responds within 24-48 hours during business days (Monday to Saturday, 10:00 AM to 6:00 PM).
            </p>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #f0f8ff; border-radius: 4px;">
              <h3 style="color: #005d9b; margin-top: 0;">Our Contact Information:</h3>
              <p style="color: #666; margin: 8px 0;">📧 <strong>Email:</strong> kcadaa.blr@gmail.com</p>
              <p style="color: #666; margin: 8px 0;">📞 <strong>Phone:</strong> +91 74110 41975</p>
              <p style="color: #666; margin: 8px 0;">📍 <strong>Address:</strong> Gandhingara, Bengaluru</p>
              <p style="color: #666; margin: 8px 0;">🕐 <strong>Office Hours:</strong> MON-SAT, 10:00 AM - 6:00 PM</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px;">
            <p style="margin: 5px 0;">This is an automated response. Please do not reply to this email.</p>
            <p style="margin: 5px 0;">&copy; 2024 Karnataka Cine Art-Directors and Assistants Association</p>
            <p style="margin: 5px 0;">All rights reserved.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM admins WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    const admin = results[0];
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, username: admin.username });
  });
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

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
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

app.get('/api/members/:id', (req, res) => {
  db.query('SELECT * FROM members WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'Member not found' });
    res.json(results[0]);
  });
});

app.post('/api/members', authenticateToken, upload.single('image'), (req, res) => {
  const { name, role, member_id, category, biography, awards, filmography, social_links } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  const query = 'INSERT INTO members (name, role, member_id, category, image, biography, awards, filmography, social_links) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, role, member_id, category, image, biography, awards, filmography, social_links], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err });
    res.status(201).json({ id: result.insertId, message: 'Member created successfully' });
  });
});

app.put('/api/members/:id', authenticateToken, upload.single('image'), (req, res) => {
  const { name, role, member_id, category, biography, awards, filmography, social_links } = req.body;
  let image = req.body.existingImage;
  if (req.file) {
    image = `/uploads/${req.file.filename}`;
    if (req.body.existingImage) {
      const oldImagePath = path.join(__dirname, req.body.existingImage);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }
  }
  const query = 'UPDATE members SET name = ?, role = ?, member_id = ?, category = ?, image = ?, biography = ?, awards = ?, filmography = ?, social_links = ? WHERE id = ?';
  db.query(query, [name, role, member_id, category, image, biography, awards, filmography, social_links, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Member updated successfully' });
  });
});

app.delete('/api/members/:id', authenticateToken, (req, res) => {
  db.query('SELECT image FROM members WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length > 0 && results[0].image) {
      const imagePath = path.join(__dirname, results[0].image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
    db.query('DELETE FROM members WHERE id = ?', [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ message: 'Member deleted successfully' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});