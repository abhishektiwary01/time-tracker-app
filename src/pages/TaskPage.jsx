import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskPage = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '' });
  const [timerTaskId, setTimerTaskId] = useState(null);
  const [manualTime, setManualTime] = useState({ taskId: '', startTime: '', endTime: '' });

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

  const handleAddTask = async () => {
    if (!newTask.name) return alert('Task name is required');
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', {
        ...newTask,
        projectId
      });
      setTasks([...tasks, res.data]);
      setNewTask({ name: '', description: '' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleStart = async (id) => {
    if (timerTaskId && timerTaskId !== id) {
      alert('Only one timer can run at a time');
      return;
    }
    try {
      const res = await axios.patch(`http://localhost:5000/api/tasks/${id}/start`);
      setTasks(tasks.map(task => task._id === id ? res.data : task));
      setTimerTaskId(id);
    } catch (error) {
      console.error('Error starting timer:', error);
    }
  };

  const handleEnd = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/tasks/${id}/end`);
      setTasks(tasks.map(task => task._id === id ? res.data : task));
      setTimerTaskId(null);
    } catch (error) {
      console.error('Error ending timer:', error);
    }
  };

  const handleManualLog = async () => {
    const { taskId, startTime, endTime } = manualTime;
    if (!taskId || !startTime || !endTime) return alert('All manual time fields are required');

    try {
      const res = await axios.post(`http://localhost:5000/api/timelogs`, {
        taskId,
        startTime,
        endTime
      });
      alert('Time log added');
      setManualTime({ taskId: '', startTime: '', endTime: '' });
    } catch (error) {
      console.error('Error logging time manually:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Tasks for Project</h3>

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
        <div className="col-md-3">
          <button className="btn btn-primary w-100" onClick={handleAddTask}>
            Add Task
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h5>Manual Time Entry</h5>
        <div className="row g-2">
          <div className="col-md-3">
            <select
              className="form-control"
              value={manualTime.taskId}
              onChange={(e) => setManualTime({ ...manualTime, taskId: e.target.value })}
            >
              <option value="">Select Task</option>
              {tasks.map((task) => (
                <option key={task._id} value={task._id}>{task.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="datetime-local"
              className="form-control"
              value={manualTime.startTime}
              onChange={(e) => setManualTime({ ...manualTime, startTime: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="datetime-local"
              className="form-control"
              value={manualTime.endTime}
              onChange={(e) => setManualTime({ ...manualTime, endTime: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-secondary w-100" onClick={handleManualLog}>Log Time</button>
          </div>
        </div>
      </div>

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
                <div className="d-flex gap-2">
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