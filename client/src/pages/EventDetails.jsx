import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiCalendar, 
  FiMapPin, 
  FiClock, 
  FiUsers, 
  FiArrowLeft,
  FiShare2,
  FiCopy,
  FiCheck
} from 'react-icons/fi';
import AppLayout from '../layouts/AppLayout';
import { Button, Card, Alert, Spinner, Badge, Modal } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import apiClient from '../utils/apiClient';
import { formatDate, formatTime, transformEventData } from '../utils/helpers';

const EventDetails = () => {
  const { eventId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchEventDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/api/events/${eventId}`);
      const rawEvent = response.data;
      
      // Transform backend fields to frontend format using shared utility
      const transformedEvent = transformEventData(rawEvent);
      
      setEvent(transformedEvent);
    } catch (err) {
      setAlert({ 
        type: 'error', 
        message: 'Failed to load event details. Please try again.' 
      });
      console.error('Error fetching event:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/events/${eventId}` } });
      return;
    }

    try {
      setRegistering(true);
      await apiClient.post(`/api/events/${eventId}/register`);
      setAlert({ 
        type: 'success', 
        message: 'Successfully registered for the event!' 
      });
    } catch (err) {
      setAlert({ 
        type: 'error', 
        message: err.response?.data?.message || 'Failed to register. Please try again.' 
      });
    } finally {
      setRegistering(false);
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
    setCopied(false);
  };

  const handleCopyLink = () => {
    const eventLink = `${window.location.origin}/events/${eventId}`;
    navigator.clipboard.writeText(eventLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      setAlert({ 
        type: 'error', 
        message: 'Failed to copy link' 
      });
    });
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

  if (!event) {
    return (
      <AppLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Alert type="error" message="Event not found" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Back
        </button>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
            className="mb-6"
          />
        )}

        <Card className="overflow-hidden">
          {event.bannerImage && (
            <div className="aspect-video w-full bg-gray-200">
              <img
                src={event.bannerImage}
                alt={event.eventName}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                {event.category && (
                  <Badge variant="primary" className="mb-3">
                    {event.category}
                  </Badge>
                )}
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {event.eventName}
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiCalendar className="mt-1 mr-3 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Date</div>
                    <div className="text-gray-600">{formatDate(event.startDate)}</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiClock className="mt-1 mr-3 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Time</div>
                    <div className="text-gray-600">
                      {formatTime(event.startDate)} - {formatTime(event.endDate)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {event.location && (
                  <div className="flex items-start">
                    <FiMapPin className="mt-1 mr-3 text-gray-400 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Location</div>
                      <div className="text-gray-600">
                        {typeof event.location === 'object' 
                          ? event.location.venue || `${event.location.type} Event`
                          : event.location}
                      </div>
                    </div>
                  </div>
                )}

                {event.capacity && (
                  <div className="flex items-start">
                    <FiUsers className="mt-1 mr-3 text-gray-400 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Capacity</div>
                      <div className="text-gray-600">{event.capacity} attendees</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {event.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  About This Event
                </h2>
                <p className="text-gray-700 whitespace-pre-wrap">{event.description}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleRegister}
                disabled={registering}
                className="flex-1 sm:flex-none"
              >
                {registering ? 'Registering...' : 'Register for Event'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleShare}
                className="flex-1 sm:flex-none inline-flex items-center justify-center"
              >
                <FiShare2 className="mr-1.5" size={18} />
                Share Event
              </Button>
            </div>
          </div>
        </Card>

        <Modal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          title="Share Event"
          size="sm"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Copy the link below to share this event with others
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}/events/${eventId}`}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
              />
              <Button
                variant={copied ? "secondary" : "primary"}
                size="md"
                onClick={handleCopyLink}
                className="inline-flex items-center whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <FiCheck className="mr-1.5" size={18} />
                    Copied
                  </>
                ) : (
                  <>
                    <FiCopy className="mr-1.5" size={18} />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </AppLayout>
  );
};

export default EventDetails;
