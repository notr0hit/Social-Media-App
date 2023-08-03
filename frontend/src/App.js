import Home from "./pages/home/Home.js";
import Login from "./pages/login/Login.js";
import Register from "./pages/register/Register.js";
import Profile from "./pages/profile/Profile.js";
import Messenger from "./pages/messenger/Messenger.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.js";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/messenger"
          element={!user ? <Navigate to="/" /> : <Messenger />}
        />
        <Route
          path="/profile/:username"
          element={user ? <Profile /> : <Register />}
        />
      </Routes>
    </Router>
  );
}

export default App;
