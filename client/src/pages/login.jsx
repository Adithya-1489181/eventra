import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center bg-gray-900 px-10">
      {/* Left Content */}
      <div className="w-[60%]">
        <h1 className="text-3xl font-bold text-white">Left Content</h1>
        <p className="mt-4 text-white">This is the left side content.</p>
      </div>

      {/* Right Content */}
      <div className="bg-white p-8 rounded-lg shadow-md ml-[rem]">
        <h1 className="text-3xl font-bold">Login</h1>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[20rem] p-2 border border-gray-300 rounded mb-4"
          />
          <br />
          <div className = "flex flex-row">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[20rem] p-2 border border-gray-300 rounded"
            />
            <span className="flex ml-[1rem] items-center" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
