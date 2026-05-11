import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-blue-600 p-4 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-tight">Student Portal</Link>
                <div className="flex gap-6 items-center font-medium">
                    {user ? (
                        <>
                            <Link to="/" className="hover:text-blue-200 transition">My Profile</Link>
                            <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-md shadow transition">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-blue-200 transition">Login</Link>
                            <Link to="/register" className="bg-white text-blue-600 px-4 py-1.5 rounded-md shadow hover:bg-blue-50 transition">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
