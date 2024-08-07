import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComment from "../components/DashComment";
import DashboardComp from "../components/DashboardComp";

export default function DashBoard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl); // Update tab state based on query parameter
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* Profile */}
      {tab === "profile" && <DashProfile />}
      {/* Post */}
      {tab === "posts" && <DashPosts />}
      {/* User */}
      {tab === "users" && <DashUsers />}
      {/* Comment */}
      {tab === "comments" && <DashComment />}
      {/*Dashboard */}
      {tab === "dash" && <DashboardComp />}
      {/* Add more conditions for other tabs if needed */}
    </div>
  );
}
