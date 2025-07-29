# Time Tracking Web App ⏱️

A web-based time tracking app built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can register, manage projects and tasks, track time, and view summaries.

## 🔗 Live Demo

GitHub: https://github.com/abhishektiwary01/time-tracker-app  
Live App: https://time-tracker-app-ten.vercel.app/

## ✨ Features

- User registration and login (JWT authentication)
- Create, edit, and delete projects
- Add and view tasks for each project
- Start/stop timer for each task
- View tracked time per project and task
- Optional: Daily/weekly summaries (WIP)
- Optional: PDF invoice generation (planned)

## 🧱 Tech Stack

Frontend:
- React.js
- Bootstrap 5
- Axios
- React Router DOM

Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

Deployment:
- Frontend: Vercel
- Backend: (self-hosted or Render/Railway etc.)

## 📁 Folder Structure

client/ (React app)  
server/ (Express backend)

## 🚀 How to Run Locally

1. Clone the repo:

git clone https://github.com/abhishektiwary01/time-tracker-app.git

2. Install server dependencies:

cd server  
npm install

3. Create a `.env` file inside `server` folder:

MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
PORT=5000

4. Start backend:

npm run dev

5. Install frontend dependencies:

cd ../client  
npm install

6. Start frontend:

npm start

Then open http://localhost:3000

## 🧪 Upcoming Features

- Weekly/monthly time summary
- PDF invoice generation
- User profile section
- Tags and filters for tasks

## 👨‍💻 Author

Abhishek Tiwari  
GitHub: https://github.com/abhishektiwary01  
LinkedIn: https://www.linkedin.com/in/abhishektiwary01/

## 📃 License

This project is licensed under the MIT License.
