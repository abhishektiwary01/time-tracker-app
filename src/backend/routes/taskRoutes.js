// routes/taskRoutes.js or backend/routes/TaskRoutes.js

import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// ✅ Get all tasks (OPTIONAL: filter by projectId if you want)
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find(); // no projectId filter
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
});

// ✅ Get tasks by project (optional route if you want project-wise filtering)
router.get('/project/:projectId', async (req, res) => {
  const { projectId } = req.params;
  try {
    const tasks = await Task.find({ projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching project tasks' });
  }
});

// ✅ Create a new task (no projectId required)
router.post('/', async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Task name is required' });
  }

  try {
    const task = new Task({ name, description });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Server error while creating task' });
  }
});

// ✅ Start a task timer
router.patch('/:id/start', async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { startTime: new Date() },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error while starting timer' });
  }
});

// ✅ End a task timer
router.patch('/:id/end', async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { endTime: new Date() },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error while ending timer' });
  }
});

export default router;
