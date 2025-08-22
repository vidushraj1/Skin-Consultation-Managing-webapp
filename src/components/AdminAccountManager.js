import React, { useState, useEffect } from 'react';
import apiClient from '../api/api';
import './AdminDoctorManager.css';

function AdminAccountManager() {
    const [admins, setAdmins] = useState([]);
    const [error, setError] = useState('');
    const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = () => {
        apiClient.get('/admins')
            .then(response => setAdmins(response.data))
            .catch(err => {
                console.error("Error fetching admins:", err);
                setError('Could not fetch admin accounts.');
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAdmin(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddAdmin = (e) => {
        e.preventDefault();
        apiClient.post('/admins', newAdmin)
            .then(() => {
                fetchAdmins();
                setNewAdmin({ username: '', password: '' });
            })
            .catch(err => {
                console.error("Error adding admin:", err.response);
                setError(err.response?.data?.message || 'Could not add admin.');
            });
    };
    
    const handleDeleteAdmin = (adminId) => {
        if (window.confirm('Are you sure you want to delete this admin account?')) {
            apiClient.delete(`/admins/${adminId}`)
                .then(() => {
                    setAdmins(prevAdmins => prevAdmins.filter(a => a.id !== adminId));
                })
                .catch(err => {
                    console.error("Error deleting admin:", err);
                    setError('Could not delete admin.');
                });
        }
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
            <h2>Manage Admin Accounts</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="add-doctor-form">
                <h3>Add a New Admin</h3>
                <form onSubmit={handleAddAdmin}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="username" value={newAdmin.username} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={newAdmin.password} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <button type="submit">Add Admin</button>
                </form>
            </div>

            <h3>Existing Admins</h3>
            <table className="doctor-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map(admin => (
                        <tr key={admin.id}>
                            <td title={admin.id}>{truncateId(admin.id)}</td>
                            <td>{admin.username}</td>
                            <td>
                                <button className="delete-button" onClick={() => handleDeleteAdmin(admin.id)}>
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

export default AdminAccountManager;