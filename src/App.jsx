import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/starting_pages/login';
import MainPage from './pages/starting_pages/mainPage';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={<MainPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
