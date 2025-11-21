# 🎥 TNDB - The Movie Database

## 📝 Description

TNDB is a full-stack web application designed for managing and exploring a movie database. It allows users to sign up, sign in, browse movies by categories, view movie details, add movies to watchlists and favorites, rate movies, and leave reviews. The application features a user-friendly frontend built with vanilla HTML, CSS, and JavaScript, and a robust backend API powered by Node.js, Express, and MongoDB.

## ✨ Features

- **User Authentication**: Sign up, sign in, logout, and profile management with JWT-based authentication.
- **Movie Management**: Add new movies (admin role required), browse all movies, view detailed movie information.
- **Personal Lists**: Add movies to watchlist and favorites.
- **Categories**: Create and view movie categories.
- **Ratings and Reviews**: Add ratings and reviews for movies.
- **File Uploads**: Upload movie posters and user profile/cover images using Multer.
- **Responsive Design**: Frontend designed to be responsive across devices.

## 🛠️ Tech Stack

### Backend
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.
- **JWT (jsonwebtoken)**: For user authentication.
- **Bcryptjs**: For password hashing.
- **Multer**: For handling file uploads.
- **CORS**: For cross-origin resource sharing.
- **Joi**: For input validation.
- **Body-parser**: For parsing request bodies.
- **HTML-to-text**: For converting HTML to plain text.

### Frontend
- **HTML5**: Markup language for structuring web pages.
- **CSS3**: Styling for responsive and attractive UI.
- **JavaScript (ES6+)**: For dynamic interactions and API calls.
- **Font Awesome**: For icons.

### Development Tools
- **Babel**: For transpiling ES6+ code.
- **Nodemon**: For automatic server restarts during development.

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas account for cloud database)
- **Git** (for cloning the repository)

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd TNDB
   ```

2. **Install backend dependencies**:
   ```bash
   cd TNDB_Back
   npm install
   ```

3. **Install frontend dependencies** (if any, though it's vanilla JS):
   ```bash
   cd ../TNDB_Front
   # No npm install needed for vanilla JS
   ```

## ⚙️ Configuration

1. **Environment Variables**:
   - Create a `.env` file in the `TNDB_Back` directory (if not present).
   - Add the following variables:
     ```
     PORT=3000
     MONGO_URI=mongodb+srv://admin:admin@cluster0.3v7uh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
     JWT_SECRET=your_jwt_secret_here
     ```
   - Note: The MongoDB URI is already configured in `config.js`, but you can override it with environment variables.

2. **Database**:
   - Ensure MongoDB is running locally or update the `MONGO_URI` to point to your MongoDB Atlas cluster.

## ▶️ Running the Application

1. **Start the backend server**:
   ```bash
   cd TNDB_Back
   npm start
   ```
   - The server will run on `http://localhost:3000`.

2. **Open the frontend**:
   - Open `TNDB_Front/index.html` in your web browser.
   - Alternatively, serve the frontend files using a local server (e.g., using Python: `python -m http.server 8000` in `TNDB_Front` directory).

3. **Access the application**:
   - Frontend: `http://localhost:8000` (or directly open HTML files).
   - API Base URL: `http://localhost:3000/api`.

## 🔗 API Endpoints

### User Routes (`/api/user`)
- `POST /signUp`: Register a new user (with profile/cover image upload).
- `POST /signIn`: Authenticate user and return JWT token.
- `POST /signOut`: Logout user (requires authentication).
- `GET /profile`: Get user profile (requires authentication).

### Category Routes (`/api/category`)
- `POST /create`: Create a new category (requires authentication and admin role).
- `GET /all`: Get all categories.

### Movie Routes (`/api/movie`)
- `POST /add`: Add a new movie (requires authentication and admin role, with image upload).
- `GET /all`: Get list of all movies.
- `POST /addToWatchList`: Add movie to user's watchlist (requires authentication).
- `POST /addToFavourites`: Add movie to user's favorites (requires authentication).
- `GET /:id`: Get details of a specific movie by ID.

### Rating Routes (`/api/rating`)
- `POST /add`: Add a rating for a movie (requires authentication).

### Review Routes (`/api/review`)
- `POST /add`: Add a review for a movie (requires authentication).
- `GET /:movieId`: Get reviews for a specific movie.

## 🖥️ Frontend Structure

- `index.html`: Home page with movie grid, search, and categories.
- `login.html`: User login page.
- `signUP.html`: User registration page.
- `profile.html`: User profile page.
- `watchList.html`: User's watchlist.
- `addMovie.html`: Form to add new movies (admin only).
- `movieDetails.html`: Detailed view of a movie.
- `css/`: Stylesheets for different pages.
- `js/`: JavaScript files for API interactions and UI logic.
- `image/`: Static images.

## 🗄️ Database Schema

### Movie Model
- `title`: String
- `director`: String
- `duration`: Number
- `trailer`: String (URL)
- `description`: String
- `coverPicture`: String (file path)
- `category`: ObjectId (reference to Category)
- `outDate`: Date
- `createdAt`: Date

### User Model
- (Assumed based on controllers: username, email, password, profile/cover images, etc.)

### Other Models
- Category, Rating, Review: Similar structures with references to users and movies.

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 🙏 Acknowledgments

- Built with love for movie enthusiasts.
- Icons provided by Font Awesome.
