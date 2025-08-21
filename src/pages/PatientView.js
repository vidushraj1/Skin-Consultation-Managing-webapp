import React, { useState } from 'react';
import DoctorList from '../components/DoctorList';
import BookingForm from '../components/BookingForm';
import BookingHistory from '../components/BookingHistory';
import RandomDoctorFinder from '../components/RandomDoctorFinder';

function PatientView() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [preselectedTime, setPreselectedTime] = useState(null);

    /**
     * @param {object} doctor - The doctor object for the booking.
     * @param {object|null} timeDetails - Optional object with { startDateTime, durationHours }.
     */
    const handleOpenModal = (doctor, timeDetails = null) => {
        setSelectedDoctor(doctor);
        setPreselectedTime(timeDetails);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDoctor(null);
        setPreselectedTime(null);
    };

    return (
        <div>
            <DoctorList onBookNow={(doctor) => handleOpenModal(doctor)} />

            <RandomDoctorFinder onDoctorFound={(doctor, timeDetails) => handleOpenModal(doctor, timeDetails)} />

            {isModalOpen && <BookingForm doctor={selectedDoctor} onClose={handleCloseModal} initialTime={preselectedTime} />}

            <hr style={{ marginTop: '40px' }} />

            <BookingHistory />
        </div>
    );
}

export default PatientView;