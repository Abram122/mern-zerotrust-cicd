# Student Portal Web Application

A full-stack (MERN) web application built for a university assignment. The application handles student registration, secure authentication with account locking, and profile management including image uploads.

## 🚀 Features

- **User Registration**: Comprehensive form with validation (Full Name, Address, Country, Email, Password).
- **Secure Login**:
  - JWT-based authentication.
  - **Account Locking**: 3 failed attempts trigger an email with a 6-digit unlock code.
  - **Security Redirect**: A 4th failed attempt redirects the user to a dedicated "Blocked" page.
  - **Password Visibility**: Eye icons to toggle password masking.
- **Profile Management**:
  - Update personal information.
  - **Strict Image Upload**: Only `.jpg` files are allowed (validated on both client and server).
  - Profile picture display.
- **Single Page Application (SPA)**: Powered by React and React Router for instant transitions.
- **External Navigation**: Direct links to Elsewedy University and Google in the Navbar.

## 🛠 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS v4, Lucide Icons.
- **Backend**: Node.js, Express, MongoDB (Mongoose).
- **Security**: JWT (JSON Web Tokens), Bcrypt.js (Password Hashing).
- **Utilities**: Nodemailer (Security Alerts), Multer (Image Uploads), Express Validator (Backend Rules).

## 📂 Project Structure

```
├── backend/
│   ├── controllers/      # Business logic (MVC Pattern)
│   ├── models/           # Mongoose schemas (User)
│   ├── routes/           # API Endpoints (Auth, User)
│   ├── middleware/       # JWT Auth & Upload guards
│   ├── uploads/          # Profile image storage
│   └── server.js         # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI (Navbar, ProtectedRoute)
│   │   ├── context/      # Auth state management
│   │   ├── pages/        # Main views (Login, Register, Profile, Blocked)
│   │   └── App.jsx       # Routing
└── .env                  # Configuration (Secrets)
```

## 🧪 Testing

Detailed test cases and results can be found in:
- [Test_Report.md](./Test_Report.md)
- [Test_Cases.md](./Test_Cases.md)

## 📖 Setup & Running

For detailed instructions on how to set up the environment and run the project, see:
- [Running_Instructions.md](./Running_Instructions.md)
