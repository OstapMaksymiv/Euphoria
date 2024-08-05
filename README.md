# Euphoria

Euphoria is a web application built using JavaScript, EJS, and Express. The application is designed to provide a seamless user experience with dynamic content rendering and various features powered by modern web technologies.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Directory Structure](#directory-structure)
- [Features](#features)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/euphoria.git
2. Navigate to the project directory:

   ```bash
   cd euphoria
3. Install the dependencies:

   ```bash
   npm install
4. Create a .env file in the root directory and add the necessary environment variables:

  ```bash
  MONGODB_URI=<your_mongodb_connection_string>
  SESSION_SECRET=<your_session_secret>
  AWS_ACCESS_KEY_ID=<your_aws_access_key_id>
  AWS_SECRET_ACCESS_KEY=<your_aws_secret_access_key>
   ```

# Usage
## Running the application
To start the application in development mode with Nodemon:
```
npm run dev
```
To start the application in production mode:
```
npm start
```
# Directory Structure
euphoria/

── public/ # Static files (CSS, JS, images)
── routes/ # Express routes
── admin.js
 ── index.js
 ── user.js
── views/ # EJS templates
 ── layouts/
 ── partials/
 ── admin/
 ── index.ejs
 ── ...
── .env # Environment variables
── app.js # Main application file
── package.json # NPM dependencies and scripts
── README.md # Project documentation

# Features
- **User Authentication**: Secure user authentication with JWT and bcrypt.
- **Image Uploads**: Image uploads handled with Multer and stored on AWS S3.
- **Dynamic Content Rendering**: EJS templates for dynamic content rendering.
- **Session Management**: Session management with express-session and connect-mongo.
- **Responsive Design**: Responsive design with Swiper and animate.css.
- **Database**: MongoDB for data storage, accessed via Mongoose.

## Dependencies
- `@splidejs/splide`
- `animate.css`
- `aws-sdk`
- `axios`
- `bcrypt`
- `connect-mongo`
- `cookie-parser`
- `dotenv`
- `ejs`
- `express`
- `express-ejs-layouts`
- `express-session`
- `jsonwebtoken`
- `method-override`
- `mongoose`
- `multer`
- `multer-s3`
- `scrollreveal`
- `sharp`
- `swiper`
- `nodemon`

## Contributing
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

