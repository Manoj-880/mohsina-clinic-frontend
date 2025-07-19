/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Tooltip, Badge } from "antd";
import { MenuOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Header = ({ isSidenavOpen, onToggle }) => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="header">
        {/* Left: Toggle Button */}
        <div className="header-left">
            <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={onToggle}
            className="toggle-button"
            />
            <div className="header-title">
            DR.MOHASINA'S Holistic Health Care
            </div>
        </div>

        {/* Right: Notifications & Logout */}
        <div className="header-right">
            {/* <Tooltip title="Notifications">
            <Badge count={3} size="small">
                <Button
                shape="circle"
                icon={<BellOutlined />}
                className="notification-button"
                />
            </Badge>
            </Tooltip> */}
            <Tooltip title="Logout">
            <Button
                shape="circle"
                icon={<LogoutOutlined />}
                danger
                onClick={handleLogout}
            />
            </Tooltip>
        </div>
        </div>
    );
};

export default Header;
