# Running & Setup Instructions

Follow these steps to get the Student Portal running on your local machine.

## 1. Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB Atlas Account** (or local MongoDB)

## 2. Environment Configuration
Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
```

> **Note for Nodemailer**: If using Gmail, you must generate an **App Password** from your Google Account settings (Security > 2-Step Verification > App Passwords).

## 3. Installation

Open two separate terminals:

### Terminal 1: Backend
```bash
cd backend
npm install
npm run dev
```

### Terminal 2: Frontend
```bash
cd frontend
npm install
npm run dev
```

## 4. Specific Test Procedure for Account Locking

This is the most critical part of the assignment. Follow these steps to verify the locking mechanism:

1. **Failure 1 & 2**: Try to login with any registered email and a wrong password. You will see "Invalid Credentials".
2. **Failure 3**: On the third wrong attempt, the backend generates a random 6-digit code.
   - **Check Console**: If you haven't set up the email yet, look at the **Backend Terminal**. It will print: `Email sent with token XXXXXX to user@email.com`.
   - **UI Change**: A new blue box will appear in the login form asking for the "Unlock Code".
3. **Failure 4 (The Block)**:
   - Enter a **Wrong Code** in the new box.
   - Click "Login".
   - You will be immediately redirected to the `/blocked` page.
4. **Permanent Block**: Once redirected, any further attempt to login with that email will result in an immediate "You are blocked" message or redirect.

## 5. Image Upload Rules
- Go to the Profile page.
- Try uploading a `.png` or `.gif`. It will be blocked by the frontend logic.
- Try bypassing the frontend by forcing a file upload; the backend `multer` middleware will catch it and return an error.
- **Only `.jpg` or `.jpeg`** will succeed.
