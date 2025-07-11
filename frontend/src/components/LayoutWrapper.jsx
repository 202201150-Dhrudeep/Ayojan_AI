import React from 'react';
import {
  FaBed, FaCamera, FaUtensils, FaChurch,
  FaMapMarkedAlt, FaCalendarAlt, FaBoxes, FaTheaterMasks
} from 'react-icons/fa';
import './LayoutWrapper.css'; // You can reuse your Layout.css styles

const LayoutWrapper = ({ children }) => {
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="logo">👑 Ayojan AI</div>
      </header>

      {/* Body with Sidebar + Page Content */}
      <div className="dashboard-body">
        <aside className="sidebar">
          <div className="sidebar-title">Services</div>
          <div className="sidebar-item"><FaBed /> Accommodations</div>
          <div className="sidebar-item"><FaCamera /> Photography</div>
          <div className="sidebar-item"><FaUtensils /> Caterers</div>
          <div className="sidebar-item"><FaChurch /> Ceremony</div>
          <div className="sidebar-item"><FaMapMarkedAlt /> Venue</div>
          <div className="sidebar-item"><FaTheaterMasks /> Stage Management</div>
          <div className="sidebar-item"><FaCalendarAlt /> Calendar & Reminders</div>
          <div className="sidebar-item"><FaBoxes /> Logistics</div>
        </aside>

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutWrapper;
