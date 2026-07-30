# 💬 Chatty – Real-Time MERN Chat Application

Chatty is a real-time chat application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with **Socket.io** for instant messaging, **Cloudinary** for file storage, and **Zustand** for efficient state management.  
It allows users to exchange messages, share images and files (up to 10MB), delete messages, and enjoy a persistent chat experience that never resets between sessions.

---

## 🚀 Features

- ⚡ **Real-Time Messaging** using **Socket.io**  
- 🗂️ **File Uploads up to 10MB** with **Multer + Cloudinary**  
- 💾 **Persistent Storage** — chats and messages remain saved  
- 🧹 **No Message Duplication** — prevents repeated messages during sync  
- 🧑‍🤝‍🧑 **Secure Authentication** using **bcrypt.js** and JWT  
- 🗑️ **Delete Messages** easily from any chat  
- 🖼️ **Send Emojis and Images** (under 10MB)  
- 🎨 **Responsive UI** built with **DaisyUI** & **Lucide React Icons**  
- 🧠 **State Management** with **Zustand** for clean, minimal global state handling  

---

## 🧠 Project Overview

Chatty aims to deliver a smooth, secure, and visually pleasing chat experience inspired by popular messaging apps like WhatsApp and Discord.  
It’s optimized for speed, file handling, and state persistence — making it a great foundation for scalable, modern real-time communication apps.

---

## 🛠️ Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js, DaisyUI (TailwindCSS), Zustand, Lucide React |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **Real-time Communication** | Socket.io |
| **Media Storage** | Cloudinary |
| **File Handling** | Multer |
| **Authentication** | bcrypt.js, JWT |
| **Environment Variables** | dotenv |

---

## 📦 Dependencies and Their Purpose

| Dependency | Description |
|-------------|-------------|
| **express** | Web framework for handling routes, middleware, and APIs |
| **mongoose** | ODM library to interact with MongoDB |
| **socket.io** | Enables real-time, bidirectional communication between users |
| **cloudinary** | Cloud-based media storage for uploaded images and files |
| **multer** | Middleware for handling file uploads in Node.js |
| **bcryptjs** | Hashes and verifies passwords securely |
| **jsonwebtoken** | Used for authenticating users with JWT tokens |
| **dotenv** | Loads environment variables from `.env` |
| **cors** | Enables cross-origin resource sharing |
| **axios** | Used for API requests between frontend and backend |
| **zustand** | Lightweight and fast global state management for React |
| **daisyui** | TailwindCSS component library for modern, responsive UI elements |
| **lucide-react** | Icon library offering customizable and elegant vector icons |
| **tailwindcss** | Utility-first CSS framework for styling the frontend |

---

## ⚙️ Installation and Setup

To run Chatty locally:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/chatty.git

# 2️⃣ Navigate into the project directory
cd chatty

# 3️⃣ Navigate to the server directory
cd server

# 4️⃣ Install dependencies
npm install

# 5️⃣ Create a .env file and add the following variables
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000

# 6️⃣ Start the backend
npm run dev

# 7️⃣ Navigate to the client folder
cd ../client

# 8️⃣ Install dependencies
npm install

# 9️⃣ Run the frontend
npm run dev
