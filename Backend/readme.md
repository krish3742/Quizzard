# Quizzard Backend

This is the backend for the **Quizzard** application — a full-stack MERN platform that enables **quiz creation**, **quiz participation**, and **analytics**. Built with **Node.js**, **Express**, and **MongoDB**, it provides secure and scalable APIs for all quiz and user-related operations.

---

## Features

- **User Authentication**: Signup, and login handling using JWT.
- **Quiz Management**: Create, update, and delete quizzes.
- **Quiz Participation**: Submit answers and fetch quiz results.
- **Result Tracking**: Record and retrieve individual results.
- **Error Handling**: Consistent and informative error responses.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Bcrypt

---

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   Create a `nodemon.json` file in the root directory and configure the following:

   ```env
    "CONNECTION_STRING": MongoDB_Connection_String,
    "PORT": 3002,
    "SECRET_KEY": Secret-Key,
    "USER": Email,
    "PASS": Password,
    "HOST": "smtp.gmail.com",
    "BASE_URL": Frontend_URL,
    "CORS_ORIGIN_URL": Frontend_URL
   ```

3. **Start the server:**

   ```bash
   npm start
   ```

---

## License

This project is open-source and available under the [MIT License](LICENSE).
