// src/pages/NewProject.jsx
import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom'; // to get userId from URL params
import './NewProject.css';
import { useNavigate } from 'react-router-dom'; // to navigate after project creation

const NewProject = () => {
  const navigate = useNavigate();
  const API_URL = process.env.VITE_API_URL || 'http://localhost:5000';
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [prompt, setPrompt] = useState('');
const [submittedData, setSubmittedData] = useState(null);
const [loading, setLoading] = useState(false);
const [response, setResponse] = useState(null);
const [projectId, setProjectId] = useState(null); // to store the project ID after saving
const userId=useParams().userId; // assuming you have userId in the URL params
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);        // show loading spinner or message
  setResponse(null);  
  const projectData = {
    title,  
    startDate,
    endDate,
    location,
    budget,
    prompt,
    
  };

  console.log("Sending to API:", projectData);

  try{
    const res1 = await fetch(`${API_URL}/api/projects/create/${userId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( projectData),
});
console.log("response",res1)
    // const res1 = await axios.post(`${API_URL}/api/projects/create/${userId}`, projectData);
const data1 = await res1.json();
console.log("Saved to DB:", data1);

setProjectId(data1.projectId);
navigate(`/venue/${data1.projectId}`); // redirect to dashboard after saving
//     const res=await axios.post(`${API_URL}/api/generate-plan`, projectData);
//     const data = res.data;
//     console.log(data)
// setResponse(data); // set the "API" response
//     setSubmittedData(data); // store submitted data for display (optional)
  }catch(error)
  {
    console.error("API call failed:", error);
    setResponse({
      message: "❌ Failed to generate plan. Please try again.",
      plan: "",
      ideas: []
    });

  }
  
    setLoading(false); // stop loading
  // setSubmittedData(projectData); // <-- for now, display it instead of sending to API
};


  return (
    <div className="new-project">
      <h2>✨ Create a New Project</h2>
      <form className="project-form" onSubmit={handleSubmit}>
        <label>Project Title</label>
        <input
          type="text"
          placeholder="e.g. Riya & Aman Wedding"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* <div className="date-row"> */}
  {/* <div className="form-group"> */}
    <label>Start Date</label>
    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      required
    />
  {/* </div> */}
  {/* <div className="form-group"> */}
    <label>End Date</label>
    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      required
    />
  {/* </div> */}
{/* </div> */}


        <label>Event Location</label>
        <input
          type="text"
          placeholder="e.g. Jaipur, Rajasthan"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label>Tentative Budget (in INR)</label>
        <input
          type="number"
          placeholder="e.g. 500000"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <label>Your Event Vision (optional)</label>
        <textarea
          placeholder="Tell us about your vision... e.g., A royal wedding with traditional decor and folk music"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={5}
        />

        <button type="submit"> Create Project</button>
      </form>
      {loading && (
  <div className="loading-message">⏳ Generating your event plan...</div>
)}

{response && (
  <div className="submitted-preview">
    <h3>📋 Generated Plan</h3>

    {/* If your API returns message as text, show it normally */}
    {response.message && typeof response.message === 'string' && (
      <p>{response.message}</p>
    )}

    {/* Render the main plan text from the API response */}
    
    {response.plan?.parts?.[0]?.text && (
  <div className="plan-markdown">
    <ReactMarkdown>
      {response.plan.parts[0].text}
    </ReactMarkdown>
  </div>
)}


    {/* If ideas are present and in array format */}
    {Array.isArray(response.ideas) && response.ideas.length > 0 && (
      <ul>
        {response.ideas.map((idea, index) => (
          <li key={index}>✅ {idea}</li>
        ))}
      </ul>
    )}
  </div>
)}



    </div>
  );
};

export default NewProject;
