import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  startTime: Date,
  endTime: Date
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
