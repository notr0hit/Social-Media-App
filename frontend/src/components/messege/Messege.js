import "./messege.css";
import { format } from "timeago.js";
export default function Messege({ messege, own }) {
  return (
    <div className={own ? "messege own" : "messege"}>
      <div className="messege-top">
        <img
          src="https://images.pexels.com/photos/36031/firefighter-fire-portrait-training.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="messege-image"
        />
        <p className="messege-text">{messege.text}</p>
      </div>
      <div className="messege-bottom">{format(messege.createdAt)}</div>
    </div>
  );
}
