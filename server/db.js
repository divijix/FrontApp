import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export const query = (text, params) => pool.query(text, params);

export const initDb = async () => {
  console.log('Initializing database tables...');
  try {
    // 1. Users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ensure role column exists for older users table migrations
    await query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user';
    `);

    // 2. Contacts table
    await query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        email VARCHAR(100) NOT NULL,
        subject VARCHAR(200),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Inquiries table
    await query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        email VARCHAR(100) NOT NULL,
        course VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Courses table
    await query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        level VARCHAR(50) NOT NULL,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(255),
        icon_name VARCHAR(50),
        is_technical BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 5. Enrollments table
    await query(`
      CREATE TABLE IF NOT EXISTS enrollments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, course_id)
      );
    `);

    // 6. Snap Tests table
    await query(`
      CREATE TABLE IF NOT EXISTS snap_tests (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        score INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        topic VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 7. Applications table
    await query(`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        linkedin VARCHAR(200) NOT NULL,
        college VARCHAR(200) NOT NULL,
        passout VARCHAR(10) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 8. Posts table
    await query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        author_name VARCHAR(100) NOT NULL,
        author_email VARCHAR(100) NOT NULL,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        likes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ensure likes column exists for older posts tables
    await query(`
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS likes INT DEFAULT 0;
    `);

    // 9. Comments table
    await query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
        author_name VARCHAR(100) NOT NULL,
        author_email VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 10. Seed default admin user
    const adminEmail = 'admin@gmail.com';
    const adminCheck = await query('SELECT * FROM users WHERE email = $1', [adminEmail]);
    if (adminCheck.rows.length === 0) {
      console.log('Seeding default admin user...');
      const hashedPassword = bcrypt.hashSync('admin123', 10);
      await query(
        `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)`,
        ['Admin User', adminEmail, hashedPassword, 'admin']
      );
      console.log('Admin user successfully seeded.');
    }

    // 11. Seed courses if none exist
    const { rows } = await query('SELECT COUNT(*) FROM courses');
    if (parseInt(rows[0].count) === 0) {
      console.log('Seeding default courses...');
      
      const defaultCourses = [
        // Foundation Courses
        {
          level: 'Foundation',
          title: 'Digital Marketing',
          description: 'Master data-driven strategies, AI-powered content and performance marketing.',
          image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
          icon_name: null,
          is_technical: false
        },
        {
          level: 'Intermediate',
          title: 'Data Science',
          description: 'Extract actionable insights using statistical modeling and machine learning.',
          image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
          icon_name: null,
          is_technical: false
        },
        {
          level: 'Beginner',
          title: 'Data Analysis',
          description: 'Transform raw data into meaningful stories using Excel, SQL and analytics.',
          image_url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
          icon_name: null,
          is_technical: false
        },
        // Technical Courses
        {
          level: 'Intermediate',
          title: 'Full Stack AI Engineering',
          description: 'Build modern AI-powered applications using React and APIs.',
          image_url: null,
          icon_name: 'FaCode',
          is_technical: true
        },
        {
          level: 'Intermediate',
          title: 'Generative AI',
          description: 'Dive into LLMs, prompt engineering and AI tools.',
          image_url: null,
          icon_name: 'FaBrain',
          is_technical: true
        },
        {
          level: 'Advanced',
          title: 'Agentic AI',
          description: 'Create autonomous AI systems with minimal human intervention.',
          image_url: null,
          icon_name: 'FaRobot',
          is_technical: true
        },
        {
          level: 'Advanced',
          title: 'RAG Systems',
          description: 'Build Retrieval-Augmented Generation systems for enterprise AI.',
          image_url: null,
          icon_name: 'FaSearch',
          is_technical: true
        },
        {
          level: 'Beginner',
          title: 'Prompt Engineering',
          description: 'Master prompting techniques for modern AI applications.',
          image_url: null,
          icon_name: 'FaDatabase',
          is_technical: true
        },
        {
          level: 'Intermediate',
          title: 'AI Workflow Automation',
          description: 'Design AI automation pipelines for business operations.',
          image_url: null,
          icon_name: 'FaRobot',
          is_technical: true
        }
      ];

      for (const course of defaultCourses) {
        await query(
          `INSERT INTO courses (level, title, description, image_url, icon_name, is_technical) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [course.level, course.title, course.description, course.image_url, course.icon_name, course.is_technical]
        );
      }
      console.log('Database successfully seeded with courses.');
    } else {
      console.log('Courses table already populated.');
    }
    console.log('Database initialization completed.');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};
