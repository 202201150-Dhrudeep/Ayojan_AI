// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import birthdayImg from '../assets/b.jpeg';
import marriage from '../assets/marriage.jpeg';
import party from '../assets/p.jpeg';
// import Cookies from 'js-cookie';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
const API_URL = process.env.VITE_API_URL || 'http://localhost:5000';
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/projects/fetchprojects/${userId}`,{
  withCredentials: true
});
console.log(res.data.projects)

        setProjects(res.data.projects.projects); // assuming res.data.projects is array
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userId]);

  return (
    <div className="dashboard-body">
      <main className="main-content">
        {/* Previous Projects */}
        <section className="projects-section">
          <h2>Your Previous Projects</h2>
          {loading ? (
            <p>Loading...</p>
          ) : projects.length === 0 ? (
            <p>No projects yet. Start by creating one!</p>
          ) : (
            <div className="project-list">
              {projects.map((project) => (
                <div className="project-card"  key={project._id} onClick={() => navigate(`/venue/${project._id}`)}>
                  <h4>{project.title}</h4>
                  <p>{project.location}</p>
                  <small>{project.startDate} – {project.endDate}</small>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Current Project (Mockup) */}
        <section className="current-project-section">
          <h2>🟢 Current Project</h2>
          <div className="current-project-card">
            <h3>Annual Tech Meetup 2025</h3>
            <p><strong>Date:</strong> 15th July – 17th July 2025</p>
            <p><strong>Type:</strong> Corporate Event</p>
            <p><strong>Status:</strong> In Progress</p>
            <button className="btn-manage">Manage Project</button>
          </div>
        </section>

        {/* Add New Project Section */}
        <section className="new-project-section">
          <h2>Add New Project</h2>
          <div className="add-project-box">
            <div className="suggestion-buttons">
              <div className="suggestion-card">
                <img src={birthdayImg} alt="Birthday" />
                <button>Birthday</button>
              </div>
              <div className="suggestion-card">
                <img src={marriage} alt="Marriage" />
                <button>Marriage</button>
              </div>
              <div className="suggestion-card">
                <img src={party} alt="Other Event" />
                <button>Other Event</button>
              </div>
            </div>
            <button className="btn-create" onClick={() => navigate(`/new-project/${userId}`)}>
              ✨ Create New Project
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
