import React from "react";
import { Menu, Avatar } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  UserOutlined,
  FileTextOutlined,
  RedoOutlined
} from "@ant-design/icons";

const SideNav = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Define menu items as per AntD v5+
  const menuItems = [
    {
      key: "/",
      icon: <AppstoreOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: "/patients",
      icon: <UserOutlined />,
      label: <Link to="/patients">Patients</Link>,
    },
    {
      key: "/follow-up",
      icon: <RedoOutlined />,
      label: <Link to="/follow-up">Follow Up</Link>,
    },
    {
      key: "/documents",
      icon: <FileTextOutlined />,
      label: <Link to="/documents">Documents</Link>,
    },
  ];

  return (
    <div
      className="sidenav"
      style={{
        width: isOpen ? 220 : 80,
      }}
    >
      {/* User Info */}
      <div className={`user-info ${!isOpen ? "collapsed" : ""}`}>
        <Avatar size={40} className="user-avatar">
          {user?.email ? user.email[0].toUpperCase() : "U"}
        </Avatar>
        {isOpen && (
          <div className="user-details">
            <div className="user-name">{user?.name || "Unknown User"}</div>
            <div className="user-role" style={{textDecoration:"underline", cursor:"pointer"}} onClick={() => navigate('/profile')}>view profile</div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        inlineCollapsed={!isOpen}
        items={menuItems}
      />
    </div>
  );
};

export default SideNav;
