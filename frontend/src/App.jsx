import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewProject from './pages/NewProject';
import LandingPage from './pages/LandingPage';
import Venue from './pages/Venue';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Ceremony from './pages/Ceremony';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes (inside Layout) */}
        <Route element={<Layout />}>
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/new-project/:userId" element={<NewProject />} />
          <Route path="/venue/:projectId" element={<Venue />} />
          <Route path="/ceremony/:projectId" element={<Ceremony />} />
          {/* Add more child routes as needed */}
        </Route>
      </Routes>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
