import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiUsers, FiTrendingUp } from 'react-icons/fi';
import AppLayout from '../layouts/AppLayout';
import { Button, Card } from '../components/ui';

const Home = () => {
  const features = [
    {
      icon: FiCalendar,
      title: 'Easy Event Creation',
      description: 'Create and manage events with our intuitive platform. Set up your event in minutes.',
    },
    {
      icon: FiUsers,
      title: 'Connect with Attendees',
      description: 'Build your community and engage with participants before, during, and after events.',
    },
    {
      icon: FiTrendingUp,
      title: 'Grow Your Reach',
      description: 'Promote your events and reach a wider audience with our powerful marketing tools.',
    },
  ];

  const stats = [
    { label: 'Events Hosted', value: '10,000+' },
    { label: 'Active Users', value: '50,000+' },
    { label: 'Countries', value: '120+' },
  ];

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Create Memorable
              <span className="text-indigo-600"> Events</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover amazing events or host your own. Join thousands of event organizers 
              and attendees on Eventra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/events">
                <Button variant="primary" size="lg" className="inline-flex items-center whitespace-nowrap">
                  Browse Events
                  <FiArrowRight className="ml-1.5" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Home;
