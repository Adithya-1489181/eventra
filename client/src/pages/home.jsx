import { useNavigate } from "react-router-dom";
import { FaTicketAlt, FaCalendarAlt, FaUsers, FaChartLine, FaArrowRight } from "react-icons/fa";
import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <FaCalendarAlt className="text-4xl" />,
            title: "Event Management",
            description: "Create, organize, and manage events effortlessly with our intuitive platform."
        },
        {
            icon: <FaTicketAlt className="text-4xl" />,
            title: "Ticketing System",
            description: "Seamless ticket sales, distribution, and validation for your events."
        },
        {
            icon: <FaUsers className="text-4xl" />,
            title: "Attendee Tracking",
            description: "Keep track of registrations, check-ins, and attendee engagement in real-time."
        },
        {
            icon: <FaChartLine className="text-4xl" />,
            title: "Analytics & Insights",
            description: "Gain valuable insights with comprehensive analytics and reporting tools."
        }
    ];

    return (
        <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <ThemeToggle />
            
            {/* Hero Section */}
            <div className="container mx-auto px-6 pt-20 pb-16">
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Eventra</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        Your all-in-one platform to host, manage, and scale events with an integrated ticketing system.
                    </p>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mb-12">
                        From small meetups to large conferences, Eventra makes event management simple, efficient, and powerful.
                    </p>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => navigate("/signup")}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white rounded-lg font-semibold text-lg transition shadow-lg hover:shadow-xl flex items-center gap-2"
                        >
                            Get Started <FaArrowRight />
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 rounded-lg font-semibold text-lg transition shadow-md hover:shadow-lg"
                        >
                            Sign In
                        </button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                        >
                            <div className="text-blue-600 dark:text-blue-400 mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Additional Info Section */}
                <div className="mt-20 text-center max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            Why Choose Eventra?
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Eventra streamlines the entire event lifecycle - from planning and promotion to ticket sales and post-event analytics. 
                            Whether you're organizing a workshop, concert, conference, or any other event, we've got you covered.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                                Easy Setup
                            </span>
                            <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                                Secure Payments
                            </span>
                            <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium">
                                Real-time Updates
                            </span>
                            <span className="px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 rounded-full text-sm font-medium">
                                24/7 Support
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
