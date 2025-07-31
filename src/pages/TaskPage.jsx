import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskPage = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [timerTaskId, setTimerTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/project/${projectId}`);
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddOrUpdateTask = async () => {
    if (!newTask.name) return alert('Task name is required');

    try {
      if (editingId) {
        const res = await axios.put(`http://localhost:5000/api/tasks/${editingId}`, {
          ...newTask,
          projectId
        });
        setTasks(tasks.map(task => (task._id === editingId ? res.data : task)));
        setEditingId(null);
      } else {
        const res = await axios.post('http://localhost:5000/api/tasks', {
          ...newTask,
          projectId
        });
        setTasks([...tasks, res.data]);
      }

      setNewTask({ name: '', description: '' });
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleEditTask = (task) => {
    setNewTask({ name: task.name, description: task.description || '' });
    setEditingId(task._id);
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCancelEdit = () => {
    setNewTask({ name: '', description: '' });
    setEditingId(null);
  };

  const handleStart = async (id) => {
    if (timerTaskId && timerTaskId !== id) {
      alert('Only one timer can run at a time');
      return;
    }
    try {
      const res = await axios.patch(`http://localhost:5000/api/tasks/${id}/start`);
      setTasks(tasks.map(task => (task._id === id ? res.data : task)));
      setTimerTaskId(id);
    } catch (error) {
      console.error('Error starting timer:', error);
    }
  };

  const handleEnd = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/tasks/${id}/end`);
      setTasks(tasks.map(task => (task._id === id ? res.data : task)));
      setTimerTaskId(null);
    } catch (error) {
      console.error('Error ending timer:', error);
    }
  };

  const handleAddDuration = (taskId) => {
    // You can replace this alert with a modal or prompt to enter duration
    alert(`Add manual duration for task ID: ${taskId}`);
  };

  return (
    <div className="container mt-4">
      <h3>Tasks for Project</h3>

      {/* Add / Edit Task */}
      <div className="row g-2 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Task Name"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Description (optional)"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
        </div>
        <div className="col-md-3 d-flex gap-2">
          <button className="btn btn-primary w-100" onClick={handleAddOrUpdateTask}>
            {editingId ? 'Update Task' : 'Add Task'}
          </button>
          {editingId && (
            <button className="btn btn-secondary w-100" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Task Cards */}
      <div className="row">
        {tasks.map((task) => (
          <div key={task._id} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{task.name}</h5>
                <p className="card-text">{task.description || 'No description'}</p>
                <p className="card-text">
                  <strong>Start:</strong> {task.startTime ? new Date(task.startTime).toLocaleString() : 'Not started'}<br />
                  <strong>End:</strong> {task.endTime ? new Date(task.endTime).toLocaleString() : 'Not ended'}
                </p>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => handleStart(task._id)}
                    disabled={timerTaskId && timerTaskId !== task._id}
                  >
                    Start
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleEnd(task._id)}
                    disabled={task._id !== timerTaskId}
                  >
                    End
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleAddDuration(task._id)}
                  >
                    Add Duration
                  </button>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-warning" onClick={() => handleEditTask(task)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteTask(task._id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
