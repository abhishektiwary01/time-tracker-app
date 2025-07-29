// src/backend/routes/ProjectRoutes.js
import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// ✅ GET all projects (no auth)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ POST new project (no auth)
router.post('/', async (req, res) => {
  const { name, description } = req.body;

  if (!name) return res.status(400).json({ message: 'Project name is required' });

  try {
    const newProject = new Project({ name, description });
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted', project: deleted });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ PUT
router.put('/:id', async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required' });
  }

  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
