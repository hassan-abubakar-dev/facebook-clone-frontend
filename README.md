# Social Media App (Backend + Frontend)

A full-stack social media application built for learning and practice purposes.  
This project demonstrates real-world backend and frontend development concepts such as authentication, email verification, database relationships, and deployment.

 **Disclaimer**:  
This is a personal learning project and is **not affiliated with Facebook or Meta**.


##  Features

### Authentication
- User registration
- Email verification (OTP / verification code)
- Login & logout
- JWT-based authentication (access & refresh tokens)
- Change password with email verification

### User & Profile
- User profile creation after verification
- Default avatar based on gender
- Secure password hashing

### Backend
- RESTful API
- PostgreSQL database
- Sequelize ORM
- Transactions for critical operations
- Email service integration
- Environment-based configuration
- CORS protection

### Frontend
- Modern UI
- Connects to deployed backend API
- Authentication flows (register, verify, login)

---

##  Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL (Neon)
- Sequelize ORM
- JWT
- Nodemailer
- bcrypt

### Frontend
- JavaScript
- (Your framework here — React / Vite / Next.js, etc.)

---

##  Environment Variables

### Backend `.env` example:

```env
PORT=3000
NODE_ENV=production

DB_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require

ACCESS_TOKEN_KEY=your_access_token_secret
ACCESS_TOKEN_EXPIRE=15m

REFRESH_TOKEN_KEY=your_refresh_token_secret
REFRESH_TOKEN_EXPIRE=7d

CHANGE_PASSWORD_TOKEN_KEY=your_change_password_secret
CHANGE_PASSWORD_TOKEN_EXPIRE=10m

APP_NAME=Your App Name

AVATER_MALE_PROFILE=https://your-default-avatar-url
AVATER_FEMALE_PROFILE=https://your-default-avatar-url
AVATER_NEUTRAL_PROFILE=https://your-default-avatar-url

```
### installation and run
npm install
npm run dev