import { useState } from "react";

const authLayout = () => {
    const [isLoginPage, setisLoginPage] = useState(true);
    const [isUserAuthenticated, setisUserAuthenticated] = useState(false);
    
    return ( 
        <div className="flex min-h-screen items-center bg-gray-900 px-10">
              {/* Left Content */}
              <div className="w-[60%]">
                <h1 className="text-3xl font-bold text-white">Left Content</h1>
                <p className="mt-4 text-white">This is the left side content.</p>
              </div>
        
              {/* Right Content */}
              
            </div>
     );
}
 
export default authLayo
<div>

</div>ut;