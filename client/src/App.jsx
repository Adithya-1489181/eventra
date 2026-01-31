import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";

//import pages, layouts, global providers, auth gards etc.

import Login from "./pages/login.jsx"
import SignUp from "./pages/signup.jsx";
import Error404 from "./pages/error.jsx";
import Home from "./pages/home.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Settings from "./pages/settings.jsx";
import CreateEvent from "./pages/create_event.jsx";
import EditEvent from "./pages/edit_event.jsx";
import EventDetails from "./pages/event_details.jsx";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/events/edit/:id" element={<EditEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
