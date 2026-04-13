

Full-stack real estate website: React.js (frontend) + Node.js/Express (backend) + MySQL (database).



##  Admin Credentials (Fixed)

 Field   Value           

 Email     admin@gmail.com 
 Password  1234              

Admin panel URL: `/admin/login`



##  MySQL Table Schema

The backend auto-creates the table on first run — no manual SQL needed.

```sql
CREATE TABLE IF NOT EXISTS content (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  section     VARCHAR(100) NOT NULL UNIQUE,
  data        LONGTEXT NOT NULL,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);




🚀 Project Structure

```
realestate/
├── frontend/                     # React.js app
│   ├── src/
│   │   ├── context/ContentContext.js
│   │   ├── pages/Home.js
│   │   ├── pages/AdminLogin.js
│   │   ├── pages/AdminPanel.js
│   │   └── App.js / App.css
│   └── public/index.html
│
└── backend/                      # Node.js + Express + MySQL
    ├── db.js                     ← MySQL pool + auto-init
    ├── routes/auth.js
    ├── routes/content.js
    └── server.js




##  Setup Instructions

### Prerequisites
- Node.js 
- MySQL  

### 1. Create MySQL Database

sql
CREATE DATABASE realestate;

(The table and default data are created automatically when you start the server.)

 2. Backend

```bash
cd backend
npm install

```

Create .env file

Inside backend folder, create .env :

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=realestate
FRONTEND_URL=http://localhost:3000
PORT=5000


bash
npm run dev      # development
npm start        # production


 3. Frontend

bash
cd frontend
npm install
cp .env.example .env
# Set: REACT_APP_API_URL=http://localhost:5000
npm start




##  Hosting

### Frontend → Vercel / Netlify
- Build command: `npm run build`
- Publish dir: `build`
- Env var: `REACT_APP_API_URL=https://your-backend.render.com`

 Backend → Render / Railway
- Root directory: `backend`
- Build: `npm install`
- Start: `node server.js`
- Add all `.env` variables in the platform dashboard

 MySQL → PlanetScale / Railway / Render MySQL
- Get the host, port, user, password, dbname
- Set them as environment variables on your hosting platform

---

##  Features

- All 10+ website sections (Hero, About, Amenities, Floor Plans, Connectivity, Video CTA, Buildings, Developer, Construction, FAQ)
- Admin Panel with live editors for every section
- MySQL backend with auto table creation + seed data
- Content falls back gracefully if backend is unreachable

---

##  Tech Stack

| Layer      | Tech                         |
|------------|------------------------------|
| Frontend   | React.js 
| Backend    | Node.js, Express.js          |
| Database   | MySQL     |
| Hosting FE | Vercel / Netlify             |
| Hosting BE | Render / Railway             |

