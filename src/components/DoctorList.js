import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DoctorList.css';

const API_URL = process.env.REACT_APP_API_BASE_URL + '/api/doctors';

function DoctorList({ onBookNow }) {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                setDoctors(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the doctors!', error);
                setError('Could not fetch doctor data. Is the backend server running?');
            });
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div className="doctor-list-container">
            <h2>Available Doctors</h2>
            <ul className="doctor-grid">
                {doctors.map(doctor => (
                    <li key={doctor.id} className="doctor-card">
                        <div>
                            <h3>Dr. {doctor.firstName} {doctor.surname}</h3>
                            <p>{doctor.specialisation}</p>
                        </div>
                        <button className="dbook-button" onClick={() => onBookNow(doctor)}>
                            Book Now
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DoctorList;