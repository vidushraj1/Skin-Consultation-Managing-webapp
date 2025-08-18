import React, { useState, useEffect } from 'react';
import apiClient from '../api/api'; 
import './AdminDoctorManager.css';

const DOCTORS_URL = '/doctors';

function AdminDoctorManager({ onBookNow }) {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState('');
    
    const [newDoctor, setNewDoctor] = useState({
        firstName: '',
        surname: '',
        dateOfBirth: '',
        mobileNumber: '',
        medicalLicenceNumber: '',
        specialisation: ''
    });

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = () => {
        apiClient.get(DOCTORS_URL)
            .then(response => setDoctors(response.data))
            .catch(error => {
                console.error("Error fetching doctors:", error);
                setError("Could not fetch doctors. You may not be authorized.");
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddDoctor = (e) => {
        e.preventDefault();
        apiClient.post(DOCTORS_URL, newDoctor)
            .then(() => {
                fetchDoctors();
                setNewDoctor({
                    firstName: '', surname: '', dateOfBirth: '', mobileNumber: '',
                    medicalLicenceNumber: '', specialisation: ''
                });
            })
            .catch(error => {
                console.error("Error adding doctor:", error);
                setError("Could not add doctor. Please check the details.");
            });
    };

    const handleDeleteDoctor = (doctorId) => {
        if (window.confirm('Are you sure you want to delete this doctor?')) {
            apiClient.delete(`${DOCTORS_URL}/${doctorId}`)
                .then(() => {
                    setDoctors(prevDoctors => prevDoctors.filter(d => d.id !== doctorId));
                })
                .catch(error => {
                    console.error("Error deleting doctor:", error);
                    setError("Could not delete doctor.");
                });
        }
    };

    return (
        <div className="admin-container">
            <h2>Manage Doctors</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="add-doctor-form">
                <h3>Add a New Doctor</h3>
                <form onSubmit={handleAddDoctor}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" name="firstName" value={newDoctor.firstName} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Surname</label>
                            <input type="text" name="surname" value={newDoctor.surname} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input type="date" name="dateOfBirth" value={newDoctor.dateOfBirth} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input type="tel" name="mobileNumber" value={newDoctor.mobileNumber} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Medical Licence No.</label>
                            <input type="text" name="medicalLicenceNumber" value={newDoctor.medicalLicenceNumber} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Specialisation</label>
                            <input type="text" name="specialisation" value={newDoctor.specialisation} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <button type="submit">Add Doctor</button>
                </form>
            </div>

            <table className="doctor-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Surname</th>
                        <th>Licence Number</th>
                        <th>Specialisation</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {doctors.map(doctor => (
                        <tr key={doctor.id}>
                            <td>{doctor.id}</td>
                            <td>{doctor.firstName}</td>
                            <td>{doctor.surname}</td>
                            <td>{doctor.medicalLicenceNumber}</td>
                            <td>{doctor.specialisation}</td>
                            
                            <td style={{display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center'}}>
                                
                                <button className="delete-button action-button" onClick={() => handleDeleteDoctor(doctor.id)}>
                                    Delete
                                </button>
                                
                                <button className="book-button action-button" onClick={() => onBookNow(doctor)}>
                                    Book for Patient
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDoctorManager;