# Quizzard Frontend

This is the **frontend** for **Quizzard** — an interactive quiz management platform that supports **quiz creation**, **participation**, and **analytics**. Built with **React**, it offers a responsive and secure experience tailored for both **Admins** and **Players**.

---

## Tech Stack

- **Framework**: React
- **UI Library**: Custom CSS
- **Routing**: React Router DOM
- **API Communication**: Axios
- **State Management**: React Hooks & Context API

---

## Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set environment variables**

   Create a `.env` file in the `frontend/` directory:

   ```env
   REACT_APP_BACKEND_URL=Your_Backend_API_URL
   ```

---

## Running the App

To start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

## Available Scripts

| Command         | Description                   |
| --------------- | ----------------------------- |
| `npm start`     | Start the development server  |
| `npm run build` | Build the app for production  |
| `npm test`      | Run tests                     |
| `npm run eject` | Eject the app from CRA config |

---

## Features

- **Authentication** – Secure signup and login with JWT-based session management
- **Role-Based Access** – Different UIs and permissions for Admins and Players
- **Quiz Management** (Admin):
  - Create and manage quizzes with multiple questions
  - View quiz results and player stats
- **Quiz Participation** (Player):
  - Attempt quizzes and view immediate feedback
- **Dashboard Views** – Clean and responsive dashboard for both roles
- **Alerts & Notifications** – Success/error feedback for all actions

---

## Future Enhancements

- **Timed Quizzes**
- **Leaderboard & Ranking System**
- **Email Invites to Join Quizzes**
- **Dark Mode Toggle**
- **Export Quiz Results as CSV or PDF**

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For any queries, feel free to reach out:

- **Author**: Kshitij Agrawal
- **Email**: akshitij70@gmail.com
