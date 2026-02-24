import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaHeartbeat } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone || !formData.dateOfBirth) {
      toast.error('All fields are required');
      return false;
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await register({ ...formData, role: 'patient' });
      // For testing, if we want an admin, we will have to make a separate admin registration or manual DB update.
      // But the spec says we can register a test admin. I'll just keep it hardcoded to patient for normal registration.
      // Alternatively, the spec "Register a test admin" could be handled by a slight tweak or direct API call.
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      const msg = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Registration failed';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="bg-surface shadow-xl rounded-2xl p-8 max-w-lg w-full border-t-4 border-primary">
        <div className="flex flex-col items-center mb-8">
          <FaHeartbeat className="text-4xl text-primary mb-2" />
          <h1 className="text-2xl font-bold text-textPrimary">Create an Account</h1>
          <p className="text-textSecondary">Join RASUL Medical Center</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="John Doe" />
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="john@example.com" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1">Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="••••••••" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1">Phone Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="+94 77 123 4567" />
            </div>
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary outline-none bg-white transition-colors">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">Date of Birth</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary outline-none transition-colors" />
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg mt-6 transition-colors flex items-center justify-center">
            {isSubmitting ? <FiLoader className="animate-spin text-xl" /> : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm text-textSecondary mt-6">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;