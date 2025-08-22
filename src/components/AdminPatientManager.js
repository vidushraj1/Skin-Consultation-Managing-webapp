import React, { useState, useEffect } from 'react';
import apiClient from '../api/api';
import './AdminDoctorManager.css';

function AdminPatientManager() {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState('');
    
    const [newPatient, setNewPatient] = useState({
        firstName: '',
        surname: '',
        dateOfBirth: '',
        mobileNumber: ''
    });

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = () => {
        apiClient.get('/patients')
            .then(response => {
                setPatients(response.data);
            })
            .catch(err => {
                console.error("Error fetching patients:", err);
                setError('Could not fetch patient data.');
            });
    };

    const handleDeletePatient = (patientId) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            apiClient.delete(`/patients/${patientId}`)
                .then(() => {
                    setPatients(prevPatients => prevPatients.filter(p => p.id !== patientId));
                })
                .catch(err => {
                    console.error("Error deleting patient:", err);
                    setError('Could not delete patient.');
                });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPatient(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddPatient = (e) => {
        e.preventDefault();
        apiClient.post('/patients', newPatient)
            .then(() => {
                fetchPatients();
                setNewPatient({ firstName: '', surname: '', dateOfBirth: '', mobileNumber: '' });
            })
            .catch(err => {
                console.error("Error adding patient:", err);
                setError('Could not add patient. Please check the details.');
            });
    };

    // Helper function to shorten the ID string
    const truncateId = (id) => {
        if (id.length > 8) {
            return id.substring(0, 8) + '...';
        }
        return id;
    };

    return (
        <div className="admin-container">
            <h2>Manage Patients</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="add-doctor-form">
                <h3>Add a New Patient</h3>
                <form onSubmit={handleAddPatient}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" name="firstName" value={newPatient.firstName} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Surname</label>
                            <input type="text" name="surname" value={newPatient.surname} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input type="date" name="dateOfBirth" value={newPatient.dateOfBirth} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input type="tel" name="mobileNumber" value={newPatient.mobileNumber} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <button type="submit">Add Patient</button>
                </form>
            </div>

            <h3>Existing Patients</h3>
            <table className="doctor-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Surname</th>
                        <th>Date of Birth</th>
                        <th>Mobile Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => (
                        <tr key={patient.id}>
                            <td title={patient.id}>{truncateId(patient.id)}</td>
                            <td>{patient.firstName}</td>
                            <td>{patient.surname}</td>
                            <td>{patient.dateOfBirth}</td>
                            <td>{patient.mobileNumber}</td>
                            <td>
                                <button className="delete-button" onClick={() => handleDeletePatient(patient.id)}>
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

export default AdminPatientManager;