import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiShoppingBag, FiDollarSign, FiLogOut, FiSettings } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const checkAdminAccess = () => {
      if (!user || !user.isAdmin) {
        navigate('/login');
        return false;
      }
      return true;
    };

    if (!checkAdminAccess()) return;

    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
        const [usersRes, statsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/users', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/api/admin/stats', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setUsers(usersRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        if (error.response?.status === 403) {
          setError('Access denied. Admin privileges required.');
        } else {
          setError('Failed to load admin data.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate, user]);

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading admin dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <div className="admin-actions">
            <button className="admin-btn secondary">
              <FiSettings /> Settings
            </button>
            <button className="admin-btn danger" onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="admin-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FiUsers />
            </div>
            <div className="stat-info">
              <h3>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FiShoppingBag />
            </div>
            <div className="stat-info">
              <h3>{stats.totalOrders}</h3>
              <p>Total Orders</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FiDollarSign />
            </div>
            <div className="stat-info">
              <h3>${stats.totalRevenue}</h3>
              <p>Total Revenue</p>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="admin-section">
          <h2>Users Management</h2>
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.isAdmin ? 'admin' : 'user'}`}>
                        {user.isAdmin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn">Edit</button>
                      <button className="action-btn danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
