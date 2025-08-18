import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PatientView from './pages/PatientView';
import AdminView from './pages/AdminView';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>Westminster Skin Consultation</h1>
          </Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/patient" element={<PatientView />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminView />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;