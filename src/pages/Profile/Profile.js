// === src/pages/Profile/Profile.js ===
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiLogOut, FiUser, FiShoppingBag, FiDollarSign, FiCalendar } from 'react-icons/fi';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        
        const [profileRes, ordersRes] = await Promise.all([
          axios.get('http://localhost:5000/api/auth/profile', { headers }),
          axios.get('http://localhost:5000/api/orders/my', { headers })
        ]);
        
        setProfile(profileRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (!confirmed) return;

    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (isLoading) return <div className="loading">Loading your profile...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2><FiUser style={{ marginRight: '10px' }} /> My Profile</h2>
        <button onClick={handleLogout} className="logout-btn">
          <FiLogOut /> Logout
        </button>
      </div>

      <div className="profile-details">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        {/* Add more profile details if available */}
      </div>

      <h3 className="orders-title"><FiShoppingBag style={{ marginRight: '10px' }} /> My Orders</h3>
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="order-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <h4>Order #{order._id.slice(-6).toUpperCase()}</h4>
              <div className="order-meta">
                <span><FiDollarSign /> ${order.grandTotal.toFixed(2)}</span>
                <span><FiCalendar /> {new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="order-items">
                <ul>
                  {order.items.map((item, i) => (
                    <li key={i}>
                      <span>{item.name}</span>
                      <span>× {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-total">
                Total: ${order.grandTotal.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;