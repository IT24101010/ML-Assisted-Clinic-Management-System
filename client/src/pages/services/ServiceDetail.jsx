import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorAlert from '../../components/common/ErrorAlert';
import { FiArrowLeft, FiClock, FiDollarSign, FiInfo } from 'react-icons/fi';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const { data } = await api.get(`/services/${id}`);
        setService(data);
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to fetch service details.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetail();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Link to="/services" className="inline-flex items-center text-primary hover:text-primary-dark mb-6 transition-colors">
          <FiArrowLeft className="mr-2" /> Back to Catalog
        </Link>
        <ErrorAlert message={error} />
      </div>
    );
  }

  if (!service) return null;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Link to="/services" className="inline-flex items-center text-primary hover:text-primary-dark mb-8 transition-colors font-medium">
        <FiArrowLeft className="mr-2" /> Back to Services Catalog
      </Link>

      <div className="bg-surface rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Area */}
        <div className="bg-primary/5 p-8 sm:p-12 border-b border-primary/10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-bold text-primary tracking-wide uppercase shadow-sm mb-4 border border-primary/10">
                {service.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-textPrimary tracking-tight">
                {service.serviceName}
              </h1>
            </div>
            <div className="shrink-0 bg-white p-4 rounded-xl shadow-sm border border-primary/5">
              <p className="text-sm font-semibold text-textSecondary uppercase tracking-wider mb-1">Pricing</p>
              <div className="flex items-baseline text-primary">
                <span className="text-2xl font-bold">$</span>
                <span className="text-4xl font-extrabold tracking-tight">{service.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Main Description Column */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold flex items-center text-textPrimary mb-4">
                  <FiInfo className="mr-2 text-primary" /> Service Description
                </h2>
                <div className="prose prose-blue text-textSecondary leading-relaxed">
                  {service.description ? (
                    <p>{service.description}</p>
                  ) : (
                    <p className="italic text-gray-400">No detailed description has been provided for this service.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Details Column */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-sm font-bold text-textPrimary uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                  Key Details
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-start">
                    <FiClock className="mt-1 mr-3 text-secondary shrink-0 text-lg" />
                    <div>
                      <p className="text-sm font-medium text-textPrimary">Duration</p>
                      <p className="text-sm text-textSecondary">
                        {service.duration ? `${service.duration} Minutes` : 'Variable / By Consultation'}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FiDollarSign className="mt-1 mr-3 text-secondary shrink-0 text-lg" />
                    <div>
                      <p className="text-sm font-medium text-textPrimary">Standard Fee</p>
                      <p className="text-sm text-textSecondary">${service.price.toFixed(2)}</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Booking Action */}
              <div className="pt-4">
                <Link
                  to={`/appointments/new?serviceId=${service._id}`}
                  className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Book Appointment Now
                </Link>
                <p className="text-xs text-center text-textSecondary mt-3">
                  Secure your slot online instantly.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;