const express =require( 'express');
const Project = require('../models/Project.js');
const projectcontroller= require('../controllers/projectController.js');
const router = express.Router();
const auth=require('../middlewares/auth.js');
router.get('/fetchprojects/:userId',auth,projectcontroller.fetchprojects)

router.post('/create/:userId',auth, projectcontroller.create);
router.post('/:id',auth, async (req, res) => {
  try {
    console.log("arrived")
    const project = await Project.findById(req.params.id);
    console.log("Project found:", project);
  res.status(200).json({project});
  } catch (err) {
    console.error("Error saving project:", err);
    res.status(500).json({ message: "Failed to save project" });
  }
});

module.exports = router;
