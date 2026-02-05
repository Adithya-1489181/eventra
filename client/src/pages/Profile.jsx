import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiShield } from 'react-icons/fi';
import AppLayout from '../layouts/AppLayout';
import { Button, Input, Card, Alert, Spinner, Badge } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import apiClient from '../utils/apiClient';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/profile');
      const profileData = response.data.data;
      setProfile(profileData);
      setFormData({
        name: profileData.name || '',
        email: profileData.email || '',
      });
    } catch (err) {
      setAlert({ 
        type: 'error', 
        message: 'Failed to load profile' 
      });
      console.error('Profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      await apiClient.patch('/api/profile', formData);
      setAlert({ 
        type: 'success', 
        message: 'Profile updated successfully' 
      });
      fetchProfile();
    } catch (err) {
      setAlert({ 
        type: 'error', 
        message: 'Failed to update profile' 
      });
    } finally {
      setSaving(false);
    }
  };

  const getRoleBadge = (role) => {
    const variants = {
      admin: 'danger',
      organiser: 'primary',
      user: 'default',
    };
    return variants[role] || 'default';
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-lg text-gray-600">
            Manage your account information
          </p>
        </div>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
            className="mb-6"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-indigo-100 rounded-full mb-4">
                <FiUser className="text-indigo-600" size={48} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {profile?.name}
              </h2>
              <Badge variant={getRoleBadge(profile?.role)}>
                {profile?.role?.charAt(0).toUpperCase() + profile?.role?.slice(1)}
              </Badge>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <FiMail className="mr-2" />
                  {profile?.email}
                </div>
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Personal Information
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                fullWidth
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                fullWidth
                disabled
                helperText="Email cannot be changed"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Type
                </label>
                <div className="flex items-center space-x-2">
                  <FiShield className="text-gray-400" />
                  <span className="text-gray-900">
                    {profile?.role === 'organiser' ? 'Event Organizer' : 
                     profile?.role === 'admin' ? 'Administrator' : 'Attendee'}
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFormData({
                    name: profile?.name || '',
                    email: profile?.email || '',
                  })}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
