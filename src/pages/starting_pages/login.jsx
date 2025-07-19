import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = "Login";
  }, [])

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    let data = {
      email, password
    };
    console.log(data);
    
    localStorage.setItem("user", JSON.stringify(data));
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2>Clinic Login</h2>
          <p>Welcome back! Please login to continue.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Input
              size="large"
              placeholder="Enter email"
              prefix={<UserOutlined style={{ color: '#3E8E41' }} />}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Input.Password
              size="large"
              placeholder="Enter password"
              prefix={<LockOutlined style={{ color: '#3E8E41' }} />}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid mt-3">
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              block
              size="large"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
