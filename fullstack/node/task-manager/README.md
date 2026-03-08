# Task Manager | Full-Stack MERN Application

> A secure, scalable task management system featuring JWT authentication, data isolation, and real-time UI updates.

<!-- [![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](YOUR_LIVE_LINK_HERE) -->
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

## 📖 Overview
This project is a full-stack solution designed to solve the problem of secure, user-specific task management. Unlike simple todo lists, this application ensures **data isolation**, meaning users can only access tasks they created, enforced at both the API and database levels.

## 🚀 Features
- **Secure Authentication:** JWT-based stateless authentication with `bcrypt` password hashing.
- **Protected Routes:** Middleware ensures only authorized users can access private endpoints.
- **Full CRUD Operations:** Create, read, update, and delete tasks with immediate UI feedback.
- **Data Isolation:** Tasks are linked to user IDs; queries are filtered to prevent unauthorized access.
- **Responsive Design:** Built with React and CSS for seamless use across devices.

## 🛠 Tech Stack
| Frontend | Backend | Database | Security |
| :--- | :--- | :--- | :--- |
| React | Node.js | MongoDB | JWT |
| Axios | Express.js | Mongoose | bcrypt |
| React Router | Context API | | |

## 📸 Screenshots
<!-- Consider adding a GIF of the login flow or task creation here -->
![Dashboard](./assets/dashboard.png) 

## ⚙️ Installation & Setup

### Prerequisites
- Node.js
- MongoDB (Local or Atlas)

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-manager.git
    ```
2. **Install dependencies**
   ```bash
   # Backend
   cd server
   npm install

   # Frontend
   cd ../client
   npm install
   ```
3. **Configure Environment Variables**
   Create a `.env` file in the server directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_secret
   PORT=5000
   ```
4. **Run the application**
   ```bash
   # Start backend
   cd server
   npm start

   # Start frontend (new terminal)
   cd client
   npm start
   ```

## 🔌 API Documentation
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/users/register` | Register new user | No |
| `POST` | `/api/users/login` | Login user | No |
| `GET` | `/api/tasks` | Get all user tasks | Yes |
| `POST` | `/api/tasks` | Create new task | Yes |
| `PUT` | `/api/tasks/:id` | Update task | Yes |
| `DELETE` | `/api/tasks/:id` | Delete task | Yes |

## 🤔 Lessons Learned
- **Security:** Implemented middleware to verify JWT tokens before allowing state-changing operations.
- **State Management:** Used React Context API to manage global auth state, avoiding prop drilling.
- **Data Integrity:** Enforced user ownership on tasks at the database query level to prevent IDOR vulnerabilities.

