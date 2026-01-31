import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTicketAlt, FaDollarSign, FaClock, FaTag } from "react-icons/fa";
import ThemeToggle from "../components/ThemeToggle";

const EventDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [ticketQuantity, setTicketQuantity] = useState(1);

    useEffect(() => {
        const events = JSON.parse(localStorage.getItem('events') || '[]');
        const foundEvent = events.find(e => e.id === parseInt(id));
        setEvent(foundEvent);
    }, [id]);

    const handleBuyTickets = () => {
        if (event && ticketQuantity > 0) {
            const events = JSON.parse(localStorage.getItem('events') || '[]');
            const updatedEvents = events.map(e => {
                if (e.id === event.id) {
                    const newTicketsSold = Math.min(e.ticketsSold + ticketQuantity, e.attendees);
                    return { ...e, ticketsSold: newTicketsSold };
                }
                return e;
            });
            localStorage.setItem('events', JSON.stringify(updatedEvents));
            alert(`Successfully purchased ${ticketQuantity} ticket(s)!`);
            setEvent({ ...event, ticketsSold: event.ticketsSold + ticketQuantity });
        }
    };

    if (!event) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <ThemeToggle />
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Event Not Found</h1>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const availableTickets = event.attendees - event.ticketsSold;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ThemeToggle />
            
            {/* Navigation Bar */}
            <nav className="bg-white dark:bg-gray-800 shadow-md">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                        >
                            <FaArrowLeft /> Back to Dashboard
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                        {/* Event Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                            <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
                            <div className="flex flex-wrap gap-4 text-lg">
                                <span className="flex items-center gap-2">
                                    <FaCalendarAlt /> {new Date(event.date).toLocaleDateString('en-US', { 
                                        weekday: 'long', 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </span>
                                {event.time && (
                                    <span className="flex items-center gap-2">
                                        <FaClock /> {event.time}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Event Details */}
                        <div className="p-8">
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 text-xl mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-gray-800 dark:text-white">Location</h3>
                                            <p className="text-gray-600 dark:text-gray-300">{event.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <FaTag className="text-blue-600 dark:text-blue-400 text-xl mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-gray-800 dark:text-white">Category</h3>
                                            <p className="text-gray-600 dark:text-gray-300 capitalize">{event.category}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <FaUsers className="text-blue-600 dark:text-blue-400 text-xl mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-gray-800 dark:text-white">Capacity</h3>
                                            <p className="text-gray-600 dark:text-gray-300">{event.attendees} attendees</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <FaTicketAlt className="text-blue-600 dark:text-blue-400 text-xl mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-gray-800 dark:text-white">Tickets Available</h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {availableTickets} / {event.attendees}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            {event.description && (
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">About This Event</h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{event.description}</p>
                                </div>
                            )}

                            {/* Ticket Purchase Section */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                            ${event.ticketPrice?.toFixed(2) || '0.00'}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">per ticket</p>
                                    </div>
                                    <FaDollarSign className="text-4xl text-green-500" />
                                </div>

                                {availableTickets > 0 ? (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Quantity
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                max={availableTickets}
                                                value={ticketQuantity}
                                                onChange={(e) => setTicketQuantity(Math.min(parseInt(e.target.value) || 1, availableTickets))}
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                                            <span className="font-semibold text-gray-800 dark:text-white">Total:</span>
                                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                ${((event.ticketPrice || 0) * ticketQuantity).toFixed(2)}
                                            </span>
                                        </div>
                                        <button
                                            onClick={handleBuyTickets}
                                            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition font-medium text-lg"
                                        >
                                            Buy Tickets
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
                                            Sold Out
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
