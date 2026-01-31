import { useNavigate } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";
import ThemeToggle from "../components/ThemeToggle.jsx";

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
            <ThemeToggle />
            <div className="text-center px-6">
                <div className="mb-8">        <div>


                </div>
                    <FaExclamationTriangle className="mx-auto text-9xl text-red-500 dark:text-red-400 mb-4 animate-pulse" />
                    <h1 className="text-9xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
                    <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition font-medium"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate("/home")}
                        className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition font-medium flex items-center justify-center gap-2"
                    >
                        <FaHome />
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Error404;
