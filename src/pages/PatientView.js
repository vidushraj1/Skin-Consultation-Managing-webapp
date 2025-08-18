import React, { useState } from 'react';
import DoctorList from '../components/DoctorList';
import BookingForm from '../components/BookingForm';
import BookingHistory from '../components/BookingHistory';
import RandomDoctorFinder from '../components/RandomDoctorFinder';

function PatientView() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    // State to hold pre-selected time details from the finder
    const [preselectedTime, setPreselectedTime] = useState(null);

    /**
     * Opens the booking modal. Can be called with or without time details.
     * @param {object} doctor - The doctor object for the booking.
     * @param {object|null} timeDetails - Optional object with { startDateTime, durationHours }.
     */
    const handleOpenModal = (doctor, timeDetails = null) => {
        setSelectedDoctor(doctor);
        setPreselectedTime(timeDetails); // Store the time details
        setIsModalOpen(true);
    };

    /**
     * Closes the booking modal and resets the state.
     */
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDoctor(null);
        setPreselectedTime(null); // Clear the details when closing
    };

    return (
        <div>
            {/* The DoctorList doesn't provide time details, so it calls with only the doctor */}
            <DoctorList onBookNow={(doctor) => handleOpenModal(doctor)} />

            {/* The Finder provides both the doctor and the selected time */}
            <RandomDoctorFinder onDoctorFound={(doctor, timeDetails) => handleOpenModal(doctor, timeDetails)} />

            {/* The BookingForm is passed the initialTime prop to pre-fill its fields */}
            {isModalOpen && <BookingForm doctor={selectedDoctor} onClose={handleCloseModal} initialTime={preselectedTime} />}

            <hr style={{ marginTop: '40px' }} />

            <BookingHistory />
        </div>
    );
}

export default PatientView;