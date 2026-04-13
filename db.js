const mysql = require('mysql2/promise');

let pool;

const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'realestate',
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return pool;
};

// Create table and seed default content if not exists
const initDB = async () => {
  const db = getPool();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS content (
      id INT AUTO_INCREMENT PRIMARY KEY,
      section VARCHAR(100) NOT NULL UNIQUE,
      data LONGTEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  const defaultSections = {
    hero: {
      badge: '30+ World Class Amenities | Spacious Balconies for Every Home',
      title: 'THINKING OF A FANTASTIC VICINITY?',
      projectName: 'SKYLINE RESIDENCES',
      smart1bhk: { price: '₹ 49.99 Lacs*', area: '34,999 Sq.Ft.' },
      premium2bhk: { price: '₹ 69.99 Lacs*', area: '34,999 Sq.Ft.' },
      address: 'BBRC No 270/254, Survey No 50, Srinivasanagar Nagar, Hyderabad 500126',
      phone: '90000 272164'
    },
    about: {
      title: 'About Project',
      description: 'Welcome to Eternity, every detail reflects the greatest gesture of luxury that makes life special and memorable. SKYLINE RESIDENCES is an exclusive project that redefines contemporary living.\n\nThe project is spread over more than 3 acres and comes with all modern amenities that you would need to live comfortably.',
      btnText: 'Download Brochure'
    },
    amenities: {
      title: 'Amenities',
      subtitle: 'The finest collection of amenities that offer exhilaration, comfort, wellness and luxury design apparent',
      items: [
        { title: 'Gymnasium', icon: '🏋️' },
        { title: 'Kids Play Area', icon: '🎪' },
        { title: 'Kids Play Area', icon: '🛝' },
        { title: 'Jogging Track', icon: '🏃' },
        { title: 'Yoga Deck', icon: '🧘' },
        { title: 'Yoga Deck', icon: '🌿' }
      ],
      btnText: 'View more'
    },
    floorplan: {
      title: 'Floor Plans',
      tabs: ['1 bhk', '2 bhk', '2.5 bhk'],
      area: '760 sq.ft (904 Sq.ft)',
      price: 'Click for price',
      btnText: 'Download Floor Plan'
    },
    nearbyConnectivity: {
      title: 'Nearby Connectivity',
      items: [
        { place: 'HITEC City', distance: '5 km' },
        { place: 'Gachibowli', distance: '4 km' },
        { place: 'Financial District', distance: '6 km' },
        { place: 'International Airport', distance: '28 km' },
        { place: 'Cyber Towers', distance: '5.5 km' },
        { place: 'Rainbow Hospital', distance: '3 km' }
      ]
    },
    developer: {
      title: 'About Developer',
      description: '"Skyline Developers has been consistently building trust through quality construction and timely delivery for over two decades."',
      stats: [
        { value: '6', label: 'Projects' },
        { value: '1.50 LAC', label: 'Sq.ft Delivered' },
        { value: '440+', label: 'Happy Families' },
        { value: '5.79 LAC', label: 'Sq.ft Ongoing' },
        { value: '2 LAC', label: 'Sq.ft Upcoming' }
      ]
    },
    construction: {
      title: 'Construction Updates',
      updates: [
        { label: 'March 2024' },
        { label: 'June 2024' },
        { label: 'December 2024' }
      ]
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        { q: 'What is the location advantage of this project?', a: 'The project is located in Srinivasa Nagar, Hyderabad with excellent connectivity to HITEC City, Gachibowli, and Financial District.' },
        { q: 'What are the available configurations in this project?', a: 'We offer Smart 1 BHK and Premium 2 BHK apartments designed for modern living.' },
        { q: 'What are the home loans available and who are the bankers?', a: 'We have tie-ups with leading banks including SBI, HDFC, ICICI, and Axis Bank for easy home loan facilities.' },
        { q: 'How should you book and what is the payment structure?', a: 'You can book with 10% of the total cost. Flexible payment plans are available based on construction milestones.' }
      ]
    }
  };

  // Insert defaults only if not already present
  for (const [section, data] of Object.entries(defaultSections)) {
    await db.execute(
      `INSERT IGNORE INTO content (section, data) VALUES (?, ?)`,
      [section, JSON.stringify(data)]
    );
  }

  console.log('✅ MySQL DB initialized and defaults seeded');
};

module.exports = { getPool, initDB };
