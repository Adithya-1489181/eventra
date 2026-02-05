import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiUsers, FiImage } from 'react-icons/fi';
import AppLayout from '../layouts/AppLayout';
import { Button, Input, Textarea, Card, Alert, Select } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import apiClient from '../utils/apiClient';

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    location: '',
    venueType: 'venue',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    capacity: '',
    category: '',
    ticketPrice: '',
    bannerImage: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const categoryOptions = [
    { value: '', label: 'Select a category' },
    { value: 'conference', label: 'Conference' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'meetup', label: 'Meetup' },
    { value: 'networking', label: 'Networking' },
    { value: 'concert', label: 'Concert' },
    { value: 'sports', label: 'Sports' },
    { value: 'exhibition', label: 'Exhibition' },
    { value: 'other', label: 'Other' },
  ];

  const venueTypeOptions = [
    { value: 'venue', label: 'Offline (Physical Venue)' },
    { value: 'online', label: 'Online (Virtual Event)' },
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

    if (!formData.eventName.trim()) {
      newErrors.eventName = 'Event name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }

    if (formData.startDate && formData.endDate) {
      const start = new Date(`${formData.startDate}T${formData.startTime}`);
      const end = new Date(`${formData.endDate}T${formData.endTime}`);
      if (end <= start) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    if (formData.capacity && (isNaN(formData.capacity) || parseInt(formData.capacity) < 1)) {
      newErrors.capacity = 'Capacity must be a positive number';
    }

    if (formData.ticketPrice && (isNaN(formData.ticketPrice) || parseFloat(formData.ticketPrice) < 0)) {
      newErrors.ticketPrice = 'Ticket price must be a valid number';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
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
      const eventDetails = {
        event_name: formData.eventName,
        event_details: formData.description,
        location: formData.venueType === 'online' ? {
          type: 'online',
          venue: formData.location || 'Online Event'
        } : {
          type: 'venue',
          venue: formData.location
        },
        isOpen: true,
        event_type: formData.category,
        duration: {
          start_date: formData.startDate,
          end_date: formData.endDate,
          start_time: formData.startTime,
          end_time: formData.endTime
        },
        capacity: parseInt(formData.capacity) || 0,
        seats_left: parseInt(formData.capacity) || 0,
        organisers_id: user.uid,
        ticket_price: formData.ticketPrice ? parseFloat(formData.ticketPrice) : 0,
        banner_image: formData.bannerImage || null,
        createdBy: user.uid,
      };

      await apiClient.post('/api/createEvent', { eventdetails: eventDetails });

      setAlert({ type: 'success', message: 'Event created successfully!' });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.response?.data?.error || 'Failed to create event. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create New Event
          </h1>
          <p className="text-lg text-gray-600">
            Fill in the details to create your event
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

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FiCalendar className="absolute left-3 top-9 text-gray-400" />
              <Input
                label="Event Name"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                error={errors.eventName}
                placeholder="e.g., Tech Conference 2026"
                className="pl-10"
                fullWidth
              />
            </div>

            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
              placeholder="Describe your event..."
              rows={5}
              fullWidth
            />

            <div className="relative">
              <FiMapPin className="absolute left-3 top-9 text-gray-400" />
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                error={errors.location}
                placeholder="e.g., Convention Center, New York"
                className="pl-10"
                fullWidth
              />
            </div>

            <Select
              label="Event Type"
              name="venueType"
              options={venueTypeOptions}
              value={formData.venueType}
              onChange={handleChange}
              fullWidth
              helperText="Choose whether this is an in-person or virtual event"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Start Date"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                error={errors.startDate}
                fullWidth
              />

              <Input
                label="Start Time"
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                error={errors.startTime}
                fullWidth
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="End Date"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                error={errors.endDate}
                fullWidth
              />

              <Input
                label="End Time"
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                error={errors.endTime}
                fullWidth
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <FiUsers className="absolute left-3 top-9 text-gray-400" />
                <Input
                  label="Capacity"
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  error={errors.capacity}
                  placeholder="e.g., 100"
                  className="pl-10"
                  fullWidth
                />
              </div>

              <Input
                label="Ticket Price ($)"
                type="number"
                step="0.01"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleChange}
                error={errors.ticketPrice}
                placeholder="e.g., 25.00 (or 0 for free)"
                fullWidth
                helperText="Enter 0 for free events"
              />
            </div>

            <Select
              label="Category"
              name="category"
              options={categoryOptions}
              value={formData.category}
              onChange={handleChange}
              error={errors.category}
              fullWidth
            />

            <div className="relative">
              <FiImage className="absolute left-3 top-9 text-gray-400" />
              <Input
                label="Banner Image URL (Optional)"
                type="url"
                name="bannerImage"
                value={formData.bannerImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="pl-10"
                fullWidth
                helperText="Provide a URL to an image for your event banner"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate(-1)}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                fullWidth
              >
                {loading ? 'Creating Event...' : 'Create Event'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
};

export default CreateEvent;
