import React from "react";
import { Menu, Avatar } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  AppstoreOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  RedoOutlined
} from "@ant-design/icons";

const { Item } = Menu;

const SideNav = ({ isOpen }) => {
  const location = useLocation();

  // Get user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div
      className="sidenav"
      style={{
        width: isOpen ? 220 : 80,
      }}
    >
      {/* User info */}
      <div className={`user-info ${!isOpen ? "collapsed" : ""}`}>
        <Avatar
          size={40}
          className="user-avatar"
        >
          {user?.email ? user.email[0].toUpperCase() : "U"}
        </Avatar>
        {isOpen && (
          <div className="user-details">
            <div className="user-name">
              {user?.displayName || "Unknown User"}
            </div>
            <div className="user-role">
              {user?.role || "Staff"}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        inlineCollapsed={!isOpen}
      >
        <Item key="/" icon={<AppstoreOutlined />}>
          <Link to="/">Dashboard</Link>
        </Item>
        <Item key="/patients" icon={<UserOutlined />}>
          <Link to="/patients">Patients</Link>
        </Item>
        <Item key="/op" icon={<FileDoneOutlined />}>
          <Link to="/op">OP</Link>
        </Item>
        <Item key="/documents" icon={<FileTextOutlined />}>
          <Link to="/documents">Documents</Link>
        </Item>
        <Item key="/follow-up" icon={<RedoOutlined />}>
          <Link to="/follow-up">Follow Up</Link>
        </Item>
      </Menu>
    </div>
  );
};

export default SideNav;
