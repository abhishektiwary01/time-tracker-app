import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// ✅ Get tasks for a project
router.get('/project/:projectId', async (req, res) => {
  const { projectId } = req.params;
  const tasks = await Task.find({ projectId });
  res.json(tasks);
});

// ✅ Create a new task
router.post('/', async (req, res) => {
  const { projectId, title, description } = req.body;
  if (!projectId || !title) {
    return res.status(400).json({ message: 'projectId and title are required.' });
  }

  const newTask = new Task({ projectId, title, description });
  const savedTask = await newTask.save();
  res.status(201).json(savedTask);
});

// ✅ Start a task
router.patch('/:id/start', async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, { startTime: new Date() }, { new: true });
  res.json(updated);
});

// ✅ End a task
router.patch('/:id/end', async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, { endTime: new Date() }, { new: true });
  res.json(updated);
});

export default router;
