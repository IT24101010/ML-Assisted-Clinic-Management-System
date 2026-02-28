import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorAlert from '../../components/common/ErrorAlert';
import { FiCheckCircle, FiClock, FiDollarSign } from 'react-icons/fi';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Derive categories from data
  const categories = ['All', ...new Set(services.map(s => s.category))];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data } = await api.get('/services');
      setServices(data);
      setFilteredServices(data);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Wait a moment while we retrieve the catalog.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(s => s.category === selectedCategory));
    }
  }, [selectedCategory, services]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-textPrimary sm:text-4xl">
          Our Services Catalog
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-textSecondary mx-auto">
          Comprehensive medical care tailored to your needs.
        </p>
      </div>

      {error ? (
        <ErrorAlert message={error} />
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-textSecondary hover:bg-gray-50 border border-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-12 text-textSecondary">
              No services found matching this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <div
                  key={service._id}
                  className="bg-surface rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full"
                >
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-textPrimary mb-2">
                      {service.serviceName}
                    </h3>

                    <p className="text-textSecondary text-sm line-clamp-3 mb-4">
                      {service.description || 'No description provided.'}
                    </p>

                    <div className="space-y-2 mt-auto">
                      <div className="flex items-center text-textSecondary text-sm">
                        <FiDollarSign className="mr-2 text-primary" />
                        <span className="font-semibold text-textPrimary">${service.price.toFixed(2)}</span>
                      </div>

                      {service.duration && (
                        <div className="flex items-center text-textSecondary text-sm">
                          <FiClock className="mr-2 text-primary" />
                          <span>{service.duration} mins</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-50 bg-gray-50/50 mt-auto">
                    <Link
                      to={`/services/${service._id}`}
                      className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ServiceList;