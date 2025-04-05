# Quizzard

**Quizzard** is a full-stack **MERN** application built with **TypeScript** that provides a dynamic platform for creating, managing, and participating in quizzes. With secure authentication, and real-time analytics, Quizzard is designed for both quiz creators and quiz participants to engage in an interactive and seamless quiz experience.

**Live Website**: [Quizzard](https://quizzard-acwk.onrender.com/)

---

## Features

### Frontend

- **User Roles**:
  - **Admin**: Create, update, delete quizzes, view analytics, and manage participants.
  - **Player**: Join quizzes, submit answers, and view results.
- **Authentication**:
  - JWT-based login & signup for secure session handling.
  - Role-based redirection and protected routes.
- **Quiz Interface**:
  - Multiple-choice question handling.
  - Real-time feedback after submission.
- **Admin Dashboard**:
  - Create quizzes with multiple questions and options.
  - View quiz results and analytics.
  - Manage existing quizzes.
- **Responsive UI**: Built with a clean and responsive layout to support all devices.

### Backend

- **User Management**: Secure user registration and login using JWT and bcrypt.
- **Quiz CRUD Operations**: Admins can perform all operations on quizzes and questions.
- **Quiz Participation**: Players can take quizzes and submit answers.
- **Analytics**: View results and performance of players.
- **RESTful API**: Structured endpoints for all operations.

---

## Tech Stack

### Frontend

- **React.js** (with TypeScript)
- **Custom CSS**
- **Axios**
- **React Router**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** & **bcrypt** for authentication
- **TypeScript** for type safety

---

## Installation & Setup

### Prerequisites

- **Node.js** (v14 or above)
- **MongoDB** (Local or Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/krish3742/Quizzard.git
```

---

### 2. Backend Setup

1. Go to the backend folder:

   ```bash
   cd .\Backend\
   ```

2. Follow the instructions in the `README.md` file inside the `backend` folder for further setup.

### 3. Frontend Setup

1. Go to the frontend folder:

   ```bash
   cd .\Frontend\
   ```

2. Follow the instructions in the `README.md` file inside the `frontend` folder for further setup.

---

## Folder Structure

```
Quizzard/
├── Backend/
│   ├── controllers/
|   ├── helper/
│   ├── middleware/
│   ├── models/
│   ├── routes/
|   ├── utils/
│   └── app.js
|
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── index.js
|   |   └── App.js
```

---

## Future Enhancements

- **Quiz Timer**: Auto-submit after timeout.
- **Leaderboard**: Global or per-quiz rankings.
- **Email Invitations**: Invite users to quizzes.
- **Export Results**: Download quiz results as CSV or PDF.

---

## License

This project is licensed under the **MIT License**.

---

## Contact

- **Author**: Kshitij Agrawal
- **Email**: akshitij70@gmail.com
- **GitHub**: [@krish3742](https://github.com/krish3742)
