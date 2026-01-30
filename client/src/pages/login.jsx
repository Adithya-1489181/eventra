import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginService } from "../services/authServices.js";


const Login = () => {
    //Form field value controllers
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    //UI State manipulators
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    //Call to the service provider
    const handleLogin = async () => {
        setError(null);
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds
        try {
            const res = await loginService({email,password});
            console.log("User Logged In");        
        } catch (error) {
            setError("Invalid Email or Password");
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className="bg-white p-8 rounded-lg shadow-md ml-[5rem]">
            <h1 className="text-3xl font-bold">Login</h1>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[20rem] p-2 border border-gray-300 rounded mb-4"
                    autoComplete="off"
                />
                <div className="flex flex-row items-center">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-[20rem] p-2 border border-gray-300 rounded"
                        autoComplete="new-password"
                    />
                    <span
                        className="flex ml-2 items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <a className="text-blue-500 cursor-pointer">Forgot Password?</a>
                {error && (
                    <p className="text-red-500 text-sm mb-3">
                        {error}
                    </p>
                )}
                <button 
                    onClick={handleLogin}
                    className="mt-4 w-20 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex justify-center items-center"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        "Login"
                    )}
                </button>
            </div>
        </div>
    );
};

export default Login;
