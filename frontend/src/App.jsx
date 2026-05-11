import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Blocked from './pages/Blocked';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#f8fafc] font-sans">
          <Navbar />
          <main className="flex-grow w-full">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/blocked" element={<Blocked />} />
              <Route path="/" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
          </main>
          <footer className="bg-white border-t border-gray-200 p-4 text-center text-gray-500 text-sm mt-auto">
            Student Portal Assignment &copy; {new Date().getFullYear()}
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
