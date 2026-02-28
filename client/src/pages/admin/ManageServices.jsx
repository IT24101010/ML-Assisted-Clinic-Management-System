import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiCheckCircle, FiMinusCircle } from 'react-icons/fi';
import api from '../../utils/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorAlert from '../../components/common/ErrorAlert';
import SuccessAlert from '../../components/common/SuccessAlert';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    serviceName: '',
    category: '',
    description: '',
    price: '',
    duration: '',
    isActive: true
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/services/admin/all');
      setServices(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch services');
      setLoading(false);
    }
  };

  const handleToggleStatus = async (service) => {
    const action = service.isActive ? 'deactivate' : 'activate';
    if (!window.confirm(`Are you sure you want to ${action} this service?`)) return;

    try {
      if (service.isActive) {
        // Soft Delete (Deactivate)
        await api.delete(`/services/${service._id}`);
      } else {
        // Reactivate
        await api.put(`/services/${service._id}`, { isActive: true });
      }

      // Update UI locally
      setServices(services.map(s =>
        s._id === service._id ? { ...s, isActive: !service.isActive } : s
      ));

      showSuccess(`Service successfully ${action}d.`);
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${action} service`);
    }
  };

  const handleOpenModal = (service = null) => {
    setError(null);
    setSuccess(null);

    if (service) {
      setEditMode(true);
      setCurrentServiceId(service._id);
      setFormData({
        serviceName: service.serviceName,
        category: service.category,
        description: service.description || '',
        price: service.price !== undefined ? service.price : '',
        duration: service.duration !== undefined ? service.duration : '',
        isActive: service.isActive
      });
    } else {
      setEditMode(false);
      setCurrentServiceId(null);
      setFormData({
        serviceName: '',
        category: '',
        description: '',
        price: '',
        duration: '',
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (editMode) {
        const res = await api.put(`/services/${currentServiceId}`, formData);
        setServices(services.map(s => s._id === currentServiceId ? res.data : s));
        showSuccess('Service updated successfully!');
      } else {
        const res = await api.post('/services', formData);
        setServices([...services, res.data]);
        showSuccess('Service created successfully!');
      }
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save service');
    }
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 5000);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-textPrimary">Manage Services</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          <FiPlus /> Add Service
        </button>
      </div>

      {error && <ErrorAlert message={error} />}
      {success && <SuccessAlert message={success} />}

      <div className="overflow-x-auto bg-surface rounded-2xl shadow-sm border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="bg-gray-50 text-xs font-semibold text-textSecondary uppercase tracking-wider px-6 py-3 border-b border-gray-100">Service Name</th>
              <th className="bg-gray-50 text-xs font-semibold text-textSecondary uppercase tracking-wider px-6 py-3 border-b border-gray-100">Category</th>
              <th className="bg-gray-50 text-xs font-semibold text-textSecondary uppercase tracking-wider px-6 py-3 border-b border-gray-100">Price</th>
              <th className="bg-gray-50 text-xs font-semibold text-textSecondary uppercase tracking-wider px-6 py-3 border-b border-gray-100">Status</th>
              <th className="bg-gray-50 text-xs font-semibold text-textSecondary uppercase tracking-wider px-6 py-3 border-b border-gray-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-textSecondary">
                  No services found.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service._id} className={`hover:bg-primary-light/5 transition-colors border-b border-gray-50 last:border-0 ${!service.isActive ? 'opacity-60 bg-gray-50/50' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary font-medium">
                    {service.serviceName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary">
                    {service.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary">
                    ${parseFloat(service.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${service.isActive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                      {service.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleOpenModal(service)}
                      className="text-primary hover:text-primary-dark mr-4 transition-colors"
                    >
                      <FiEdit2 className="inline mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(service)}
                      className={`${service.isActive ? 'text-danger hover:text-red-700' : 'text-success hover:text-green-700'} transition-colors`}
                    >
                      {service.isActive ? (
                        <><FiMinusCircle className="inline mr-1" /> Deactivate</>
                      ) : (
                        <><FiCheckCircle className="inline mr-1" /> Activate</>
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-surface z-10">
              <h2 className="text-xl font-bold text-textPrimary">
                {editMode ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button type="button" onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <FiX className="text-2xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-1">Service Name*</label>
                  <input
                    type="text"
                    required
                    value={formData.serviceName}
                    onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="e.g. Complete Blood Count"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-1">Category*</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-colors"
                    list="category-suggestions"
                    placeholder="e.g. Laboratory"
                  />
                  <datalist id="category-suggestions">
                    <option value="Consultation" />
                    <option value="Laboratory" />
                    <option value="Radiology" />
                    <option value="Dental" />
                    <option value="General Checkup" />
                  </datalist>
                </div>

                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-1">Price ($)*</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="e.g. 50.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="e.g. 30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-textPrimary mb-1">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary outline-none transition-colors resize-y"
                  placeholder="Briefly describe the service..."
                ></textarea>
              </div>

              {editMode && (
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary cursor-pointer"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-textPrimary cursor-pointer">
                    Service is Active (Available for booking)
                  </label>
                </div>
              )}

              {/* Footer */}
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-surface">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-transparent border border-gray-300 text-textPrimary hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  {editMode ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;