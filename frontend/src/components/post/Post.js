import "./post.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const deletePost = async () => {
    const obj = {
      userId: currentUser._id,
    };
    try {
      await axios.delete("/posts/" + post._id, { data: obj });
      handleClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt="Not"
                className="post-profile-image"
              />
            </Link>
            <span className="post-user-name">{user.username}</span>
            <span className="post-date">{format(post.createAt)}</span>
          </div>
          <div className="post-top-right">
            <MoreVert
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            />
            {post.userId === currentUser._id && (
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={deletePost}>Delete Post</MenuItem>
              </Menu>
            )}
          </div>
        </div>
        <div className="post-center">
          <span className="post-text">{post?.desc}</span>
          <img
            src={post.img ? PF + post.img : PF + "post/7.jpeg"}
            className="post-image"
            alt="Not"
          />
        </div>
        <div className="post-bottom">
          <div className="post-bottom-left">
            <img
              src={`${PF}like.png`}
              alt=""
              className="like-icon"
              onClick={likeHandler}
            />
            <img
              src={`${PF}heart.png`}
              alt=""
              className="like-icon"
              onClick={likeHandler}
            />
            <span className="post-like-counter">{like} people like it</span>
          </div>
          <div className="post-bottom-right">
            <span className="post-comment-text">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
