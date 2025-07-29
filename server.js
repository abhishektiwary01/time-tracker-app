// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import projectRoutes from './src/backend/routes/ProjectRoutes.js';
import taskRoutes from './src/backend/routes/taskRoutes.js';
import authRoutes from './src/backend/routes/authRoutes.js'; // ✅ User login/register routes

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas URI
const MONGODB_URI = 'mongodb+srv://abhishek:Abhi123@time-tracker-cluster.dkzjkqj.mongodb.net/time-tracker?retryWrites=true&w=majority&appName=Time-Tracker-Cluster';

// ✅ MongoDB Connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.use('/api/auth', authRoutes);         // Auth (register/login)
app.use('/api/projects', projectRoutes);  // Projects CRUD
app.use('/api/tasks', taskRoutes);        // Tasks CRUD + time logs

// ✅ Server Listen
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
