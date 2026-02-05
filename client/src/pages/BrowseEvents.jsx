import React, { useState, useEffect } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import AppLayout from '../layouts/AppLayout';
import { EventCard, EventFilters } from '../components/events';
import { Spinner, Alert } from '../components/ui';
import apiClient from '../utils/apiClient';
import { transformEventData } from '../utils/helpers';

const BrowseEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    showOpen: false,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, events]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/events');
      const rawEvents = response.data.eventDetails || [];
      
      // Transform backend fields to frontend format
      const transformedEvents = rawEvents.map(event => transformEventData(event));
      
      setEvents(transformedEvents);
      setError(null);
    } catch (err) {
      setError('Failed to load events. Please try again later.');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = [...events];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (event) => {
          const locationString = typeof event.location === 'object' 
            ? (event.location.venue || event.location.type || '').toLowerCase()
            : (event.location || '').toLowerCase();
          
          return (
            event.eventName?.toLowerCase().includes(searchLower) ||
            event.description?.toLowerCase().includes(searchLower) ||
            locationString.includes(searchLower)
          );
        }
      );
    }

    if (filters.category) {
      filtered = filtered.filter((event) => event.category === filters.category);
    }

    if (filters.showOpen) {
      // Handle both boolean and string values for isOpen
      filtered = filtered.filter((event) => event.isOpen === true || event.isOpen === 'true');
    }

    setFilteredEvents(filtered);
  };

  const handleSearchChange = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleCategoryChange = (value) => {
    setFilters((prev) => ({ ...prev, category: value }));
  };

  const handleShowOpenChange = (checked) => {
    setFilters((prev) => ({ ...prev, showOpen: checked }));
  };

  const handleResetFilters = () => {
    setFilters({ search: '', category: '', showOpen: false });
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Discover Events
          </h1>
          <p className="text-lg text-gray-600">
            Find and join amazing events happening around you
          </p>
        </div>

        <EventFilters
          searchQuery={filters.search}
          onSearchChange={handleSearchChange}
          category={filters.category}
          onCategoryChange={handleCategoryChange}
          showOpen={filters.showOpen}
          onShowOpenChange={handleShowOpenChange}
          onReset={handleResetFilters}
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <Alert type="error" message={error} />
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <FiAlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600">
              {filters.search || filters.category
                ? 'Try adjusting your filters'
                : 'Check back later for new events'}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredEvents.length} of {events.length} events
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.eventId} event={event} />
              ))}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default BrowseEvents;
