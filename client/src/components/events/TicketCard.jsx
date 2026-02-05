import React, { useState } from 'react';
import { FiCalendar, FiMapPin, FiMail } from 'react-icons/fi';
import { Card, Button } from '../ui';

const TicketCard = ({ ticket, onGenerateTicket }) => {
  const {
    eventName,
    ticketId,
    eventDate,
    location,
    qrCode,
    eventId,
  } = ticket;
  
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {eventName}
          </h3>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start">
              <FiCalendar className="mr-3 mt-0.5 flex-shrink-0" />
              <span>{formatDate(eventDate)}</span>
            </div>

            {location && (
              <div className="flex items-start">
                <FiMapPin className="mr-3 mt-0.5 flex-shrink-0" />
                <span>{location}</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Ticket ID: {ticketId}
            </p>
          </div>

          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                setLoading(true);
                await onGenerateTicket(eventId);
                setLoading(false);
              }}
              disabled={loading}
              className="w-full inline-flex items-center justify-center whitespace-nowrap"
            >
              <FiMail className="mr-1.5" size={16} />
              {loading ? 'Sending...' : 'Generate Ticket'}
            </Button>
          </div>
        </div>

        {qrCode && (
          <div className="md:w-48 bg-gray-50 p-6 flex items-center justify-center border-l border-gray-200">
            <img 
              src={qrCode} 
              alt="Ticket QR Code"
              className="w-32 h-32"
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default TicketCard;
