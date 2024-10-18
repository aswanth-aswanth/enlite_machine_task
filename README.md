# enlite 

## Overview
This project is a web application built with a React.js frontend (using Vite) and a Node.js backend. The application is designed to perform basic crud using mern stack.

## Table of Contents
- [Getting Started\](\#getting-started)
  - [Prerequisites\](\#prerequisites)
  - [Installation\](\#installation)
  - [Running the Application\](\#running-the-application)
  - [Environment Variables\](\#environment-variables)
  - [Accessing the Deployed Version\](#accessing-the-deployed-version)
- [Contributing\](\#contributing)
- [License\](\#license)

## Getting Started

### Prerequisites
Make sure you have the following software installed on your machine:
- **Node.js** (v20 or higher)
- **npm**
- **MongoDB** (local installation or use MongoDB Atlas for cloud-hosted database)

### Installation

1. **Clone the repository**
   
   git clone https://github.com/aswanth-aswanth/enlite_machine_task.git
   cd enlite_machine_task
   
2. **Install dependencies**

   
   # Frontend
   cd frontend
   npm install

   \# Backend
   cd ../backend
   npm install

## Running the Application

## Backend
### Set up environment variables
Create a \`.env\` file in the \`backend\` directory with the following content:

```text
JWT_SECRET=secret
PORT=3000
MONGO_URI=mongodb://localhost:27017/your-database-name
```

### Start the backend server
```bash
npm run dev
```

The backend server should now be running at \`http://localhost:3000\`.

## Frontend
### Set up environment variables
Create a \`.env\` file in the \`frontend\` directory with the following content:

```text
VITE_API_BASE_URL=http://localhost:5000
```

### Start the frontend development server
```bash
npm run dev
```

The frontend should now be running at \`http://localhost:5173\`.

# Environment Variables

## Backend
- **JWT_SECRET**: Secret key for JWT authentication.
- **PORT**: Port number where the backend server will run.
- **MONGO_URI**: MongoDB connection string. Example for local MongoDB: \`mongodb://localhost:27017/your-database-name\`.


## Accessing the Deployed Version
If you have deployed this application, you can access it at \`your-deployment-url\`. Ensure that the environment variables for both frontend and backend are correctly configured for production. For instance:

## Backend \`.env\`:
```text
PORT=3000
JWT_SECRET=your-secret
MONGO_URI=mongodb+srv://\<username\>:\<password\>@cluster0.mongodb.net/your-database-name?retryWrites=true&w=majority
```


# License
This project is licensed under the MIT License. See the \[LICENSE\](LICENSE) file for more details.