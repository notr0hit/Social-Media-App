import "./closeFriend.css";

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebar-friend">
      <img
        src={PF + user.profilePicture}
        alt=""
        className="sidebar-friend-image"
      />
      <span className="sidebar-friend-name">{user.username}</span>
    </li>
  );
}
