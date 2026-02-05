import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiCreditCard, FiPlus } from 'react-icons/fi';
import AppLayout from '../layouts/AppLayout';
import { EventCard, TicketCard } from '../components/events';
import { Button, Card, Spinner, Alert } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import apiClient from '../utils/apiClient';
import { transformEventData } from '../utils/helpers';

const Dashboard = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [myEvents, setMyEvents] = useState([]);
  const [myTickets, setMyTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('events');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const [profileRes, ticketsRes] = await Promise.all([
        apiClient.get('/api/profile'),
        apiClient.get('/api/profile/tickets'),
      ]);

      setUserProfile(profileRes.data.data);
      
      // Transform ticket data from backend format
      const rawTickets = ticketsRes.data.data || [];
      const transformedTickets = rawTickets.map(ticket => ({
        ticketId: ticket._id || ticket.ticketId,
        eventId: ticket.event_id,
        eventName: ticket.event_name || ticket.eventName || 'Event',
        eventDate: ticket.registration_date || ticket.eventDate || new Date().toISOString(),
        location: ticket.location || ticket.eventLocation || 'TBD',
        qrCode: ticket.qr_code || ticket.qrCode || null,
      }));
      setMyTickets(transformedTickets);

      if (profileRes.data.data?.role === 'organiser' || profileRes.data.data?.role === 'admin') {
        const eventsRes = await apiClient.get('/api/events', {
          params: { createdBy: user.uid },
        });
        
        // Transform backend fields to frontend format
        const rawEvents = eventsRes.data.eventDetails || [];
        const transformedEvents = rawEvents.map(event => transformEventData(event));
        
        setMyEvents(transformedEvents);
      }

      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Set default active tab based on user role
    if (userProfile) {
      const isOrg = userProfile.role === 'organiser' || userProfile.role === 'admin';
      if (!isOrg && activeTab === 'events') {
        setActiveTab('tickets');
      }
    }
  }, [userProfile, activeTab]);

  const handleGenerateTicket = async (eventId) => {
    try {
      const response = await apiClient.post(`/api/events/${eventId}/generate-ticket`);
      setAlert({
        type: 'success',
        message: response.data.message || 'Ticket sent to mail, please check'
      });
      // Auto-dismiss after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.response?.data?.message || 'Failed to generate ticket'
      });
      // Auto-dismiss after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const isOrganizer = userProfile?.role === 'organiser' || userProfile?.role === 'admin';

  const tabs = [
    { id: 'events', label: 'My Events', icon: FiCalendar, show: isOrganizer },
    { id: 'tickets', label: 'My Tickets', icon: FiCreditCard, show: true },
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {userProfile?.name || 'User'}!
          </h1>
          <p className="text-lg text-gray-600">
            Manage your events and tickets
          </p>
        </div>

        {error && (
          <Alert type="error" message={error} className="mb-6" />
        )}

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
            className="mb-6"
          />
        )}

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.filter(tab => tab.show).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <tab.icon className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {activeTab === 'events' && isOrganizer && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Your Events
              </h2>
              <Link to="/create-event">
                <Button variant="primary" size="md" className="inline-flex items-center whitespace-nowrap">
                  <FiPlus className="mr-1.5" size={18} />
                  Create Event
                </Button>
              </Link>
            </div>

            {myEvents.length === 0 ? (
              <Card className="text-center py-12">
                <FiCalendar className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No events yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first event to get started
                </p>
                <Link to="/create-event">
                  <Button variant="primary" size="md" className="inline-flex items-center whitespace-nowrap">
                    <FiPlus className="mr-1.5" size={18} />
                    Create Event
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myEvents.map((event) => (
                  <EventCard
                    key={event.eventId}
                    event={event}
                    showActions={true}
                    onEdit={(id) => window.location.href = `/events/${id}/edit`}
                    onDelete={async (id) => {
                      if (window.confirm('Are you sure you want to delete this event?')) {
                        try {
                          await apiClient.delete(`/api/events/${id}`);
                          fetchDashboardData();
                        } catch (err) {
                          alert('Failed to delete event');
                        }
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'tickets' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Your Tickets
            </h2>

            {myTickets.length === 0 ? (
              <Card className="text-center py-12">
                <FiCreditCard className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No tickets yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Register for events to get tickets
                </p>
                <Link to="/events">
                  <Button variant="primary" size="md">
                    Browse Events
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {myTickets.map((ticket) => (
                  <TicketCard 
                    key={ticket.ticketId} 
                    ticket={ticket}
                    onGenerateTicket={handleGenerateTicket}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
