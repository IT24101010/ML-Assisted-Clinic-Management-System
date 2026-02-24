import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

import Layout from './components/common/Layout';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import PatientProfile from './pages/patients/PatientProfile';
import AppointmentList from './pages/appointments/AppointmentList';
import BookAppointment from './pages/appointments/BookAppointment';
import DoctorList from './pages/doctors/DoctorList';
import DoctorDetail from './pages/doctors/DoctorDetail';
import ServiceList from './pages/services/ServiceList';
import ServiceDetail from './pages/services/ServiceDetail';
import FeedbackList from './pages/feedback/FeedbackList';
import SubmitFeedback from './pages/feedback/SubmitFeedback';
import AnnouncementList from './pages/announcements/AnnouncementList';
import AnnouncementDetail from './pages/announcements/AnnouncementDetail';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManagePatients from './pages/admin/ManagePatients';
import ManageDoctors from './pages/admin/ManageDoctors';
import ManageServices from './pages/admin/ManageServices';
import ManageAppointments from './pages/admin/ManageAppointments';
import ManageFeedback from './pages/admin/ManageFeedback';
import ManageAnnouncements from './pages/admin/ManageAnnouncements';

const NotFound = () => (
    <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-danger mb-4">404</h1>
        <p className="text-xl text-textSecondary">Page Not Found</p>
    </div>
);

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Layout>
                    <Routes>
                        {/* Public */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/doctors" element={<DoctorList />} />
                        <Route path="/doctors/:id" element={<DoctorDetail />} />
                        <Route path="/services" element={<ServiceList />} />
                        <Route path="/services/:id" element={<ServiceDetail />} />
                        <Route path="/announcements" element={<AnnouncementList />} />
                        <Route path="/announcements/:id" element={<AnnouncementDetail />} />

                        {/* Protected */}
                        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/profile" element={<PrivateRoute><PatientProfile /></PrivateRoute>} />
                        <Route path="/appointments" element={<PrivateRoute><AppointmentList /></PrivateRoute>} />
                        <Route path="/appointments/new" element={<PrivateRoute><BookAppointment /></PrivateRoute>} />
                        <Route path="/feedback" element={<PrivateRoute><FeedbackList /></PrivateRoute>} />
                        <Route path="/feedback/new" element={<PrivateRoute><SubmitFeedback /></PrivateRoute>} />

                        {/* Admin */}
                        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                        <Route path="/admin/patients" element={<AdminRoute><ManagePatients /></AdminRoute>} />
                        <Route path="/admin/doctors" element={<AdminRoute><ManageDoctors /></AdminRoute>} />
                        <Route path="/admin/services" element={<AdminRoute><ManageServices /></AdminRoute>} />
                        <Route path="/admin/appointments" element={<AdminRoute><ManageAppointments /></AdminRoute>} />
                        <Route path="/admin/feedback" element={<AdminRoute><ManageFeedback /></AdminRoute>} />
                        <Route path="/admin/announcements" element={<AdminRoute><ManageAnnouncements /></AdminRoute>} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
                <Toaster position="top-right" />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
