import { useEffect, useState } from "react";
import "./chatOnline.css";
import axios from "axios";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get("/users/friends/" + currentId);
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="chat-online">
      {onlineFriends.map((o) => (
        <div className="chat-online-friend" onClick={() => handleClick(o)}>
          <div className="chat-online-container">
            <img
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="chat-online-image"
            />
            <div className="chat-online-badge"></div>
          </div>
          <span className="chat-online-name">{o.username}</span>
        </div>
      ))}
    </div>
  );
}
