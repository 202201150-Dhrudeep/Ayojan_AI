# PLANit Project

## Overview
PLANit is a full-stack application built using the MERN (MongoDB, Express, React, Node.js) stack. This project aims to provide a platform for event planning, allowing users to manage and organize their events efficiently.

## Project Structure
The project is divided into two main parts: the backend and the frontend. 

### Backend
- **src/app.js**: Entry point of the backend application. Initializes the Express app, sets up middleware, and connects to the database.
- **src/routes/index.js**: Sets up the API routes for the backend application.
- **src/controllers/index.js**: Contains controller functions that handle the logic for the routes.
- **package.json**: Configuration file for the backend, listing dependencies and scripts.
- **README.md**: Documentation for the backend part of the project.

### Frontend
- **public/index.html**: Main HTML file for the frontend application.
- **src/App.js**: Main component of the React application.
- **src/index.js**: Entry point of the React application.
- **src/components/HeroSection.js**: Displays a hero section with a photo.
- **src/assets/hero-photo.jpg**: Image file used in the hero section.
- **package.json**: Configuration file for the frontend, listing dependencies and scripts.
- **README.md**: Documentation for the frontend part of the project.

## Getting Started
To get started with PLANit, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:
   ```
   cd ../frontend
   npm install
   ```

4. Start the backend server:
   ```
   cd backend
   npm start
   ```

5. Start the frontend application:
   ```
   cd ../frontend
   npm start
   ```

## Features
- User-friendly interface for event planning.
- Responsive design for various devices.
- Integration with a backend API for data management.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.