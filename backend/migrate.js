const pool = require('./db');

async function migrate() {
  const client = await pool.connect();
  try {
    console.log('Running migrations...');

    await client.query(`
      CREATE TABLE IF NOT EXISTS hero_content (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) DEFAULT 'Anus Imran',
        tagline VARCHAR(255) DEFAULT 'Hi, I''m',
        subtitle TEXT DEFAULT 'I Develop User Interfaces, Web Applications, and Android Applications, delivering seamless and engaging user experiences.',
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS about_content (
        id SERIAL PRIMARY KEY,
        bio TEXT DEFAULT '',
        typing_words TEXT[] DEFAULT ARRAY['Software Engineer','Web Developer','App Developer','UI/UX Designer'],
        cv_url TEXT DEFAULT '',
        profile_image_url TEXT DEFAULT '',
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS stats (
        id SERIAL PRIMARY KEY,
        num INTEGER NOT NULL,
        text VARCHAR(255) NOT NULL,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS experiences (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company_name VARCHAR(255) DEFAULT '',
        icon_url TEXT DEFAULT '',
        icon_bg VARCHAR(50) DEFAULT '#383E56',
        date_range VARCHAR(255) DEFAULT '',
        points TEXT[] DEFAULT ARRAY[]::TEXT[],
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS education (
        id SERIAL PRIMARY KEY,
        degree VARCHAR(255) NOT NULL,
        institution VARCHAR(255) NOT NULL,
        location VARCHAR(255) DEFAULT '',
        start_date VARCHAR(100) DEFAULT '',
        end_date VARCHAR(100) DEFAULT '',
        grade VARCHAR(100) DEFAULT '',
        icon_url TEXT DEFAULT '',
        icon_bg VARCHAR(50) DEFAULT '#383E56',
        details TEXT[] DEFAULT ARRAY[]::TEXT[],
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS tech_stack (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        icon_url TEXT DEFAULT '',
        width INTEGER DEFAULT 40,
        height INTEGER DEFAULT 40,
        percentage INTEGER DEFAULT 70,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT DEFAULT '',
        full_description TEXT DEFAULT '',
        image_url TEXT DEFAULT '',
        live_demo_link TEXT DEFAULT '',
        github_link TEXT DEFAULT '',
        tech_stack TEXT[] DEFAULT ARRAY[]::TEXT[],
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Seed hero content if empty
    const heroCheck = await client.query('SELECT COUNT(*) FROM hero_content');
    if (parseInt(heroCheck.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO hero_content (name, tagline, subtitle)
        VALUES ('Anus Imran', 'Hi, I''m', 'I Develop User Interfaces, Web Applications, and Android Applications, delivering seamless and engaging user experiences.')
      `);
    }

    // Seed about content if empty
    const aboutCheck = await client.query('SELECT COUNT(*) FROM about_content');
    if (parseInt(aboutCheck.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO about_content (bio, typing_words, cv_url, profile_image_url)
        VALUES (
          'I am a Pakistan-based full-stack mobile and web app developer with expertise in both frontend and backend development. I specialize in creating visually appealing, interactive, and user-friendly designs that offer smooth and seamless experiences.',
          ARRAY['Software Engineer','Web Developer','App Developer','UI/UX Designer'],
          '',
          ''
        )
      `);
    }

    // Seed stats if empty
    const statsCheck = await client.query('SELECT COUNT(*) FROM stats');
    if (parseInt(statsCheck.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO stats (num, text, display_order) VALUES
        (2, 'Years of Experience', 1),
        (16, 'Projects Completed', 2),
        (14, 'Technologies Mastered', 3),
        (200, 'Code Commits', 4)
      `);
    }

    // Seed experiences if empty
    const expCheck = await client.query('SELECT COUNT(*) FROM experiences');
    if (parseInt(expCheck.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO experiences (title, company_name, icon_url, icon_bg, date_range, points, display_order) VALUES
        ('Full Stack Web App Developer', '', '', '#383E56', 'October 2022 - Present', ARRAY['Developing and maintaining web applications using React.js and other related technologies.','Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.'], 1),
        ('Flutter Mobile Application Developer', '', '', '#E6DEDD', 'Feb 2023 - June 2023', ARRAY['Developing and maintaining mobile applications using Flutter.','Implementing responsive design and ensuring cross-platform compatibility.'], 2)
      `);
    }

    // Seed education if empty
    const eduCheck = await client.query('SELECT COUNT(*) FROM education');
    if (parseInt(eduCheck.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO education (degree, institution, location, start_date, end_date, grade, icon_url, icon_bg, details, display_order) VALUES
        ('Bachelor of Science in Software Engineering', 'National Textile University', 'Faisalabad, Pakistan', 'October 2022', 'Present', '3.44/4.0 CGPA', '', '#383E56', ARRAY['Gained strong foundational knowledge in computer science, software design, and development principles.'], 1),
        ('Intermediate in Pre-Medical', 'Student''s Inn College', 'Faisalabad, Pakistan', 'March 2020', 'May 2022', '958/1100', '', '#383E56', ARRAY['Completed Intermediate in Pre-Medical with strong academic results.'], 2),
        ('Matriculation in Science', 'Wapda Boys High School', 'Faisalabad, Pakistan', 'April 2014', 'March 2016', '1006/1100', '', '#383E56', ARRAY['Studied core subjects including mathematics, physics, chemistry, and computer science.'], 3)
      `);
    }

    console.log('Migrations completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch(console.error);
