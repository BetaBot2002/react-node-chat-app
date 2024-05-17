# NewSpeak - Real-Time Chat App

NewSpeak is a real-time chat application built with React, Chakra UI, Node.js, Socket.io, and MongoDB.

## Table of Contents

- [NewSpeak - Real-Time Chat App](#newspeak---real-time-chat-app)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Setup](#setup)
    - [Environment Variables](#environment-variables)
      - [Backend](#backend)
      - [Frontend](#frontend)
  - [Running the Application](#running-the-application)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)

## Prerequisites

Ensure you have the following installed on your local development environment:

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB Atlas account (or local MongoDB instance)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/BetaBot2002/react-node-chat-app.git
cd react-node-chat-app
```

2. Install backend dependencies:

```bash
cd Backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../Frontend
npm install
```

## Setup

### Environment Variables

#### Backend

Create a `.env` file in the `Backend` directory with the following content:

```
DATABASE_URL="your_mongodb_connection_string"
PORT="your_port_number"
ACCESS_TOKEN_SECRET="your_access_token_secret"
REFRESH_TOKEN_SECRET="your_refresh_token_secret"
ENCRYPTION_SALT="your_encryption_salt"
```

#### Frontend

Create a `.env` file in the `Frontend` directory with the following content:

```
VITE_APP_CLOUDINARY_UPLOAD_PRESET="your_cloudinary_upload_preset"
VITE_APP_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
VITE_APP_CLOUDINARY_API_BASE_URL_IMAGE="your_cloudinary_api_base_url"
VITE_APP_BACKEND_API="http://127.0.0.1:3001"
```

## Running the Application

### Backend

1. Navigate to the `Backend` directory:

```bash
cd Backend
```

2. Start the backend server:

```bash
npm run hotload
```

The backend server should now be running on `http://localhost:3001`.

### Frontend

1. Navigate to the `Frontend` directory:

```bash
cd ../Frontend
```

2. Start the frontend development server:

```bash
npm run dev
```

The frontend application should now be running on `http://localhost:5173`.

## Project Structure

```
react-node-chat-app/
├── Backend/
│   ├── Controllers/
│   ├── Database/
│   ├── Helpers/
│   ├── Middlewares/
│   ├── prisma/
│   ├── Routes/
│   ├── Utilities/
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   ├── vercel.json
├── Frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── vercel.json
│   ├── vite.config.js
├── .gitignore
├── LICENSE.md
├── README.md
```

## Contributing

Feel free to fork this repository and submit pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---