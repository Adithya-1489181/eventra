import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate("/login");
    }, 5000)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <ThemeToggle />
            <p className="text-red-500">Not implemented. Go back to login screen now!!!!</p>
        </div>
    );
};

export default Home;
