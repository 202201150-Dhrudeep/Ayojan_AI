const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const cors= require('cors');
const projectRoutes = require('./routes/projectRoutes.js');
const authRoutes = require('./routes/authroutes.js');
const cookieParser = require('cookie-parser');
const auth=require('./middlewares/auth.js'); // Assuming you have an auth middleware for authentication
const ragRoute =require('./routes/ragRoutes.js');
const pythonRoute = require('./routes/pythonRoute');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',  // frontend URL
  credentials: true                 // allow cookies
})); // Enable CORS for all routes
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', routes());
app.use('/api/projects',projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/rag', ragRoute);
app.use('/api/python', pythonRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});