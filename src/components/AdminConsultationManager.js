import React, { useState, useEffect } from 'react';
import apiClient from '../api/api';
import './AdminDoctorManager.css'; // Reuse the table styles

function AdminConsultationManager() {
    const [consultations, setConsultations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchConsultations();
    }, []);

    const fetchConsultations = () => {
        apiClient.get('/consultations')
            .then(response => {
                setConsultations(response.data);
            })
            .catch(err => {
                console.error("Error fetching consultations:", err);
                setError('Could not fetch consultation data.');
            });
    };

    const handleDeleteConsultation = (consultationId) => {
        if (window.confirm('Are you sure you want to delete this consultation?')) {
            apiClient.delete(`/consultations/${consultationId}`)
                .then(() => {
                    setConsultations(prev => prev.filter(c => c.id !== consultationId));
                })
                .catch(err => {
                    console.error("Error deleting consultation:", err);
                    setError('Could not delete consultation.');
                });
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="admin-container">
            <h2>Manage All Consultations</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table className="doctor-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date & Time</th>
                        <th>Patient Name</th>
                        <th>Doctor Name</th>
                        <th>Cost (£)</th>
                        <th>Image</th> {/* NEW column */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {consultations.map(consult => (
                        <tr key={consult.id}>
                            <td>{consult.id}</td>
                            <td>{formatDate(consult.startDateTime)}</td>
                            <td>{consult.patient.firstName} {consult.patient.surname}</td>
                            <td>Dr. {consult.doctor.firstName} {consult.doctor.surname}</td>
                            <td>{consult.cost.toFixed(2)}</td>
                            <td>
                                {/* --- NEW: Conditionally render the image link --- */}
                                {consult.imageUrl && (
                                    <a href={consult.imageUrl} target="_blank" rel="noopener noreferrer">
                                        View Image
                                    </a>
                                )}
                            </td>
                            <td>
                                <button className="delete-button" onClick={() => handleDeleteConsultation(consult.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminConsultationManager;
