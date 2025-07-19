import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { FrownOutlined } from "@ant-design/icons";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <FrownOutlined className="not-found-icon" />
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-text">
        Sorry, the page you are looking for doesn’t exist.
      </p>
      <Button type="primary" onClick={() => navigate("/")}>
        Go Back Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
