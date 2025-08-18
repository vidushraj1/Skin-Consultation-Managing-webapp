import React, { useState } from 'react';
import axios from 'axios'; // We use generic axios here, as it's a public endpoint
import './BookingHistory.css';

function BookingHistory() {
    const [mobileNumber, setMobileNumber] = useState('');
    const [consultations, setConsultations] = useState([]);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setError('');
        setSearched(true);
        setConsultations([]); // Clear previous results

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/patients/consultations?mobileNumber=${mobileNumber}`)
            .then(response => {
                setConsultations(response.data);
            })
            .catch(err => {
                console.error("Error fetching consultations:", err);
                setError("Could not find consultations for this mobile number.");
            });
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="history-container">
            <h2>Check Your Booking History</h2>
            <form onSubmit={handleSearch} className="history-form">
                <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your mobile number"
                    required
                />
                <button type="submit" className="book-button">Search</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <div className="results-list">
                {searched && consultations.length === 0 && !error && (
                    <p>No bookings found for this mobile number.</p>
                )}
                {consultations.map(consult => (
                    <div key={consult.id} className="consultation-item">
                        <h4>Consultation on {formatDate(consult.startDateTime)}</h4>
                        <p><strong>Doctor:</strong> Dr. {consult.doctor.firstName} {consult.doctor.surname}</p>
                        <p><strong>Notes:</strong> {consult.notes}</p>
                        <p><strong>Cost:</strong> £{consult.cost.toFixed(2)}</p>
                        
                        {/* --- NEW: Conditionally render the image --- */}
                        {consult.imageUrl && (
                            <div>
                                <strong>Attachment:</strong> <br />
                                <img
                                    src={consult.imageUrl}
                                    alt="Consultation attachment"
                                    style={{ maxWidth: '200px', marginTop: '10px', borderRadius: '5px' }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookingHistory;
