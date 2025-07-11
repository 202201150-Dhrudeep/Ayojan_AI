const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Project = require('../models/Project.js');

const JWT_SECRET = process.env.JWT_SECRET ;

exports.create=async (req, res) => {
  console.log("WELCOME")
  const userId = req.user.id;
  console.log(userId)
  console.log("Body",req.body)
  try {
    const project = new Project({...req.body, user: userId});
    await project.save();

    await User.findByIdAndUpdate(userId,{
        $push: { projects: project._id }
        }, {
        new: true,
       
    })
    // await User.findByIdAndUpdate(
    //   userId,
    //   { $push: { projects: project._id } },
    //   { new: true } // return updated doc (optional)
    // );
    console.log('Project saved:',project._id);
    res.status(201).json({ message: "Project saved successfully", projectId: project._id });
  } catch (err) {
    console.error("Error saving project:", err);
    res.status(500).json({ message: "Failed to save project" });
  }
};

exports.fetchprojects = async (req, res) => {
    try{
        const userId = req.params.userId // Get the user ID from the authenticated request
        // console.log("Fetching projects for user:", userId);
        const projects = await User.findById(userId).populate('projects')
        // console.log(projects)
        // console.log("Projects fetched:", projects);
        res.status(200).json({projects});
    }
    catch(err)
    {
        // console.error("Error fetching projects:", err);
        res.status(500).json({ message: "Failed to fetch projects" });
    }

};