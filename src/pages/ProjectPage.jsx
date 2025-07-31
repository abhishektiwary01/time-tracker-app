import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar.jsx';
import { useNavigate } from 'react-router-dom';

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects');
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAddProject = async () => {
    if (!newProject.name) return alert('Project name is required');

    try {
      const response = await axios.post('http://localhost:5000/api/projects', newProject);
      setProjects([...projects, response.data]);
      setNewProject({ name: '', description: '' });
    } catch (err) {
      console.error('Error adding project:', err);
      alert(err.response?.data?.message || 'Failed to add project');
    }
  };

  const handleUpdateProject = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/projects/${editingId}`, newProject);
      setProjects(projects.map((proj) => (proj._id === editingId ? response.data : proj)));
      setNewProject({ name: '', description: '' });
      setEditingId(null);
    } catch (err) {
      console.error('Error updating project:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      setProjects(projects.filter((proj) => proj._id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  const handleEdit = (project) => {
    setNewProject({ name: project.name, description: project.description });
    setEditingId(project._id);
  };

  const handleCancelEdit = () => {
    setNewProject({ name: '', description: '' });
    setEditingId(null);
  };

  const handleNavigateToTasks = (projectId) => {
    navigate(`/projects/${projectId}/tasks`);
  };

  return (
    <>
      <div className="bg-primary text-white text-center py-3">
        <h1 className="m-0">Time Tracking App</h1>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 bg-light min-vh-100 p-3">
            <Navbar />
          </div>

          <div className="col-md-9 col-lg-10 p-4">
            <h2 className="mb-4">Projects</h2>

            <div className="mb-4">
              <h5>{editingId ? 'Edit Project' : 'Add New Project'}</h5>
              <div className="row g-2">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Project Name"
                    value={newProject.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="Description"
                    value={newProject.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-3 d-flex gap-2">
                  <button
                    className={`btn ${editingId ? 'btn-success' : 'btn-primary'} w-100`}
                    onClick={editingId ? handleUpdateProject : handleAddProject}
                  >
                    {editingId ? 'Update Project' : 'Add Project'}
                  </button>
                  {editingId && (
                    <button className="btn btn-secondary w-100" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h5>All Projects</h5>
              {projects.length === 0 ? (
                <p className="text-muted">No projects found. Add a new one above.</p>
              ) : (
                <ul className="list-group">
                  {projects.map((project) => (
                    <li
                      key={project._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div style={{ cursor: 'pointer' }} onClick={() => handleNavigateToTasks(project._id)}>
                        <strong className="text-primary">{project.name}</strong>
                        <br />
                        <small>{project.description}</small>
                      </div>
                      <div className="btn-group">
                        <button className="btn btn-sm btn-warning" onClick={() => handleEdit(project)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(project._id)}>
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
