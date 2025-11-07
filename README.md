# 📚 Book Library

A modern personal library management system that helps you organize your reading collection, track books you've read, manage your reading wishlist, and save memorable quotes from your favorite books.

## 🌟 Features

- ✅ **User Authentication** - Secure registration and login system with password hashing
- ✅ **Book Management** - Add, view, and organize your personal book collection
- ✅ **Reading Status** - Track books as "Want to Read" or "Finished"
- ✅ **Quote Collection** - Save and organize memorable quotes from your books
- ✅ **Dashboard** - View statistics about your reading progress
- ✅ **Book Filtering** - Filter books by reading status (All, Read, Want to Read)
- ✅ **Profile Management** - Manage your account information
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠️ Technologies Used

### Backend:
- **Node.js** - JavaScript runtime
- **Express.js** (v5.1.0) - Web application framework
- **PostgreSQL** - Relational database
- **bcrypt** (v6.0.0) - Password hashing
- **express-session** - Session management
- **dotenv** - Environment variable management

### Template Engine:
- **EJS** - Embedded JavaScript templating for server-side rendering

### Frontend:
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations and transitions
- **Vanilla JavaScript** - Client-side interactivity
- **Google Fonts (Montserrat)** - Typography

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository:**
```bash
git clone https://github.com/ibrahimmdef/book-library.git
cd book-library
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up PostgreSQL database:**
```bash
# Create database
createdb Library

# Run the SQL schema
psql -d Library -f query.sql
```

4. **Configure environment variables:**

Create a `.env` file in the root directory:
```env
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=Library
DB_PASSWORD=your_postgres_password
DB_PORT=5432
SESSION_SECRET=your_super_secret_session_key_here
```

> ⚠️ **Security Note**: Never commit `.env` file to version control. Use strong, randomly generated values for `SESSION_SECRET`.

5. **Start the server:**
```bash
npm start
```

6. **Navigate to:**
```
http://localhost:3000
```

## 📁 Project Structure

```
book-library/
├── server.js                 # Main server file
├── .env                      # Environment variables (not in repo)
├── query.sql                 # Database schema
├── package.json              # Project dependencies
├── controllers/              # Business logic
│   ├── authController.js    # Authentication logic
│   ├── bookController.js    # Book management logic
│   ├── quoteController.js   # Quote management logic
│   └── pageController.js    # Page rendering logic
├── routes/                   # Route definitions
│   ├── authRoutes.js        # Authentication routes
│   ├── bookRoutes.js        # Book routes
│   ├── quoteRoutes.js       # Quote routes
│   ├── pageRoutes.js        # Page routes
│   └── profileRoutes.js     # Profile routes
├── db/                       # Database configuration
│   └── index.js             # Database connection
├── views/                    # EJS templates
│   ├── auth/                # Authentication pages
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── books.ejs            # Book collection page
│   ├── quotes.ejs           # Quotes page
│   ├── dashboard.ejs        # Dashboard page
│   ├── addbook.ejs          # Add book/quote page
│   └── profile.ejs          # Profile page
├── public/                   # Static assets
│   ├── styles/              # CSS files
│   │   ├── login.css
│   │   └── main.css
│   ├── js/                  # JavaScript files
│   │   └── logic.js
│   └── images/              # Image assets
└── README.md                # Project documentation
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Books Table
```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  cover_url VARCHAR(255),
  status VARCHAR(20), -- 'want' | 'finished'
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Quotes Table
```sql
CREATE TABLE quotes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quote_text TEXT NOT NULL,
  author VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎯 Usage

### Registration & Login
1. Navigate to the home page
2. Click "Register" to create a new account
3. Enter username, email, and password
4. Login with your credentials

### Managing Books

#### Adding Books:
1. Go to the **Add** page
2. Select "Book" option
3. Enter book details:
   - Title
   - Author
   - Cover URL (optional)
4. Select reading status:
   - **Completed** - For books you've finished
   - **Want to Read** - For your reading wishlist
5. Click "Add" to save

#### Viewing Books:
- **All Books**: View your entire collection
- **Read**: Filter books you've completed
- **Want To Read**: View your reading wishlist
- Hover over book covers to access quick actions:
  - Delete book
  - Mark as finished (for wishlist items)

### Managing Quotes

#### Adding Quotes:
1. Go to the **Add** page
2. Click on "Quotes" to switch mode
3. Enter the quote text and author
4. Click "Add" to save

#### Viewing Quotes:
- Navigate to the **Quotes** page
- View all your saved quotes
- Quotes are displayed in chronological order

### Dashboard
- **Total Books**: All books in your library
- **Finished Books**: Books you've completed
- **Want To Read**: Books on your wishlist
- **All Quotes**: Total quotes saved

### Profile
- View your account information
- Username and email display
- Sign out functionality

## 📝 API Endpoints

### Authentication
```
GET  /              - Home/Register page (redirects if logged in)
GET  /login         - Login page
POST /lForm         - Login form submission
POST /rForm         - Register form submission
POST /logout        - Logout user
```

### Books
```
GET  /books         - View all books
GET  /read          - View finished books
GET  /want          - View want-to-read books
POST /add-book      - Add new book
POST /books/delete/:id   - Delete book
POST /books/finish/:id   - Mark book as finished
```

### Quotes
```
GET  /quotes        - View all quotes
POST /add-quotes    - Add new quote
```

### Pages
```
GET /dashboard      - Dashboard with statistics
GET /add            - Add book/quote page
GET /profile        - User profile page
```

## ⚙️ Configuration

### Session Settings
- Session duration: 7 days
- Cookie security: httpOnly enabled
- Session secret: Configured via environment variable

### Database Connection
- Connection pooling enabled
- Automatic reconnection on failure
- Prepared statements for security

## 🔒 Security Features

- ✅ **Password Hashing** - bcrypt with 10 salt rounds
- ✅ **SQL Injection Protection** - Parameterized queries
- ✅ **Session-Based Authentication** - Secure session management
- ✅ **Route Protection** - Middleware-based access control
- ✅ **Environment Variables** - Sensitive data protection

## 🚀 Scripts

```json
{
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

## 📱 Responsive Design

The application is fully responsive and works on:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (320px - 767px)

## 🎨 Features in Detail

### Book Collection
- Add books with cover images
- Categorize by reading status
- Quick delete and status update
- Search and filter capabilities

### Quote Management
- Save memorable passages
- Attribute quotes to authors
- Clean, readable quote cards
- Chronological organization

### Activity Dashboard
- Visual statistics
- Reading progress tracking
- Quick overview of your library

## 🐛 Known Issues

- Search functionality not yet implemented
- Book cover images must be URLs (no file upload)
- No pagination for large collections

## 🚀 Future Enhancements

- 📊 Advanced statistics and reading analytics
- 🔍 Search and advanced filtering
- 📤 Book cover image upload
- 📖 Reading progress tracking (pages read)
- ⭐ Book rating system
- 📅 Reading calendar and goals
- 🔔 Reading reminders
- 🌙 Dark mode support
- 📱 Mobile app version
- ☁️ Cloud backup and sync
- 🔗 Social features (share books/quotes)
- 📚 Book recommendations

## 👤 Author

**Ibrahim**
- GitHub: [@ibrahimmdef](https://github.com/ibrahimmdef)

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Icons: Font Awesome
- Fonts: Google Fonts (Montserrat)
- Database: PostgreSQL
- Framework: Express.js

## 📞 Support

For support, email or open an issue on GitHub.

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

Made with ❤️ by Ibrahim
