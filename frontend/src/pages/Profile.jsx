import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [uploading, setUploading] = useState(false);
    
    useEffect(() => {
        if (user) {
            setFormData({ fullName: user.fullName || '', email: user.email || '', password: '' });
        }
    }, [user]);

    const { fullName, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onFileChange = e => setImage(e.target.files[0]);

    const onUpdateProfile = async e => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        try {
            const res = await axios.put('http://localhost:5000/api/user/profile', { fullName, email, password });
            setUser(res.data);
            setMessage({ type: 'success', text: 'Profile updated successfully' });
            setFormData({ ...formData, password: '' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.msg || 'Error updating profile' });
        }
    };

    const onUploadImage = async e => {
        e.preventDefault();
        if (!image) return setMessage({ type: 'error', text: 'Please select an image' });
        
        if (image.type !== 'image/jpeg' && image.type !== 'image/jpg') {
            return setMessage({ type: 'error', text: 'Only JPG format is allowed' });
        }

        const data = new FormData();
        data.append('profileImage', image);

        setUploading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/user/profile/image', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setUser(res.data);
            setMessage({ type: 'success', text: 'Image uploaded successfully' });
            setImage(null);
            // reset file input
            document.getElementById('file-input').value = "";
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.msg || 'Error uploading image' });
        } finally {
            setUploading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-extrabold mb-8 text-gray-800 border-b pb-4">My Dashboard</h2>
            
            {message.text && (
                <div className={`p-4 mb-6 rounded-lg font-medium shadow-sm border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {message.text}
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
                {/* Image Section */}
                <div className="bg-white p-6 rounded-xl shadow-md col-span-1 border border-gray-100 flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-6 self-start">Profile Picture</h3>
                    <div className="w-48 h-48 rounded-full bg-gray-100 overflow-hidden mb-6 border-4 border-blue-100 shadow-inner flex items-center justify-center">
                        {user.profileImage ? (
                            <img src={`http://localhost:5000${user.profileImage}`} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <svg className="w-20 h-20 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        )}
                    </div>
                    <form onSubmit={onUploadImage} className="w-full flex flex-col items-center gap-3">
                        <label className="block w-full">
                            <span className="sr-only">Choose profile photo</span>
                            <input type="file" id="file-input" accept=".jpg,.jpeg" onChange={onFileChange} className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2.5 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100 transition cursor-pointer" />
                        </label>
                        <button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition disabled:opacity-50">
                            {uploading ? 'Uploading...' : 'Upload JPG Image'}
                        </button>
                    </form>
                    <p className="text-xs text-gray-400 mt-4 text-center bg-gray-50 p-2 rounded-md w-full border border-gray-100">
                        Strict rule: Only .jpg format allowed. Max 5MB.
                    </p>
                </div>

                {/* Info Section */}
                <div className="bg-white p-8 rounded-xl shadow-md col-span-2 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">Personal Details</h3>
                    <form onSubmit={onUpdateProfile} className="space-y-5">
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-gray-700 mb-1.5 text-sm font-medium">Full Name</label>
                                <input type="text" name="fullName" value={fullName} onChange={onChange} required
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1.5 text-sm font-medium">Email Address</label>
                                <input type="email" name="email" value={email} onChange={onChange} required
                                    pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                                    title="Please enter a valid email address (e.g. user@gmail.com)"
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-gray-700 mb-1.5 text-sm font-medium flex justify-between">
                                    <span>Country</span>
                                    <span className="text-xs text-gray-400 font-normal">Cannot be changed</span>
                                </label>
                                <input type="text" value={user.country} disabled
                                    className="w-full p-2.5 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed" />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1.5 text-sm font-medium flex justify-between">
                                    <span>Address</span>
                                    <span className="text-xs text-gray-400 font-normal">Cannot be changed</span>
                                </label>
                                <input type="text" value={user.address} disabled
                                    className="w-full p-2.5 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed" />
                            </div>
                        </div>
                        <div className="pt-2">
                            <label className="block text-gray-700 mb-1.5 text-sm font-medium">Update Password <span className="text-gray-400 font-normal ml-1">(Leave blank to keep current)</span></label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={onChange} minLength="6"
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10" placeholder="Enter new password" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        <div className="pt-6 border-t mt-6 flex justify-end">
                            <button type="submit" className="bg-green-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-green-700 shadow-md transition transform active:scale-[0.98]">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
