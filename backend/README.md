# ⚙️ Student Portal - Backend (Node.js + Express)

This is the backend API for the Lecture Assignment System.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in this directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lecture_db
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Run Tests
```bash
npm test
```

## 🧪 Testing Architecture
- **Jest**: Unit and integration testing.
- **Supertest**: API endpoint testing.
- **MongoDB Memory Server**: Isolated database testing.

## 📁 Key Directories
- `controllers/`: Logic handlers.
- `models/`: Mongoose schemas.
- `routes/`: API route definitions.
- `middleware/`: Authentication and validation.

---
For full project documentation, please refer to the [Root README](../README.md).
