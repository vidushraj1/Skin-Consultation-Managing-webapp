import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-page">
            <div className="intro-text">
                <h1>Your Health, Your Time</h1>
                <p>
                    Welcome to Westminster Skin Consultation. Access expert dermatological care
                    seamlessly. View our specialists or book a consultation at your convenience.
                </p>
            </div>

            <div className="role-selection">
                <Link to="/patient" className="role-card patient-card">
                    <h2>For Patients</h2>
                    <p>View our list of world-class doctors and book your consultation in just a few clicks.</p>
                    <div className="arrow">&#8594;</div>
                </Link>

                <Link to="/admin/login" className="role-card admin-card">
                    <h2>For Administrators</h2>
                    <p>Access the management dashboard to oversee doctors, patients, and appointments.</p>
                    <div className="arrow">&#8594;</div>
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;