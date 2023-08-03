import { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";
import Messege from "../../components/messege/Messege";
import Topbar from "../../components/topbar/Topbar";
import "./messenger.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messeges, setMesseges] = useState([]);
  const [newMessege, setNewMessege] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMesseges((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMesseges = async () => {
      try {
        const res = await axios.get("/messeges/" + currentChat?._id);
        setMesseges(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMesseges();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messege = {
      sender: user._id,
      text: newMessege,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessege,
    });

    try {
      const res = await axios.post("/messeges", messege);
      setMesseges([...messeges, res.data]);
      setNewMessege("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messeges]);
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chat-menu">
          <div className="chat-menu-wrapper">
            <input
              placeholder="Search for friends"
              className="chat-menu-input"
            />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />;
              </div>
            ))}
          </div>
        </div>
        <div className="chat-box">
          <div className="chat-box-wrapper">
            {currentChat ? (
              <>
                <div className="chat-box-top">
                  {messeges.map((m) => (
                    <div ref={scrollRef}>
                      <Messege messege={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chat-box-bottom">
                  <textarea
                    placeholder="write something..."
                    className="chat-messege-input"
                    onChange={(e) => setNewMessege(e.target.value)}
                    value={newMessege}
                  ></textarea>
                  <button className="chat-submit-button" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="no-conversation">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chat-online">
          <div className="chat-online-wrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
