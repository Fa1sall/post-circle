# 💬 Post Circle

**Post Circle** is a simple posting web application built with **Node.js**, **Express**, **EJS**, and **PostgreSQL**, allowing users to sign up, log in, create posts, and view community posts in a clean and minimal UI. It demonstrates session-based authentication, role-based access, and conditional content rendering - where only logged-in users can see the author and timestamp of posts, while visitors can only view anonymous posts.

## ✨ Features

- Home Page with a posts feed
- User **Sign Up** / **Login** with session-based authentication
- **Create Post** page for logged-in users
- Authentication & authorization using Passport.js
- **Admin** role for message deletion
- Responsive and clean UI built with Tailwind CSS

## 🖼️ Screenshots

## 🏠 Home Page

![Home Page](public/screenshots/home.png)

## 🔐 Login Page

![Login Page](public/screenshots/login.png)

## 🔐 Signup Page

![Signup Page](public/screenshots/signup.png)

## 📰 Posts Page

![Posts Page](public/screenshots/posts.png)

## 📝 Create Post Page

![Create Post Page](public/screenshots/createpost.png)

## 🧰 Tech Stack

### Backend

- Node.js
- Express.js

### Frontend

- EJS templating engine
- TailwindCSS

### Database

- PostgreSQL

### Authentication & Session Management

- Passport.js
- express-session

## 📁 Project Structure

```
PostCircle/
├── app.js                  # Main server file
├── config/                 # Config files
│   ├── database.js
│   └── passport.js
├── controllers/            # Route logic
│   ├── authController.js
│   └── postController.js
├── db/
│   ├── initDB.js           # DB initialization script
│   └── schema.sql          # DB schema
├── middlewares/
│   ├── admin.js
│   ├── auth.js
│   └── validation.js
├── models/                 # Data models
│   ├── posts.js
│   └── users.js
├── public/                 # Static assets
│   ├── images/
│   └── styles/
├── routes/                 # Routes
│   ├── auth.js
│   ├── index.js
│   └── post.js
├── utils/                  # Bcrypt Password utils
│   └── password.js
├── views/                  # EJS templates
│   ├── auth/
│   ├── posts/
│   ├── index.ejs
│   └── error.ejs
└── package.json
```

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/Fa1sall/post-circle.git
cd PostCircle
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a .env file

```bash
DATABASE_URL="postgresql://username:password@host:port/database_name"
SECRET="your-session-secret"
```

Replace username, password, host, port, and database_name with your PostgreSQL credentials.

### 4. Initialize the database

```bash
node db/initDB.js
```

### 5. Start the development server

```bash
npm start
```

## 📄 Attributions

- **Background Patterns:** Background patterns are designed using [PatternsCraft](https://patterncraft.fun/), a free pattern generator tool.

## 📢 Future Enhancements

- 🔐 OAuth login (Google / GitHub)

- 💬 Comments & likes

- 🕒 User timezone-based timestamp rendering

- 🧭 Profile pages
