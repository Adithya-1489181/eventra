import { useState } from 'react';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return ( 
        <>
            <div className="flex min-h-screen w-screen items-center bg-gray-900">
                <h1>SignUp</h1>
                {/* Left Content */}
                <div className="w-1/2 bg-gray-100 p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold">Left Content</h1>
                    <p className="mt-4 text-gray-700">This is the left side content.</p>
                </div>

                {/* Right Content */}
                <div className="flex-grow bg-white rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold">Right Content</h1>
                    <div className="mt-4">
                        <input 
                            type="text" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="border border-gray-300 rounded mb-4"
                        />
                        <br/>
                        <input 
                            type="password" 
                            placeholder="Enter your Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="border border-gray-300 rounded"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default SignUp;