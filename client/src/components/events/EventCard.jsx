import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiClock, FiUsers } from 'react-icons/fi';
import { Card, Badge } from '../ui';
import { formatDate, formatTime } from '../../utils/helpers';

const EventCard = ({ event, showActions = false, onEdit, onDelete }) => {
  const {
    eventId,
    eventName,
    description,
    location,
    startDate,
    endDate,
    capacity,
    category,
    bannerImage,
  } = event;

  return (
    <Card hover className="overflow-hidden">
      <Link to={`/events/${eventId}`}>
        <div className="aspect-video w-full bg-gray-200 overflow-hidden">
          {bannerImage ? (
            <img 
              src={bannerImage} 
              alt={eventName}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-indigo-50">
              <FiCalendar size={48} className="text-indigo-300" />
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        {category && (
          <Badge variant="primary" size="sm" className="mb-2">
            {category}
          </Badge>
        )}

        <Link to={`/events/${eventId}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
            {eventName}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <FiCalendar className="mr-2 flex-shrink-0" />
            <span>{formatDate(startDate)}</span>
          </div>

          <div className="flex items-center">
            <FiClock className="mr-2 flex-shrink-0" />
            <span>{formatTime(startDate)} - {formatTime(endDate)}</span>
          </div>

          {location && (
            <div className="flex items-center">
              <FiMapPin className="mr-2 flex-shrink-0" />
              <span className="truncate">
                {typeof location === 'object' 
                  ? location.venue || `${location.type} Event`
                  : location}
              </span>
            </div>
          )}

          {capacity && (
            <div className="flex items-center">
              <FiUsers className="mr-2 flex-shrink-0" />
              <span>{capacity} attendees</span>
            </div>
          )}
        </div>

        {showActions && (
          <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
            <button
              onClick={() => onEdit(eventId)}
              className="flex-1 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(eventId)}
              className="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EventCard;
