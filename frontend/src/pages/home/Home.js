import React from "react";
import Topbar from "../../components/topbar/Topbar.js";
import Sidebar from "../../components/sidebar/Sidebar.js";
import Feed from "../../components/feed/Feed.js";
import Rightbar from "../../components/rightbar/Rightbar.js";
import "./home.css";
export default function Home() {
  return (
    <>
      <Topbar />
      <div className="home-container">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
