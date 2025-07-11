// backend/src/controllers/index.js
const getHomePage = (req, res) => {
  res.send("Welcome to the homepage");
};

module.exports = {
  getHomePage,
};
