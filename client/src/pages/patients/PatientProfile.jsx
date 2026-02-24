import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { FiEdit2, FiSave, FiX, FiPlus, FiTrash2, FiUser, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const PatientProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [newAllergy, setNewAllergy] = useState('');

  const fetchProfile = async () => {
    try {
      const res = await api.get('/users/profile');
      setProfile(res.data);
      setEditForm(res.data);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditForm(profile); // Reset form to current profile when entering edit mode
    }
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEmergencyChange = (e) => {
    setEditForm({
      ...editForm,
      emergencyContact: {
        ...editForm.emergencyContact,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleAddMedicalHistory = () => {
    setEditForm({
      ...editForm,
      medicalHistory: [
        ...editForm.medicalHistory,
        { condition: '', diagnosedDate: '', notes: '' }
      ]
    });
  };

  const handleUpdateMedicalHistory = (index, field, value) => {
    const newHistory = [...editForm.medicalHistory];
    newHistory[index][field] = value;
    setEditForm({ ...editForm, medicalHistory: newHistory });
  };

  const handleRemoveMedicalHistory = (index) => {
    const newHistory = editForm.medicalHistory.filter((_, i) => i !== index);
    setEditForm({ ...editForm, medicalHistory: newHistory });
  };

  const handleAddAllergy = (e) => {
    if (e.key === 'Enter' && newAllergy.trim() !== '') {
      e.preventDefault();
      if (!editForm.allergies.includes(newAllergy.trim())) {
        setEditForm({
          ...editForm,
          allergies: [...editForm.allergies, newAllergy.trim()]
        });
      }
      setNewAllergy('');
    }
  };

  const handleRemoveAllergy = (allergyToRemove) => {
    setEditForm({
      ...editForm,
      allergies: editForm.allergies.filter(a => a !== allergyToRemove)
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await api.put('/users/profile', editForm);
      setProfile(res.data);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) return <LoadingSpinner />;
  if (!profile) return <div className="text-center py-10">Profile not found.</div>;

  const formatDate = (dateString) => {
    if (!dateString) return 'Not Provided';
    return new Date(dateString).toLocaleDateString();
  };

  const formDataString = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-textPrimary">Patient Profile</h1>
        {!isEditing ? (
          <button onClick={handleEditToggle} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors shadow-sm">
            <FiEdit2 /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button onClick={handleEditToggle} className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              <FiX /> Cancel
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors shadow-sm">
              <FiSave /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left Column: Basic Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
            <div className="flex justify-center mb-6 mt-2">
              <div className="h-24 w-24 bg-primary-light/20 rounded-full flex items-center justify-center text-primary border-4 border-white shadow-md">
                <FiUser className="text-4xl" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">Full Name</p>
                {isEditing ? (
                  <input type="text" name="name" value={editForm.name} onChange={handleChange} className="w-full border p-2 rounded focus:ring-1 focus:ring-primary outline-none" />
                ) : (
                  <p className="font-medium text-textPrimary">{profile.name}</p>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">Email</p>
                <input type="email" value={profile.email} disabled className="w-full border p-2 rounded bg-gray-50 text-gray-500 cursor-not-allowed" title="Email cannot be changed" />
              </div>

              <div>
                <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">Phone</p>
                {isEditing ? (
                  <div className="flex items-center border rounded overflow-hidden focus-within:ring-1 focus-within:ring-primary">
                    <span className="px-3 text-gray-400 bg-gray-50 border-r"><FiPhone /></span>
                    <input type="text" name="phone" value={editForm.phone || ''} onChange={handleChange} className="w-full p-2 outline-none" />
                  </div>
                ) : (
                  <p className="font-medium text-textPrimary flex items-center gap-2"><FiPhone className="text-primary" /> {profile.phone || 'Not Provided'}</p>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">Date of Birth</p>
                {isEditing ? (
                  <input type="date" name="dateOfBirth" value={formDataString(editForm.dateOfBirth)} onChange={handleChange} className="w-full border p-2 rounded focus:ring-1 focus:ring-primary outline-none" />
                ) : (
                  <p className="font-medium text-textPrimary flex items-center gap-2"><FiCalendar className="text-primary" /> {formatDate(profile.dateOfBirth)}</p>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">Gender</p>
                {isEditing ? (
                  <select name="gender" value={editForm.gender || ''} onChange={handleChange} className="w-full border p-2 rounded focus:ring-1 focus:ring-primary outline-none bg-white">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="font-medium text-textPrimary capitalize">{profile.gender || 'Not Provided'}</p>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">Address</p>
                {isEditing ? (
                  <textarea name="address" value={editForm.address || ''} onChange={handleChange} rows="2" className="w-full border p-2 rounded focus:ring-1 focus:ring-primary outline-none resize-none" />
                ) : (
                  <p className="font-medium text-textPrimary flex items-start gap-2"><FiMapPin className="text-primary mt-1 shrink-0" /> {profile.address || 'Not Provided'}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Medical Info */}
        <div className="md:col-span-2 space-y-6">

          {/* Emergency Contact */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-textPrimary mb-4 border-b pb-2">Emergency Contact</h3>
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-textSecondary mb-1">Name</label>
                  <input type="text" name="name" value={editForm.emergencyContact?.name || ''} onChange={handleEmergencyChange} placeholder="Contact Name" className="w-full border p-2 rounded focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-xs text-textSecondary mb-1">Phone</label>
                  <input type="text" name="phone" value={editForm.emergencyContact?.phone || ''} onChange={handleEmergencyChange} placeholder="Contact phone" className="w-full border p-2 rounded focus:ring-primary" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
                <div>
                  <p className="text-xs text-textSecondary uppercase mb-1">Name</p>
                  <p className="font-medium">{profile.emergencyContact?.name || '---'}</p>
                </div>
                <div>
                  <p className="text-xs text-textSecondary uppercase mb-1">Phone</p>
                  <p className="font-medium">{profile.emergencyContact?.phone || '---'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Allergies */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-textPrimary mb-4 border-b pb-2">Allergies</h3>
            {isEditing ? (
              <div>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    onKeyDown={handleAddAllergy}
                    placeholder="Type allergy and press Enter"
                    className="flex-grow border p-2 rounded focus:ring-primary outline-none"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {editForm.allergies?.map((allergy, idx) => (
                    <span key={idx} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      {allergy}
                      <button type="button" onClick={() => handleRemoveAllergy(allergy)} className="text-orange-500 hover:text-orange-800">
                        <FiX />
                      </button>
                    </span>
                  ))}
                  {(!editForm.allergies || editForm.allergies.length === 0) && <p className="text-sm text-gray-400">No allergies listed.</p>}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.allergies?.length > 0 ? (
                  profile.allergies.map((allergy, idx) => (
                    <span key={idx} className="bg-orange-100 text-orange-800 border border-orange-200 px-3 py-1 rounded-full text-sm font-medium">
                      {allergy}
                    </span>
                  ))
                ) : (
                  <p className="text-textSecondary italic">No known allergies reported.</p>
                )}
              </div>
            )}
          </div>

          {/* Medical History */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-lg font-bold text-textPrimary">Medical History</h3>
              {isEditing && (
                <button onClick={handleAddMedicalHistory} className="text-sm text-primary flex items-center gap-1 hover:text-primary-dark hover:bg-primary-light/10 px-2 py-1 rounded">
                  <FiPlus /> Add Record
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                {editForm.medicalHistory?.map((record, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50 relative">
                    <button onClick={() => handleRemoveMedicalHistory(idx)} className="absolute top-4 right-4 text-red-400 hover:text-red-600">
                      <FiTrash2 />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3 pr-8">
                      <div>
                        <label className="block text-xs text-textSecondary mb-1">Condition</label>
                        <input type="text" value={record.condition || ''} onChange={(e) => handleUpdateMedicalHistory(idx, 'condition', e.target.value)} className="w-full border p-2 rounded text-sm focus:ring-primary outline-none" placeholder="e.g. Hypertension" />
                      </div>
                      <div>
                        <label className="block text-xs text-textSecondary mb-1">Diagnosed Date</label>
                        <input type="date" value={formDataString(record.diagnosedDate)} onChange={(e) => handleUpdateMedicalHistory(idx, 'diagnosedDate', e.target.value)} className="w-full border p-2 rounded text-sm focus:ring-primary outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-textSecondary mb-1">Notes</label>
                      <textarea value={record.notes || ''} onChange={(e) => handleUpdateMedicalHistory(idx, 'notes', e.target.value)} className="w-full border p-2 rounded text-sm focus:ring-primary outline-none resize-none h-16" placeholder="Additional details..." />
                    </div>
                  </div>
                ))}
                {(!editForm.medicalHistory || editForm.medicalHistory.length === 0) && (
                  <p className="text-sm text-gray-500 text-center py-4">No medical history records.</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {profile.medicalHistory?.length > 0 ? (
                  profile.medicalHistory.map((record, idx) => (
                    <div key={idx} className="border-l-4 border-primary bg-primary/5 rounded-r-lg p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-textPrimary">{record.condition}</h4>
                        <span className="text-xs text-textSecondary bg-white px-2 py-1 rounded border shadow-sm">
                          {formatDate(record.diagnosedDate)}
                        </span>
                      </div>
                      {record.notes && <p className="text-sm text-textSecondary mt-2">{record.notes}</p>}
                    </div>
                  ))
                ) : (
                  <p className="text-textSecondary italic text-center py-4 bg-gray-50 rounded-lg border border-dashed">No medical history on file.</p>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientProfile;