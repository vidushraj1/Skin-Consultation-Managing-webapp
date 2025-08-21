import React, { useState } from 'react';
import axios from 'axios';
import './RandomDoctorFinder.css';

function RandomDoctorFinder({ onDoctorFound }) {
    const [dateTime, setDateTime] = useState('');
    const [duration, setDuration] = useState(1);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFindDoctor = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const params = {
            startDateTime: dateTime,
            durationHours: duration
        };

        axios.get(process.env.REACT_APP_API_BASE_URL + '/api/doctors/random-available', { params })
            .then(response => {
                const doctor = response.data;
                onDoctorFound(doctor, { startDateTime: dateTime, durationHours: duration });
            })
            .catch(err => {
                console.error("Error finding doctor:", err.response);
                if (err.response && err.response.status === 404) {
                    setError(err.response.data.message);
                } else {
                    setError("An unexpected error occurred while searching.");
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="finder-container">
            <h2>Don't have a preference?</h2>
            <p>Let us find an available doctor for you. Just select a time.</p>
            <form onSubmit={handleFindDoctor} className="finder-form">
                <div className="form-group">
                    <label>Date and Time</label>
                    <input
                        type="datetime-local"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Duration (Hours)</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        min="1"
                        required
                    />
                </div>
                <button type="submit" className="dbook-button" disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Find a Doctor'}
                </button>
            </form>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
}

export default RandomDoctorFinder;