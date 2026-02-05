import React from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { Input, Select, Button } from '../ui';

const EventFilters = ({ 
  searchQuery, 
  onSearchChange, 
  category, 
  onCategoryChange,
  showOpen,
  onShowOpenChange,
  onReset 
}) => {
  const categories = [
    { value: '', label: 'All Categories' },
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FiFilter className="text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filter Events</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
              fullWidth
            />
          </div>
        </div>

        <Select
          options={categories}
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          fullWidth
        />
      </div>

      <div className="mt-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOpen}
            onChange={(e) => onShowOpenChange(e.target.checked)}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <span className="text-sm text-gray-700">Show only open events</span>
        </label>
      </div>

      {(searchQuery || category || showOpen) && (
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" size="sm" onClick={onReset}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventFilters;
