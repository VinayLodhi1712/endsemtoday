<h1 align="center">
  🚀 Talkofcode - The Developer's All-in-One Ecosystem
</h1>

<p align="center">
  <a href="https://talkofcode.vercel.app/" target="_blank">
    <img src="https://github.com/user-attachments/assets/161be1ff-4c28-4ac5-92e5-fce779ea9dd6" alt="Talkofcode Homepage Banner" width="85%">
  </a>
</p>

<p align="center">
  <strong>An integrated MERN-stack platform combining e-commerce, a community Q&A forum, and a tech news feed to create a comprehensive hub for developers and tech students.</strong>
</p>

<p align="center">
  <a href="https://talkofcode.vercel.app/"><strong>View Live Demo »</strong></a>
</p>

<p align="center">
  <a href="#-about-the-project">About</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Installation</a> •
  <a href="#-google-sign-in-integration">Google Auth</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-live-demo">Live Demo</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-contact--links">Contact</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">
  <img src="https://img.shields.io/badge/Google_OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google OAuth">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render">
</p>

---

## 🎯 About The Project

Talkofcode was developed to be more than just a single-purpose application. The goal was to build a complete digital ecosystem that supports the core needs of a modern developer: the right **tools**, a strong **community**, and up-to-date **knowledge**.

This full-stack application integrates three key pillars into one seamless experience:

1.  **🛒 Student E-Commerce Store:** A curated marketplace for essential and affordable tech products for learners and professionals.
2.  **💬 CodeConnect Q&A Forum:** A Stack Overflow-style platform for users to ask technical questions, share solutions, and collaborate.
3.  **📰 Live Tech News:** A real-time news feed, powered by the RapidAPI, to keep users informed about the latest industry trends.

This project was a comprehensive exercise in building a MERN stack application, handling everything from backend architecture and REST API design to database management, user authentication, and frontend state management.

---

## ✨ Key Features

### � **Advanced Authentication System**
*   **Google Sign-In Integration:** Professional Google OAuth implementation with Firebase for seamless authentication
*   **Email/Password Authentication:** Traditional registration and login with secure password handling
*   **User Profile Management:** Complete user dashboard with profile updates and password management
*   **Session Management:** Secure JWT-based authentication with automatic session handling

### 🛒 **Complete E-Commerce Platform**
*   **Product Catalog:** Comprehensive product listings with search, filter, and category management
*   **Shopping Cart:** Dynamic cart management with real-time updates and price calculations
*   **Order Processing:** Complete checkout flow with order history and tracking
*   **Admin Panel:** Product management, category management, and order administration

### 💬 **Community Q&A Forum (CodeConnect)**
*   **Question & Answer System:** Stack Overflow-style platform for technical discussions
*   **Code Syntax Highlighting:** Proper formatting for code blocks in questions and answers
*   **User Interaction:** Upvoting, commenting, and answer acceptance system
*   **Search & Filter:** Find relevant questions and answers quickly

### 📰 **Real-Time Tech News**
*   **Live News Feed:** Integration with RapidAPI for latest technology news
*   **Categorized Content:** Organized news sections for different tech topics
*   **Responsive Design:** Optimized news display across all devices

### 🎨 **Professional UI/UX**
*   **Responsive Design:** Mobile-first approach with Bootstrap 5 integration
*   **Professional Styling:** Custom CSS with Georgia font matching and consistent branding
*   **Toast Notifications:** User-friendly feedback system with react-toastify
*   **Loading States:** Smooth user experience with proper loading indicators

### ⚙️ **Advanced Technical Features**
*   **Environment Configuration:** Seamless development/production environment switching
*   **CORS Management:** Secure cross-origin resource sharing for multiple domains
*   **Error Handling:** Comprehensive error management with user-friendly messages
*   **API Integration:** RESTful API design with proper status codes and responses

---

## 🛠️ Tech Stack

This project is built with a modern and robust set of technologies for scalability and performance.

| Category           | Technology                                                                                                                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**       | `React.js 18`, `Bootstrap 5`, `CSS3`, `Font Awesome`, `React Toastify`                                                                                                                           |
| **Backend**        | `Node.js`, `Express.js`, `Mongoose ODM`, `JWT Authentication`                                                                                                                                      |
| **Database**       | `MongoDB Atlas` (Production), `MongoDB Local` (Development)                                                                                                                                        |
| **Authentication** | `Firebase Auth`, `Google OAuth 2.0`, `JWT Tokens`                                                                                                                                                 |
| **Deployment**     | `Vercel (Frontend)`, `Render (Backend)`                                                                                                                                                           |
| **API Integration**| `RapidAPI (Tech News)`, `RESTful API Design`                                                                                                                                                      |
| **Development**    | `Environment Variables`, `CORS Configuration`, `Nodemon`, `Concurrently`                                                                                                                          |
| **State Management**| `React Context API`, `Local Storage`, `Session Management`                                                                                                                                       |

---

## 🚀 Getting Started

To get a local copy up and running, follow these comprehensive setup steps.

### Prerequisites

Ensure you have the following installed on your machine:
*   **Node.js** (v16 or later) - [Download here](https://nodejs.org/)
*   **npm** or **yarn** package manager
*   **Git** - [Download here](https://git-scm.com/)
*   **MongoDB** (for local development) - [Download here](https://www.mongodb.com/try/download/community)

### 🔧 Installation Guide

#### 1. **Clone the Repository**
```bash
git clone https://github.com/VinayLodhi1712/endsemtoday.git
cd endsemtoday
```

#### 2. **Backend Setup**
```bash
cd server
npm install
```

**Environment Configuration:**
- Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

- Update `.env.local` with your credentials:
```env
NODE_ENV=development
PORT=8000
DatabaseConnect=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
FIREBASE_PROJECT_ID=your_firebase_project_id
```

**Start the backend server:**
```bash
npm start
# or for development with auto-reload
npm run dev
```

#### 3. **Frontend Setup**
*(Open a new terminal window)*
```bash
cd client
npm install
```

**Environment Configuration:**
- Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

- Update `.env.local`:
```env
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_ENV=development
```

**Start the React development server:**
```bash
npm start
```

#### 4. **Access the Application**
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:8000/api/v1`

### 🌐 Production Deployment

#### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard:
   - `DatabaseConnect` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = Strong secret key
   - `PORT` = 8000

#### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variable:
   - `REACT_APP_API_BASE_URL` = Your Render backend URL

### 🔐 Authentication Setup

#### Firebase Configuration
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Google Sign-In
3. Add your domain to authorized domains
4. Update Firebase configuration in your frontend

#### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized JavaScript origins:
   - `http://localhost:3000` (development)
   - `https://talkofcode.vercel.app` (production)

### 📋 Environment Variables Reference

For a complete list of environment variables and setup instructions, see [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)

---

## � Google Sign-In Integration

This project features a professional Google Sign-In implementation that provides a seamless authentication experience:

### ✨ Features
- **One-Click Authentication:** Users can sign in instantly with their Google account
- **Automatic Account Creation:** New users are automatically registered in the system
- **Professional UI:** Custom-styled Google button matching the website's design
- **Secure Token Handling:** Firebase Authentication ensures secure token management
- **Cross-Platform Support:** Works seamlessly on desktop and mobile devices

### 🎨 Design Elements
- **Georgia Font Integration:** Consistent typography matching the website theme
- **Authentic Google Colors:** Official Google brand colors for trust and recognition
- **Responsive Design:** Optimized for all screen sizes
- **Hover Effects:** Smooth transitions for better user experience

### 🔧 Technical Implementation
- **Firebase Auth:** Secure authentication backend
- **JWT Integration:** Seamless integration with existing authentication system
- **Error Handling:** Comprehensive error management with user-friendly messages
- **Session Management:** Automatic session handling and persistence

---

## �📸 Screenshots

<details>
<summary><strong>Click to expand and view project screenshots</strong></summary>
<br>

| Feature | Screenshot |
| :--- | :--- |
| **Product Catalog** | <p align="center">*(Add your product page screenshot here)*<br>![Product Page](https://github.com/user-attachments/assets/ccfd8d72-4b08-46b9-bb83-9a11a0f16a11)</p> |
| **Q&A Forum** | <p align="center">*(Add your Q&A page screenshot here)*<br>![AI Help / Q&A](https://github.com/user-attachments/assets/edf3dbaf-31e3-4006-bfa7-fc7019d24146)</p> |
| **Shopping Cart** | <p align="center">*(Add your cart screenshot here)*<br>![Shopping Cart](https://github.com/user-attachments/assets/fef7badf-8deb-4aeb-b0bd-3772f429a0a8)</p> |
| **Tech News Feed** | <p align="center">*(Add your news feed screenshot here)*<br>![Tech News](https://github.com/user-attachments/assets/f2d22fa1-6bda-4b8f-9b25-a7acb1c43cbe)</p> |
| **User Dashboard** | <p align="center">*(Add your user dashboard screenshot here)*<br>![User Dashboard](https://github.com/user-attachments/assets/ac899385-de81-4cf8-856e-08ab09a1c4e0)</p> |

</details>

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### 🌟 How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'feat: Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### 🐛 Bug Reports & Feature Requests

- **Bug Reports:** Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
- **Feature Requests:** Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)

### 📋 Development Guidelines

- Follow the existing code style and conventions
- Write clear commit messages using conventional commits
- Add tests for new features when applicable
- Update documentation for significant changes
- Ensure your code works in both development and production environments

### 🔧 Areas for Contribution

- **UI/UX Improvements:** Enhance the user interface and experience
- **New Features:** Add e-commerce features, Q&A enhancements, or news integration
- **Performance Optimization:** Improve loading times and responsiveness
- **Security Enhancements:** Strengthen authentication and data protection
- **Documentation:** Improve README, add code comments, create tutorials
- **Testing:** Add unit tests, integration tests, and end-to-end tests

### 💡 Getting Help

- Check the [Issues](https://github.com/VinayLodhi1712/endsemtoday/issues) page for existing discussions
- Read the [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for setup guidance
- Feel free to open a new issue for questions or discussions

---

## � Live Demo

**🌐 Production Site:** [https://talkofcode.vercel.app/](https://talkofcode.vercel.app/)

### 🧪 Test Accounts
- **Google Sign-In:** Use any Google account for instant access
- **Demo Features:** All features are available in the live demo

---

## 📊 Project Statistics

- **Frontend:** React.js with 50+ components
- **Backend:** Node.js with RESTful API endpoints
- **Database:** MongoDB with multiple collections
- **Authentication:** Firebase + JWT implementation
- **Deployment:** Multi-platform deployment (Vercel + Render)

---

## 🔮 Future Enhancements

- [ ] **Real-time Chat:** Live messaging between users
- [ ] **Advanced Search:** ElasticSearch integration for better search
- [ ] **Mobile App:** React Native mobile application
- [ ] **Payment Integration:** Stripe/PayPal payment processing
- [ ] **Admin Dashboard:** Advanced analytics and management tools
- [ ] **AI Integration:** ChatGPT integration for coding help
- [ ] **Progressive Web App:** PWA features for mobile experience
- [ ] **Multi-language Support:** Internationalization (i18n)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Firebase Team** for excellent authentication services
- **MongoDB** for reliable database solutions
- **React Community** for comprehensive documentation
- **Bootstrap Team** for responsive design framework
- **RapidAPI** for tech news integration
- **Vercel & Render** for seamless deployment platforms

---

## �💖 Show Your Support

If you like this project or it helped you, please give it a ⭐ to show your appreciation!

### 📈 Project Metrics
- ⭐ **Stars:** Show your support
- 🐛 **Issues:** Report bugs and request features
- 🔧 **Pull Requests:** Contribute to the codebase
- 📝 **Documentation:** Help improve the docs

---

## 📧 Contact & Links

**Developer:** Vinay Anand Lodhi  
**Email:** `vinayanandlodhi12@gmail.com`  
**Project Repository:** [https://github.com/VinayLodhi1712/endsemtoday](https://github.com/VinayLodhi1712/endsemtoday)  
**Live Demo:** [https://talkofcode.vercel.app/](https://talkofcode.vercel.app/)

### 🔗 Quick Links
- [🚀 Live Demo](https://talkofcode.vercel.app/)
- [📋 Environment Setup](./ENVIRONMENT_SETUP.md)
- [🐛 Report Bug](https://github.com/VinayLodhi1712/endsemtoday/issues/new?labels=bug)
- [💡 Request Feature](https://github.com/VinayLodhi1712/endsemtoday/issues/new?labels=enhancement)

---

<p align="center">
  <strong>Built with ❤️ by <a href="https://github.com/VinayLodhi1712">Vinay Anand Lodhi</a></strong>
</p>

<p align="center">
  <a href="#top">⬆️ Back to Top</a>
</p>
