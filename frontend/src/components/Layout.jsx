import React from 'react';
import { Outlet, NavLink,useLocation,matchPath } from 'react-router-dom';
import './Layout.css';
import {
  FaBed, FaCamera, FaUtensils, FaChurch,
  FaMapMarkedAlt, FaCalendarAlt, FaBoxes, FaTheaterMasks,
  FaPenFancy, FaShoppingCart
} from 'react-icons/fa';

const Layout = () => {
 const location = useLocation();
  const match = matchPath("/project/:projectId/*", location.pathname);
  const projectId = match?.params?.projectId;
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo">👑 Ayojan AI</div>
      </header>

      <div className="dashboard-body">
        <aside className="sidebar">
          <div className="sidebar-title">Services</div>

          <NavLink to="/new-project" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <FaPenFancy /> Basic Details
          </NavLink>

          <NavLink to={`/venue/:${projectId}`} className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <FaMapMarkedAlt /> Venue
          </NavLink>

          <NavLink to={`/ceremony/:${projectId}`} className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <FaChurch /> Ceremony
          </NavLink>

          <NavLink to="/accommodations" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <FaBed /> Accommodations
          </NavLink>

          <NavLink to="/caterers" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <FaUtensils /> Caterers
          </NavLink>

          <NavLink to="/photography" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <FaCamera /> Photography
          </NavLink>

          <NavLink to="/stage" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <FaTheaterMasks /> Stage Management
          </NavLink>

          <NavLink to="/logistics" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <FaBoxes /> Logistics
          </NavLink>

          <NavLink to="/calendar" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <FaCalendarAlt /> Calendar & Reminders
          </NavLink>

          <NavLink to="/trends" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <FaPenFancy /> Trends
          </NavLink>

          <NavLink to="/cart" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
            <FaShoppingCart /> Cart
          </NavLink>
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
