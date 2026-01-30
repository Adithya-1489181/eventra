import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//import pages, layouts, global providers, auth gards etc.

import Login from "./pages/login.jsx"
import SignUp from "./pages/signup.jsx";
import Error404 from "./pages/error.jsx";

function App() {
  return(
      <BrowserRouter>
        <Routes>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/signup" element = {<SignUp/>}/>
          <Route path = "*" element = {<Error404/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

