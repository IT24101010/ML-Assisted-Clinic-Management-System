import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FiUser, FiCalendar, FiClock, FiUsers, FiActivity, FiMessageSquare, FiBell, FiSettings } from 'react-icons/fi';

const DashboardCard = ({ icon: Icon, title, description, link, colorClass }) => (
  <Link to={link} className="block group">
    <div className={`bg-surface rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-200 border-l-4 ${colorClass}`}>
      <div className="flex items-center gap-4 mb-3">
        <div className={`p-3 rounded-lg ${colorClass.replace('border-', 'bg-').replace('-500', '-100')} text-${colorClass.replace('border-', '')}`}>
          <Icon className="text-2xl" />
        </div>
        <h3 className="text-lg font-bold text-textPrimary group-hover:text-primary transition-colors">{title}</h3>
      </div>
      <p className="text-textSecondary text-sm">{description}</p>
    </div>
  </Link>
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin': return <span className="bg-danger/10 text-danger px-3 py-1 rounded-full text-sm font-semibold border border-danger/20">Administrator</span>;
      case 'doctor': return <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-semibold border border-secondary/20">Doctor</span>;
      default: return <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold border border-primary/20">Patient</span>;
    }
  };

  const patientCards = [
    { icon: FiUser, title: 'My Profile', description: 'View and update your personal and medical information.', link: '/profile', colorClass: 'border-blue-500' },
    { icon: FiCalendar, title: 'Book Appointment', description: 'Schedule a new visit with our specialists.', link: '/appointments/new', colorClass: 'border-green-500' },
    { icon: FiClock, title: 'My Appointments', description: 'Check your upcoming and past appointments.', link: '/appointments', colorClass: 'border-purple-500' },
    { icon: FiUsers, title: 'Browse Doctors', description: 'Find the right specialist for your needs.', link: '/doctors', colorClass: 'border-primary' },
    { icon: FiActivity, title: 'Browse Services', description: 'Explore medical services and treatments.', link: '/services', colorClass: 'border-secondary' },
    { icon: FiBell, title: 'Announcements', description: 'Stay updated with clinic news.', link: '/announcements', colorClass: 'border-accent' },
  ];

  const adminCards = [
    { icon: FiUsers, title: 'Manage Patients', description: 'View and manage all patient records.', link: '/admin/patients', colorClass: 'border-blue-500' },
    { icon: FiUser, title: 'Manage Doctors', description: 'Add, update or remove doctors.', link: '/admin/doctors', colorClass: 'border-green-500' },
    { icon: FiActivity, title: 'Manage Services', description: 'Update clinic services and pricing.', link: '/admin/services', colorClass: 'border-purple-500' },
    { icon: FiCalendar, title: 'Manage Appointments', description: 'Overview of all clinic schedules.', link: '/admin/appointments', colorClass: 'border-primary' },
    { icon: FiMessageSquare, title: 'Manage Feedback', description: 'Review patient feedback and reviews.', link: '/admin/feedback', colorClass: 'border-secondary' },
    { icon: FiBell, title: 'Manage Announcements', description: 'Broadcast news to all patients.', link: '/admin/announcements', colorClass: 'border-accent' },
  ];

  const cardsToRender = user?.role === 'admin' ? adminCards : patientCards;

  return (
    <div>
      <div className="bg-white rounded-2xl p-8 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-start md:items-center p-8 border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-textSecondary">Here's an overview of your clinic activities today.</p>
        </div>
        <div className="mt-4 md:mt-0">
          {getRoleBadge(user?.role)}
        </div>
      </div>

      <h2 className="text-xl font-bold text-textPrimary mb-6 flex items-center gap-2">
        <FiSettings className="text-primary" /> {user?.role === 'admin' ? 'Administration Details' : 'Quick Actions'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsToRender.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;