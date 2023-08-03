import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?.id));
  }, [currentUser, user]);
  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user._id) {
          const friendList = await axios.get("/users/friends/" + user._id);
          setFriends(friendList.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);
  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };
  const HomeRightBar = () => {
    return (
      <>
        <div className="birthday-container">
          <img src="/assets/gift.png" alt="" className="birthday-image" />
          <span className="birthday-text">
            <b>Gyanvi</b> and <b>3 other friends</b> have their birthday today
          </span>
        </div>
        <img src="/assets/ad.png" alt="" className="rightbar-ad" />
        <h4 className="rightbar-title">Online Friends</h4>
        <ul className="rightbar-friend-list">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  const ProfileRightBar = () => {
    return (
      <>
        <div className="user-info">
          {user.username !== currentUser.username && (
            <button className="rightbar-follow-btn" onClick={handleClick}>
              {followed ? "unfollow" : "follow"}
              {followed ? <RemoveIcon /> : <AddIcon />}
            </button>
          )}
          <h4 className="rightbar-title">User Information</h4>
          <div className="rightbar-info">
            <div className="rightbar-info-item">
              <span className="rightbar-info-key">City:</span>
              <span className="rightbar-info-value">{user.city}</span>
            </div>
            <div className="rightbar-info-item">
              <span className="rightbar-info-key">From:</span>
              <span className="rightbar-info-value">{user.from}</span>
            </div>
            <div className="rightbar-info-item">
              <span className="rightbar-info-key">Relationship:</span>
              <span className="rightbar-info-value">
                {user.relationship === 1
                  ? "Single"
                  : user.relationship === 2
                  ? "Married"
                  : "-"}
              </span>
            </div>
          </div>
          <h4 className="rightbar-title">User Friends</h4>
          <div className="rightbar-followings">
            {friends.map((friend) => (
              <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
              >
                <div className="rightbar-following">
                  <img
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                    className="rightbar-following-image"
                  />
                  <span className="rightbar-following-name">
                    {friend.username}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
