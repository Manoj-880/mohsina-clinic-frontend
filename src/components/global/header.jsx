/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Tooltip, Badge } from "antd";
import { MenuOutlined, BellOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/branding.png";

const Header = ({ isSidenavOpen, onToggle }) => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleProfile = () => {
        console.log("clicked")
        navigate("/profile")
    }

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
                <img src={logo} alt="my Logo" width={'10%'}  style={{marginRight:"0.2rem"}}/>
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
            <Button
                // shape="circle"
                icon={<UserOutlined />}
                title="Profile"
                // danger
                onClick={handleProfile}
                style={{border:"solid 1px green", backgroundColor:"#fff", color:"green"}}
            > 
                Profile
            </Button>
            <Button
                // shape="circle"
                icon={<LogoutOutlined />}
                title="Logout"
                danger
                onClick={handleLogout}
            > 
                Logout
            </Button>
        </div>
        </div>
    );
};

export default Header;
