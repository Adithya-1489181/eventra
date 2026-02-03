import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaCalendarAlt, FaUsers, FaTicketAlt, FaEdit, FaTrash, FaCog, FaSignOutAlt, FaTimes } from "react-icons/fa";
import ThemeToggle from "../components/ThemeToggle";

const Dashboard = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [deleteModal, setDeleteModal] = useState({ show: false, eventId: null });

    // Load events from localStorage on mount
    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
        if (storedEvents.length === 0) {
            // Add default events if none exist
            const defaultEvents = [
                {
                    id: 1,
                    name: "Tech Conference 2026",
                    date: "2026-03-15",
                    location: "San Francisco, CA",
                    attendees: 250,
                    ticketsSold: 180,
                    description: "Annual technology conference",
                    time: "09:00",
                    ticketPrice: 99.99,
                    category: "conference"
                },
                {
                    id: 2,
                    name: "Music Festival",
                    date: "2026-04-20",
                    location: "Austin, TX",
                    attendees: 1000,
                    ticketsSold: 850,
                    description: "Summer music festival",
                    time: "18:00",
                    ticketPrice: 149.99,
                    category: "festival"
                }
            ];
            localStorage.setItem('events', JSON.stringify(defaultEvents));
            setEvents(defaultEvents);
        } else {
            setEvents(storedEvents);
        }
    }, []);

    const handleDeleteEvent = (eventId) => {
        const updatedEvents = events.filter(event => event.id !== eventId);
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        setDeleteModal({ show: false, eventId: null });
    };

    const handleLogout = () => {
        // Add logout logic here
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ThemeToggle />

            {/* Navigation Bar */}
            <nav className="bg-white dark:bg-gray-800 shadow-md">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Eventra Dashboard
                        </h1>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/settings")}
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                            >
                                <FaCog /> Settings
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Events</p>
                                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                                    {events.length}
                                </h3>
                            </div>
                            <FaCalendarAlt className="text-4xl text-blue-500" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Attendees</p>
                                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                                    {events.reduce((sum, event) => sum + event.attendees, 0)}
                                </h3>
                            </div>
                            <FaUsers className="text-4xl text-green-500" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Tickets Sold</p>
                                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                                    {events.reduce((sum, event) => sum + event.ticketsSold, 0)}
                                </h3>
                            </div>
                            <FaTicketAlt className="text-4xl text-purple-500" />
                        </div>
                    </div>
                </div>

                {/* Events Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            My Events
                        </h2>
                        <button
                            onClick={() => navigate("/events/create")}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition font-medium"
                        >
                            <FaPlus /> Create Event
                        </button>
                    </div>

                    {/* Events List */}
                    <div className="space-y-4">
                        {events.length === 0 ? (
                            <div className="text-center py-12">
                                <FaCalendarAlt className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                                <p className="text-gray-500 dark:text-gray-400 text-lg">
                                    No events yet. Create your first event to get started!
                                </p>
                            </div>
                        ) : (
                            events.map((event) => (
                                <div
                                    key={event.id}
                                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer"
                                    onClick={() => navigate(`/events/${event.id}`)}
                                >
                                    <div className="flex-1 mb-4 md:mb-0">
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                            {event.name}
                                        </h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <FaCalendarAlt /> {new Date(event.date).toLocaleDateString()}
                                            </span>
                                            <span>📍 {event.location}</span>
                                            <span className="flex items-center gap-1">
                                                <FaUsers /> {event.attendees} capacity
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaTicketAlt /> {event.ticketsSold}/{event.attendees} sold
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                        <button 
                                            onClick={() => navigate(`/events/edit/${event.id}`)}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition flex items-center gap-2"
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button 
                                            onClick={() => setDeleteModal({ show: true, eventId: event.id })}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModal.show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Confirm Delete</h3>
                            <button
                                onClick={() => setDeleteModal({ show: false, eventId: null })}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <FaTimes size={24} />
                            </button>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to delete this event? This action cannot be undone.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleDeleteEvent(deleteModal.eventId)}
                                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setDeleteModal({ show: false, eventId: null })}
                                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
