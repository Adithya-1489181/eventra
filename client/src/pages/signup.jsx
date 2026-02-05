import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import AuthLayout from '../layouts/AuthLayout';
import { Button, Input, Alert, Card, Select } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import apiClient from '../utils/apiClient';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const roleOptions = [
    { value: 'user', label: 'Attendee' },
    { value: 'organiser', label: 'Event Organizer' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      const userCredential = await signup(formData.email, formData.password);
      
      await apiClient.post('/api/signup', {
        uid: userCredential.user.uid,
        email: formData.email,
        name: formData.name,
        role: formData.role,
      });

      setAlert({ type: 'success', message: 'Account created successfully!' });
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      setAlert({ 
        type: 'error', 
        message: error.response?.data?.error || error.message || 'Failed to create account. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">Join Eventra today</p>
        </div>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
            className="mb-4"
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FiUser className="absolute left-3 top-9 text-gray-400" />
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="John Doe"
              className="pl-10"
              fullWidth
            />
          </div>

          <div className="relative">
            <FiMail className="absolute left-3 top-9 text-gray-400" />
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              className="pl-10"
              fullWidth
            />
          </div>

          <Select
            label="I want to"
            name="role"
            options={roleOptions}
            value={formData.role}
            onChange={handleChange}
            fullWidth
          />

          <div className="relative">
            <FiLock className="absolute left-3 top-9 text-gray-400" />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              className="pl-10"
              fullWidth
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-9 text-gray-400" />
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="••••••••"
              className="pl-10"
              fullWidth
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </AuthLayout>
  );
};

export default Signup;
