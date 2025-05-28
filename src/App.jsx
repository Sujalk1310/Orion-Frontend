import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Panel from './pages/Panel';
import Authorize from './pages/Authorize';

const App = () => {

  return (
    <>
      <Router>
        <Toaster position="top-right" reverseOrder={true} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/panel/*" element={<Panel />} />
          <Route path="/github/callback" element={<Authorize />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
