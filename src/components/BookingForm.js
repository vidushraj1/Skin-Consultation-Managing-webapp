import React, { useState } from 'react';
import axios from 'axios';
import './BookingForm.css';

const BOOK_API_URL = process.env.REACT_APP_API_BASE_URL + '/api/consultations/book';
const UPLOAD_API_URL = process.env.REACT_APP_API_BASE_URL + '/api/files/upload';

function BookingForm({ doctor, onClose, initialTime }) {
    const [formData, setFormData] = useState({
        patientFirstName: '',
        patientSurname: '',
        patientDateOfBirth: '',
        patientMobileNumber: '',
        startDateTime: initialTime?.startDateTime || '',
        durationHours: initialTime?.durationHours || 1,
        notes: '',
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        let imageUrl = null;

        if (selectedFile) {
            const fileFormData = new FormData();
            fileFormData.append('file', selectedFile);

            try {
                const uploadResponse = await axios.post(UPLOAD_API_URL, fileFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                imageUrl = uploadResponse.data.url;
            } catch (err) {
                console.error("File upload error:", err);
                setError("Image upload failed. Please try again.");
                setIsLoading(false);
                return;
            }
        }

        const bookingRequest = {
            ...formData,
            doctorId: doctor.id,
            durationHours: parseInt(formData.durationHours),
            imageUrl: imageUrl
        };

        try {
            const bookingResponse = await axios.post(BOOK_API_URL, bookingRequest);
            setSuccess(`Booking confirmed for Dr. ${doctor.firstName} with ID: ${bookingResponse.data.id}`);
            setTimeout(() => onClose(), 2000);
        } catch (err) {
            console.error("Booking error:", err.response);
            setError(err.response?.data?.message || "Could not book consultation. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Book Consultation with Dr. {doctor.firstName} {doctor.surname}</h2>
                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="patientFirstName" value={formData.patientFirstName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Surname</label>
                        <input type="text" name="patientSurname" value={formData.patientSurname} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input type="date" name="patientDateOfBirth" value={formData.patientDateOfBirth} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input type="tel" name="patientMobileNumber" value={formData.patientMobileNumber} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Consultation Date and Time</label>
                        <input type="datetime-local" name="startDateTime" value={formData.startDateTime} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Duration (Hours)</label>
                        <input type="number" name="durationHours" value={formData.durationHours} onChange={handleChange} min="1" required />
                    </div>
                    <div className="form-group">
                        <label>Notes</label>
                        <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
                    </div>

                    <div className="form-group">
                        <label>Upload Image (Optional)</label>
                        <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
                    </div>

                    <button type="submit" className="book-button" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Confirm Booking'}
                    </button>
                </form>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
            </div>
        </div>
    );
}

export default BookingForm;
