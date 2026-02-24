import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaHeartbeat } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      const msg = error.response?.data?.message || 'Invalid email or password';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-surface shadow-xl rounded-2xl p-8 max-w-md w-full border-t-4 border-primary">
        <div className="flex flex-col items-center mb-8">
          <FaHeartbeat className="text-4xl text-primary mb-2" />
          <h1 className="text-2xl font-bold text-textPrimary">Welcome Back</h1>
          <p className="text-textSecondary">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="john@example.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="••••••••" />
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg mt-6 transition-colors flex items-center justify-center">
            {isSubmitting ? <FiLoader className="animate-spin text-xl" /> : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-textSecondary mt-6">
          Don't have an account? <Link to="/register" className="text-primary font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;