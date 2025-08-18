import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDoctorManager from '../components/AdminDoctorManager';
import AdminPatientManager from '../components/AdminPatientManager';
import AdminAccountManager from '../components/AdminAccountManager';
import AdminConsultationManager from '../components/AdminConsultationManager';
import BookingForm from '../components/BookingForm'; // Import the BookingForm component
import './AdminView.css';

function AdminView() {
    const [activeTab, setActiveTab] = useState('doctors');
    const navigate = useNavigate();

    // --- State management for the booking modal ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    // Function to open the booking modal with the selected doctor's info
    const handleOpenModal = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    // Function to close the booking modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDoctor(null);
    };
    // --- End of modal state management ---

    /**
     * Handles the logout process.
     */
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    /**
     * Helper function to render the correct component based on the active tab.
     */
    const renderContent = () => {
        switch (activeTab) {
            case 'patients':
                return <AdminPatientManager />;
            case 'consultations':
                return <AdminConsultationManager />;
            case 'admins':
                return <AdminAccountManager />;
            case 'doctors':
            default:
                // Pass the handleOpenModal function as a prop to AdminDoctorManager
                return <AdminDoctorManager onBookNow={handleOpenModal} />;
        }
    };

    return (
        <div>
            {/* --- Header Section --- */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 20px'
            }}>
                <h2>Admin Dashboard</h2>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '8px 15px',
                        cursor: 'pointer',
                        backgroundColor: '#d0021b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontWeight: 'bold'
                    }}
                >
                    Logout
                </button>
            </div>

            {/* --- Tab Navigation --- */}
            <div className="admin-tabs">
                <button
                    className={`tab-button ${activeTab === 'doctors' ? 'active' : ''}`}
                    onClick={() => setActiveTab('doctors')}
                >
                    Manage Doctors
                </button>
                <button
                    className={`tab-button ${activeTab === 'patients' ? 'active' : ''}`}
                    onClick={() => setActiveTab('patients')}
                >
                    Manage Patients
                </button>
                <button
                    className={`tab-button ${activeTab === 'consultations' ? 'active' : ''}`}
                    onClick={() => setActiveTab('consultations')}
                >
                    Manage Consultations
                </button>
                <button
                    className={`tab-button ${activeTab === 'admins' ? 'active' : ''}`}
                    onClick={() => setActiveTab('admins')}
                >
                    Manage Admins
                </button>
            </div>

            {/* --- Content Area --- */}
            <div className="tab-content">
                {renderContent()}
            </div>

            {/* --- Booking Modal --- */}
            {/* Conditionally render the BookingForm modal if isModalOpen is true */}
            {isModalOpen && <BookingForm doctor={selectedDoctor} onClose={handleCloseModal} />}
        </div>
    );
}

export default AdminView;