import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { FaHeartbeat } from 'react-icons/fa';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-primary-dark text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                            <FaHeartbeat className="text-2xl text-accent" />
                            <span>RASUL Medical Center</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="hover:text-primary-light transition-colors">Login</Link>
                                <Link to="/register" className="bg-primary hover:bg-primary-light px-4 py-2 rounded-md transition-colors">Register</Link>
                            </>
                        ) : (
                            <>
                                {user?.role === 'admin' ? (
                                    <Link to="/admin" className="hover:text-primary-light transition-colors">Admin Panel</Link>
                                ) : (
                                    <>
                                        <Link to="/dashboard" className="hover:text-primary-light transition-colors">Dashboard</Link>
                                        <Link to="/appointments" className="hover:text-primary-light transition-colors">Appointments</Link>
                                        <Link to="/doctors" className="hover:text-primary-light transition-colors">Doctors</Link>
                                        <Link to="/services" className="hover:text-primary-light transition-colors">Services</Link>
                                        <Link to="/announcements" className="hover:text-primary-light transition-colors">Announcements</Link>
                                    </>
                                )}

                                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-primary">
                                    <span className="flex items-center gap-2">
                                        <FiUser /> {user?.name}
                                    </span>
                                    <button onClick={handleLogout} className="flex items-center gap-1 text-accent hover:text-red-400 transition-colors">
                                        <FiLogOut /> Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
                            {isOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary">
                    <Link to="/" className="block px-3 py-2 hover:bg-primary-dark rounded-md">Home</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
