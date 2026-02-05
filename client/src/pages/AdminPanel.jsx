import React, { useState, useEffect } from 'react';
import { FiUsers, FiShield, FiUserPlus } from 'react-icons/fi';
import AppLayout from '../layouts/AppLayout';
import { Card, Spinner, Alert, Badge, Select } from '../components/ui';
import apiClient from '../utils/apiClient';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [updatingUser, setUpdatingUser] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/admin/allUsers');
      setUsers(response.data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load users');
      console.error('Admin panel error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdatingUser(userId);
      await apiClient.post('/api/admin/promoteUser', {
        uid: userId,
        role: newRole,
      });

      setAlert({
        type: 'success',
        message: 'User role updated successfully',
      });

      fetchAllUsers();
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Failed to update user role',
      });
    } finally {
      setUpdatingUser(null);
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

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'organiser', label: 'Organizer' },
    { value: 'admin', label: 'Admin' },
  ];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center">
            <FiShield className="text-red-600 mr-3" size={32} />
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Admin Panel
              </h1>
              <p className="text-lg text-gray-600">
                Manage users and their roles
              </p>
            </div>
          </div>
        </div>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
            className="mb-6"
          />
        )}

        {error && (
          <Alert type="error" message={error} className="mb-6" />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <FiUsers className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.length}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                <FiUserPlus className="text-indigo-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Organizers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u) => u.role === 'organiser').length}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg mr-4">
                <FiShield className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u) => u.role === 'admin').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change Role
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.uid}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getRoleBadge(user.role)}>
                        {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Select
                          options={roleOptions}
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.uid, e.target.value)}
                          disabled={updatingUser === user.uid}
                        />
                        {updatingUser === user.uid && (
                          <Spinner size="sm" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AdminPanel;
