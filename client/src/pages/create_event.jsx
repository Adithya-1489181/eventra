import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTicketAlt, FaDollarSign } from "react-icons/fa";
import ThemeToggle from "../components/ThemeToggle";

const CreateEvent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date: "",
        time: "",
        location: "",
        capacity: "",
        ticketPrice: "",
        category: "conference"
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            const newEvent = {
                id: Date.now(),
                name: formData.name,
                date: formData.date,
                location: formData.location,
                attendees: parseInt(formData.capacity),
                ticketsSold: 0,
                description: formData.description,
                time: formData.time,
                ticketPrice: parseFloat(formData.ticketPrice),
                category: formData.category
            };
            
            // Store in localStorage for now
            const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
            localStorage.setItem('events', JSON.stringify([...existingEvents, newEvent]));
            
            setLoading(false);
            navigate("/dashboard");
        }, 1000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Create New Event
                        </h1>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Event Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Event Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter event name"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Describe your event"
                                    required
                                ></textarea>
                            </div>

                            {/* Date and Time */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <FaCalendarAlt /> Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Time *
                                    </label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    <FaMapMarkerAlt /> Location *
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter event location"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                >
                                    <option value="conference">Conference</option>
                                    <option value="workshop">Workshop</option>
                                    <option value="seminar">Seminar</option>
                                    <option value="concert">Concert</option>
                                    <option value="festival">Festival</option>
                                    <option value="meetup">Meetup</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Capacity and Ticket Price */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <FaUsers /> Capacity *
                                    </label>
                                    <input
                                        type="number"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        placeholder="Maximum attendees"
                                        min="1"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <FaDollarSign /> Ticket Price *
                                    </label>
                                    <input
                                        type="number"
                                        name="ticketPrice"
                                        value={formData.ticketPrice}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        placeholder="Price per ticket"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <FaSave /> Create Event
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate("/dashboard")}
                                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
