import React, { useState } from 'react';
// import './Body.css'; 

const Body = () => {
  const [view, setView] = useState('weekly');

  const recentEntries = [
    { day: 'Monday', project: 'Project A', task: 'Task 1', time: '2h 10m' },
    { day: 'Monday', project: 'Project B', task: 'Task 2', time: '1h 30m' },
    { day: 'Tuesday', project: 'Project B', task: 'Task 2', time: '2h 5m' },
    // Add more entries as needed
  ];

  const totalByProject = {
    'Project A': '6h 30m',
    'Project B': '7h 10m',
  };

  const totalByTask = {
    'Task 1': '4h 0m',
    'Task 2': '9h 40m',
  };

  const todayTotal = '3h 15m';
  const weekTotal = '13h 25m';

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>

      <div className="mb-3 d-flex justify-content-between">
        <div>
          <strong>Today's Total:</strong> {todayTotal}
        </div>
        <div>
          <strong>Week's Total:</strong> {weekTotal}
        </div>
      </div>

      <div className="mb-4 row">
        <div className="col-md-6">
          <h5>Totals by Project</h5>
          <ul className="list-group">
            {Object.entries(totalByProject).map(([project, time], index) => (
              <li key={index} className="list-group-item d-flex justify-content-between">
                <span>{project}</span>
                <span>{time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          <h5>Totals by Task</h5>
          <ul className="list-group">
            {Object.entries(totalByTask).map(([task, time], index) => (
              <li key={index} className="list-group-item d-flex justify-content-between">
                <span>{task}</span>
                <span>{time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-4">
        <h5>Recent Entries</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Day</th>
              <th>Project</th>
              <th>Task</th>
              <th>Total Time Tracked</th>
            </tr>
          </thead>
          <tbody>
            {recentEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.day}</td>
                <td>{entry.project}</td>
                <td>{entry.task}</td>
                <td>{entry.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5>Summary View</h5>
          <div>
            <button
              className={`btn btn-sm me-2 ${view === 'daily' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setView('daily')}
            >
              Daily
            </button>
            <button
              className={`btn btn-sm ${view === 'weekly' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setView('weekly')}
            >
              Weekly
            </button>
          </div>
        </div>

        {view === 'weekly' ? (
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Day</th>
                <th>Project</th>
                <th>Task</th>
                <th>Total Time</th>
              </tr>
            </thead>
            <tbody>
              {recentEntries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.day}</td>
                  <td>{entry.project}</td>
                  <td>{entry.task}</td>
                  <td>{entry.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-info">Daily summary view coming soon...</div>
        )}
      </div>
    </div>
  );
};

export default Body;
