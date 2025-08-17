import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Venue.css';

const Venue = () => {
  const { projectId } = useParams();
  const API_URL = process.env.VITE_API_URL || 'http://localhost:5000';
  const [project, setProject] = useState(null);
  const [guestCount, setGuestCount] = useState(100);
  const [venueBudget, setVenueBudget] = useState(200000);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [venueData, setVenueData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        let res = await fetch(`${API_URL}/api/projects/${projectId}`,{
          method: "POST",
          credentials: 'include',
          headers: { 
            'Content-Type': 'application/json',
          },
        });
        res=await res.json()
        console.log(res)
        setProject(res.project);
      } catch (err) {
        console.error("Failed to fetch project:", err);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleVenueSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVenueData(null);
    setError(null);
    const string=prompt;
    // const string = `Hey consider this and you are a very professional event planner details event titled "${project.title}" start date ${project.startDate} end date ${project.endDate} location ${project.location} other details: ${prompt}. Now collaborate with google maps and find 20 wedding venues near ${project.location} around a budget of ₹${venueBudget}. Return as JSON with fields: Name, Google Map Rating, Address, Contact Number, Estimated Rent for a Day, Estimated Cost Per Plate, Description, Latitude, Longitude inside a document array.Make sure trhe latitudes and longitudes are exact .Return me just a json file and no text and most importantly sort them according to the google map ratings`;
    console.log( string);
    try {
      let res = await fetch(`${API_URL}/api/python/venue`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  body: JSON.stringify({ question: string }),
});
 res = await res.json();
// console.log(data);
console.log(res)
console.log(res.data)

      const raw = res.answer.answer;
const cleaned = raw
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .replace(/'''json/g, '')
      .replace(/'''/g, '')
      .trim();
      console.log(1)

    // If string is double-encoded, parse twice
    let parsed = JSON.parse(cleaned);
    if (typeof parsed === 'string') {
      parsed = JSON.parse(parsed);
    }
    console.log(2)
const ans = JSON.parse(cleaned);
console.log(ans)
setVenueData(ans);

      
    } catch (err) {
      console.error("❌ Failed to parse venue data:", err);
      setError("Failed to load suggestions. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="venue-container">
      <h2>🏛️ Venue Planning</h2>

      {project ? (
        <form className="venue-form" onSubmit={handleVenueSubmit}>
          <div className="readonly-field">
            <label>📍 Location:</label>
            <span>{project.location}</span>
          </div>

          <div className="readonly-field">
            <label>📅 Event Title:</label>
            <span>{project.title}</span>
          </div>

          <div className="form-group">
            <label>👥 Number of Guests</label>
            <input
              type="number"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              min={1}
              max={1000}
              required
            />
          </div>

          <div className="form-group">
            <label>💰 Venue Budget (INR): {parseInt(venueBudget).toLocaleString()}</label>
            <input
              type="range"
              min={10000}
              max={1000000}
              step={10000}
              value={venueBudget}
              onChange={(e) => setVenueBudget(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>📝 Additional Notes (Optional)</label>
            <textarea
              placeholder="e.g. Prefer outdoor garden venue, near airport, traditional theme..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
            />
          </div>

          <button type="submit">🔍 Get Venue Suggestions</button>
        </form>
      ) : (
        <p>Loading project details...</p>
      )}

      {loading && <p>⏳ Fetching suggestions...</p>}
      {error && <p className="error">{error}</p>}

      {Array.isArray(venueData) && venueData.length > 0 && (
  <div className="venue-results">
    <h3>📋 Venue Suggestions</h3>
    <p>
      Heads up! This info is here to help you get started — but we recommend
      double-checking the prices and venue details yourself before finalizing
      anything.
    </p>
    <div className="venue-grid">
      {venueData.map((venue, idx) => (
        <div className="venue-card" key={idx}>
          <h4>{venue.Name || "Unnamed Venue"}</h4>
          <p>⭐ {venue.Rating || venue["Google Map Rating"] || "N/A"}</p>
          <p><strong>📍 Location:</strong> {venue.Location || "N/A"}</p>
          <p><strong>👥 Capacity:</strong> {venue.Capacity || "N/A"}</p>
          <p><strong>🍽️ Price (Veg):</strong> {venue["Price (Veg)"] || "N/A"}</p>
          <p><strong>🛏️ Rooms Available:</strong> {venue.Rooms || "N/A"}</p>
          <p><strong>✨ Features:</strong> {venue.More || "N/A"}</p>
          <p><strong>🧾 Extra Info:</strong> {venue["Extra Info"] || "N/A"}</p>
          <p><strong>📞 Contact:</strong> {venue["Contact Number"] || venue["Contact number"] || "N/A"}</p>
          <p><strong>📖 Details:</strong> {venue.details || "N/A"}</p>
          
        </div>
      ))}
    </div>
  </div>
)}



    </div>
  );
};

export default Venue;
