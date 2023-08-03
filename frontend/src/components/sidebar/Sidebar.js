import "./sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import CloseFriend from "../closeFriend/CloseFriend";
import { Users } from "../../dummyData";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <ul className="sidebar-list">
          <li className="sidebar-list-item" onClick={() => navigate("/")}>
            <HomeIcon className="sidebar-icon" />
            <span className="sidebar-list-item-text">Home</span>
          </li>
          <li
            className="sidebar-list-item"
            onClick={() => navigate("/profile/" + user.username)}
          >
            <PersonIcon className="sidebar-icon" />
            <span className="sidebar-list-item-text">{user.username}</span>
          </li>
          <li
            className="sidebar-list-item"
            onClick={() => navigate("/messenger")}
          >
            <ChatIcon className="sidebar-icon" />
            <span className="sidebar-list-item-text">Messenger</span>
          </li>
        </ul>
        <button className="sidebar-button">Show More</button>
        <hr className="sidebar-hr" />
        <ul className="sidebar-friend-list">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
