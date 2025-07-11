const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  startDate: String,
  endDate: String,
  location: String,
  budget: Number,
  prompt: String,
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // must match your User model name
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Projects', ProjectSchema);
// export default mongoose.model('Project', ProjectSchema);
