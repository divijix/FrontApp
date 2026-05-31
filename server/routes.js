import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from './db.js';

const router = express.Router();

// Middleware to verify JWT Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access forbidden: Admin access only' });
  }
};

// --- AUTH ROUTES ---

// 1. Signup Route
router.post('/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const userExist = await query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user (default role is 'user')
    const newUser = await query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at',
      [name, email.toLowerCase(), hashedPassword, 'user']
    );

    const user = newUser.rows[0];

    // Generate JWT including the role
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 2. Login Route
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find user
    const userResult = await query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = userResult.rows[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT including the role
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 3. Verify Token Route
router.get('/auth/verify', authenticateToken, async (req, res) => {
  res.json({
    valid: true,
    user: req.user
  });
});

// --- CONTACT ROUTES ---

// 4. Submit Contact Message
router.post('/contact', async (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    const result = await query(
      'INSERT INTO contacts (name, phone, email, subject, message) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, phone || null, email, subject || null, message]
    );

    res.status(201).json({
      message: 'Contact message saved successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- INQUIRY ROUTES ---

// 5. Submit Course Inquiry
router.post('/inquiries', async (req, res) => {
  const { name, phone, email, course, message } = req.body;

  if (!name || !email || !course || !message) {
    return res.status(400).json({ error: 'Name, email, course, and message are required' });
  }

  try {
    const result = await query(
      'INSERT INTO inquiries (name, phone, email, course, message) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, phone || null, email, course, message]
    );

    res.status(201).json({
      message: 'Course inquiry saved successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Inquiry submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- COURSE ROUTES ---

// 6. Fetch all courses
router.get('/courses', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM courses ORDER BY id ASC');
    res.json(rows);
  } catch (error) {
    console.error('Fetch courses error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- ENROLLMENT ROUTES ---

// 7. Enroll in a course (User only)
router.post('/courses/enroll', authenticateToken, async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id;

  if (!courseId) {
    return res.status(400).json({ error: 'Course ID is required' });
  }

  try {
    // Check if course exists
    const courseCheck = await query('SELECT * FROM courses WHERE id = $1', [courseId]);
    if (courseCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Insert enrollment
    await query(
      'INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2) ON CONFLICT (user_id, course_id) DO NOTHING',
      [userId, courseId]
    );

    res.status(201).json({
      message: 'Enrolled successfully'
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 8. Fetch enrolled courses (User only)
router.get('/my-courses', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const { rows } = await query(
      `SELECT c.* FROM courses c 
       JOIN enrollments e ON c.id = e.course_id 
       WHERE e.user_id = $1 
       ORDER BY e.created_at DESC`,
      [userId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Fetch enrolled courses error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- SNAP TEST ROUTES ---

// 9. Submit Snap Test Score (User only)
router.post('/snap-tests/submit', authenticateToken, async (req, res) => {
  const { score, totalQuestions, topic } = req.body;
  const userId = req.user.id;

  if (score === undefined || !totalQuestions || !topic) {
    return res.status(400).json({ error: 'Score, totalQuestions, and topic are required' });
  }

  try {
    const result = await query(
      'INSERT INTO snap_tests (user_id, score, total_questions, topic) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, score, totalQuestions, topic]
    );

    res.status(201).json({
      message: 'Snap test score saved successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Snap test submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 10. Fetch user's snap test history (User only)
router.get('/my-snap-tests', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const { rows } = await query(
      'SELECT * FROM snap_tests WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Fetch student snap tests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- ADMISSION APPLICATION ROUTES ---

// 11. Submit Admission Application (Public)
router.post('/applications', async (req, res) => {
  const { name, email, phone, linkedin, college, passout } = req.body;

  if (!name || !email || !phone || !linkedin || !college || !passout) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await query(
      `INSERT INTO applications (name, email, phone, linkedin, college, passout) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, email, phone, linkedin, college, passout]
    );

    res.status(201).json({
      message: 'Application submitted successfully',
      application: result.rows[0]
    });
  } catch (error) {
    console.error('Submit application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- COMMUNITY POSTS ROUTES ---

// 12. Submit a community post (Public)
router.post('/posts', async (req, res) => {
  const { author_name, author_email, title, content } = req.body;

  if (!author_name || !author_email || !title || !content) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await query(
      `INSERT INTO posts (author_name, author_email, title, content, status, likes) 
       VALUES ($1, $2, $3, $4, 'pending', 0) RETURNING *`,
      [author_name, author_email, title, content]
    );

    res.status(201).json({
      message: 'Post submitted successfully. It will be visible on the community feed once approved by an admin.',
      post: result.rows[0]
    });
  } catch (error) {
    console.error('Submit post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 13. Fetch approved community posts (Public)
router.get('/posts', async (req, res) => {
  try {
    const { rows } = await query(
      "SELECT * FROM posts WHERE status = 'approved' ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error('Fetch approved posts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 14. Update community post status (Admin only)
router.put('/admin/posts/:id/status', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Valid status is required' });
  }

  try {
    const result = await query(
      'UPDATE posts SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({
      message: `Post status successfully updated to ${status}`,
      post: result.rows[0]
    });
  } catch (error) {
    console.error('Admin update post status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 15. Increment post likes count (Public)
router.post('/posts/:id/like', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query(
      'UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING likes',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ likes: result.rows[0].likes });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 16. Post a comment on a community post (Public)
router.post('/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { author_name, author_email, content } = req.body;

  if (!author_name || !author_email || !content) {
    return res.status(400).json({ error: 'Name, email, and content are required' });
  }

  try {
    const result = await query(
      `INSERT INTO comments (post_id, author_name, author_email, content) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [id, author_name, author_email, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Submit comment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 17. Fetch comments for a specific post (Public)
router.get('/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await query(
      'SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC',
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.error('Fetch comments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 18. Delete comment (Admin only)
router.delete('/admin/comments/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('DELETE FROM comments WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted successfully', comment: result.rows[0] });
  } catch (error) {
    console.error('Admin delete comment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- ADMIN CONTROL ROUTES ---

// 19. Add a new course (Admin only)
router.post('/admin/courses', authenticateToken, requireAdmin, async (req, res) => {
  const { level, title, description, image_url, icon_name, is_technical } = req.body;

  if (!level || !title || !description) {
    return res.status(400).json({ error: 'Level, title, and description are required' });
  }

  try {
    const result = await query(
      `INSERT INTO courses (level, title, description, image_url, icon_name, is_technical) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [level, title, description, image_url || null, icon_name || null, is_technical ?? true]
    );

    res.status(201).json({
      message: 'Course added successfully',
      course: result.rows[0]
    });
  } catch (error) {
    console.error('Admin add course error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 20. Fetch all admin stats & details (Admin only)
router.get('/admin/data', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
    const contacts = await query('SELECT * FROM contacts ORDER BY created_at DESC');
    const inquiries = await query('SELECT * FROM inquiries ORDER BY created_at DESC');
    const enrollments = await query(
      `SELECT e.id, u.name as user_name, u.email as user_email, c.title as course_title, e.created_at 
       FROM enrollments e 
       JOIN users u ON e.user_id = u.id 
       JOIN courses c ON e.course_id = c.id 
       ORDER BY e.created_at DESC`
    );
    const snapTests = await query(
      `SELECT s.id, u.name as user_name, u.email as user_email, s.score, s.total_questions, s.topic, s.created_at 
       FROM snap_tests s 
       JOIN users u ON s.user_id = u.id 
       ORDER BY s.created_at DESC`
    );
    const courses = await query('SELECT * FROM courses ORDER BY id DESC');
    const applications = await query('SELECT * FROM applications ORDER BY created_at DESC');
    const posts = await query('SELECT * FROM posts ORDER BY created_at DESC');

    res.json({
      users: users.rows,
      contacts: contacts.rows,
      inquiries: inquiries.rows,
      enrollments: enrollments.rows,
      snapTests: snapTests.rows,
      courses: courses.rows,
      applications: applications.rows,
      posts: posts.rows
    });
  } catch (error) {
    console.error('Admin fetch data error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
