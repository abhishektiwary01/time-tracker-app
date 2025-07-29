// models/Task.js
import mongoose from 'mongoose';
// models/Task.js
const taskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  name: { type: String, required: true }, // <- changed from title to name
  description: String,
  startTime: Date,
  endTime: Date,
});

export default mongoose.model('Task', taskSchema);
