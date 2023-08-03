import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import { Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.setItem("user", null);
    window.location.reload();
  };
  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <Link to="/" className="logo-link">
          <span className="logo">Social Media</span>
        </Link>
      </div>
      <div className="topbar-center">
        <div className="search-bar">
          <SearchIcon className="search-icon" />
          <input
            placeholder="Search for friends,post or video"
            className="search-input"
          />
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-links">
          <span className="topbar-link" onClick={() => navigate("/")}>
            Homepage
          </span>
          <span className="topbar-link" onClick={() => navigate("/")}>
            Timeline
          </span>
        </div>
        <div className="topbar-icons">
          <div className="topbar-icon-item">
            <PersonIcon />
            <span className="topbar-icon-badge">1</span>
          </div>
          <div
            className="topbar-icon-item"
            onClick={() => navigate("/messenger")}
          >
            <ChatIcon />
            <span className="topbar-icon-badge">2</span>
          </div>
          <div className="topbar-icon-item">
            <NotificationsIcon />
            <span className="topbar-icon-badge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbar-image"
          />
        </Link>
        <MoreVert
          style={{ marginRight: "10px", marginLeft: "10px", cursor: "pointer" }}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
