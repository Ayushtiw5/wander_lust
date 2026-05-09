# WanderLust - travel discovery platform

A full-stack web application that connects travelers with unique accommodations worldwide. Inspired by Airbnb, WanderLust allows users to browse, create, and review property listings with a seamless and responsive user experience.

![WanderLust Banner](https://your-image-url.com/banner.jpg)

🌟 Features

- **User Authentication & Authorization**
  - Secure signup and login using Passport.js
  - Password hashing and session management
  - Role-based access control

- **Property Listings Management**
  - Create, read, update, and delete listings (CRUD operations)
  - 11 property categories (Trending, Rooms, Mountains, Iconic Cities, Castles, Amazing Pools, Camping, Farms, Arctic, Domes, Boats)
  - Property details: title, description, price, location, country, and images

- **Reviews & Ratings System**
  - 5-star rating system
  - User comments on properties
  - Timestamp tracking for reviews

- **Image Management**
  - Multi-format support (webp, heic)
  - Cloud-based storage using Cloudinary
  - Seamless image upload and management

- **Geolocation Integration**
  - GeoJSON support for location-based queries
  - Property mapping capabilities

- **Responsive Design**
  - Mobile-optimized views
  - Bootstrap-based responsive UI
  - Optimized for show, edit, and create views

- **Session Management**
  - MongoDB-backed persistent sessions
  - 7-day session expiration
  - Security with httpOnly cookies

- **User Feedback**
  - Flash notifications for success/error messages
  - Real-time user notifications

🛠️ Tech Stack

Backend
- **Runtime:** Node.js (v24.11.1)
- **Framework:** Express.js v5.2.1
- **Database:** MongoDB with Mongoose v9.3.2
- **Authentication:** Passport.js v0.7.0 with Passport-Local strategy

Frontend
- **Templating Engine:** EJS v5.0.1
- **UI Framework:** Bootstrap
- **Styling:** CSS

Cloud & Storage
- **Cloud Storage:** Cloudinary v2.9.0
- **File Upload:** Multer v2.1.1
- **Storage Integration:** Multer-Storage-Cloudinary v2.2.1

Additional Libraries
- **Session Management:** Express-Session v1.19.0, Connect-Mongo v6.0.0
- **Validation:** Joi v18.1.2
- **Flash Messages:** Connect-Flash v0.1.1
- **HTTP Override:** Method-Override v3.0.0
- **Environment Variables:** Dotenv v17.4.2

📋 Prerequisites

- Node.js (v24.11.1 or higher)
- MongoDB Atlas account
- Cloudinary account
- Git

🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/wanderlust.git
cd wanderlust
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add the following environment variables:

```env
NODE_ENV=development
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

### 4. Start the Development Server
```bash
node app.js
```

The application will be running at `http://localhost:3000`

📁 Project Structure

```
wanderlust/
├── controllers/           # Route handlers and business logic
├── models/               # MongoDB schemas and models
│   ├── user.js          # User schema
│   ├── listing.js       # Property listing schema
│   └── review.js        # Review schema
├── routes/              # Express route definitions
│   ├── listing.js       # Listing routes
│   ├── review.js        # Review routes
│   └── user.js          # User authentication routes
├── views/               # EJS template files
│   ├── layouts/         # Layout templates
│   ├── listings/        # Listing views (index, show, edit, new, home)
│   ├── users/           # Authentication views (login, signup)
│   └── includes/        # Reusable components (navbar, footer, flash)
├── public/              # Static files (CSS, JavaScript, images)
├── utils/               # Utility functions and custom errors
├── middleware.js        # Custom middleware functions
├── schema.js            # Joi validation schemas
├── cloudConfig.js       # Cloudinary configuration
├── app.js              # Main application file
└── package.json        # Dependencies and project metadata
```

🎯 Usage

### Create a New Listing
1. Sign up or log in to your account
2. Navigate to "Create Listing"
3. Fill in property details (title, description, price, location, images)
4. Select a category
5. Upload images (supports webp and heic formats)
6. Submit to publish your listing

### Browse Listings
1. Browse properties by category
2. View detailed property information
3. Check reviews and ratings from other users
4. Filter by location or price

### Leave a Review
1. Visit a property listing
2. Click "Add Review"
3. Rate the property (1-5 stars)
4. Add your comments
5. Submit your review

Edit or Delete Your Listings

1. Navigate to your profile
2. Select the listing you want to manage
3. Click "Edit" to modify details or "Delete" to remove the listing

🔐 Security Features

- Password hashing with Passport-Local-Mongoose
- Session-based authentication with MongoDB store
- HttpOnly cookies to prevent XSS attacks
- CORS configuration for API security
- Input validation using Joi schema validation
- Error handling and custom error pages

🌐 Live Demo

Live Application:[https://wander-lust-sijf.onrender.com](https://wander-lust-sijf.onrender.com)

📝 Key Improvements & Updates

- **Responsive UI:** Implemented responsive design for all views (show, edit, new listings)
- **Image Format Support:** Added webp and heic image format support
- **User Experience:** Display username in navbar for personalized experience
- **Bug Fixes:** Resolved multiple listing bugs including image upload issues and edit crashes
- **Navigation:** Optimized navbar with explore link positioned for better UX

🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

📜 License

This project is licensed under the ISC License - see the LICENSE file for details.

👤 Author
Ayush Tiwari
- GitHub: [@Ayushtiw5](https://github.com/Ayushtiw5)
- LinkedIn: [Ayush Tiwari](https://www.linkedin.com/in/-ayushtiwari/)

🙋 Support

If you have any questions or suggestions, feel free to:
- Open an issue on GitHub
- Contact me via email
- Connect on LinkedIn

🎓 Learning Outcomes

This project demonstrates proficiency in:
- Full-stack web application development
- RESTful API design and implementation
- Database design and optimization with MongoDB
- User authentication and authorization
- Cloud integration (Cloudinary)
- Responsive web design
- Session management and security best practices
- Error handling and debugging

---

**Made with ❤️ by Ayush Tiwari**

---

Copy and paste this entire content into your GitHub README.md file!
