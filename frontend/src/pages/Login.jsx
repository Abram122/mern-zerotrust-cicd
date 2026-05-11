import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '', unlockToken: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [requireUnlock, setRequireUnlock] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const { email, password, unlockToken } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password, unlockToken);
            navigate('/');
        } catch (err) {
            const data = err.response?.data;
            if (data?.isBlocked) {
                navigate('/blocked');
                return;
            }
            const msg = data?.msg || 'Login failed';
            setError(msg);
            if (data?.requireUnlockToken) {
                setRequireUnlock(true);
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Student Login</h2>
                {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-6 text-sm">{error}</div>}
                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 mb-1.5 font-medium text-sm">Email Address</label>
                        <input type="email" name="email" value={email} onChange={onChange} required
                            pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                            title="Please enter a valid email address (e.g. user@gmail.com)"
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1.5 font-medium text-sm">Password</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={onChange} required
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    {requireUnlock && (
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <label className="block text-blue-800 mb-1.5 font-bold text-sm">Unlock Code (Sent to Email)</label>
                            <input type="text" name="unlockToken" value={unlockToken} onChange={onChange} required
                                className="w-full p-2.5 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm" 
                                placeholder="Enter 6-digit code" />
                        </div>
                    )}
                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 shadow-md transition transform active:scale-[0.98]">
                        {requireUnlock ? 'Unlock Account & Login' : 'Sign In'}
                    </button>
                </form>
                <div className="mt-6 text-center border-t pt-4">
                    <p className="text-gray-600 text-sm">
                        Don't have an account? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Register now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
