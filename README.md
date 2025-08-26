# 🚀 DSA Helper - Your Personal Coding Journey Companion

A modern, full-stack web application built with Next.js 15 to help programmers track their Data Structures and Algorithms (DSA) progress on LeetCode, set goals, and stay motivated with AI-generated quotes.

## ✨ Features

### 🔐 **Authentication & Security**

- **Google OAuth Integration** - Secure login with Google accounts
- **Protected Routes** - Middleware-based route protection
- **Session Management** - JWT-based session handling with NextAuth.js

### 📊 **LeetCode Integration**

- **Real-time Stats Tracking** - Fetch and display solved problems count
- **Progress Visualization** - Interactive charts showing easy/medium/hard breakdown
- **Profile Information** - Display LeetCode ranking, reputation, and country
- **Rate Limiting Handling** - Smart retry logic with exponential backoff
- **Offline Fallbacks** - Graceful degradation when APIs are unavailable

### 🎯 **Goal Setting & Tracking**

- **Custom Targets** - Set personalized question-solving goals
- **Deadline Management** - Track progress against time-based targets
- **Progress Calculation** - Visual progress bars and remaining question counts
- **Days Left Counter** - Real-time countdown to your target date

### 🤖 **AI-Powered Motivation**

- **Gemini AI Integration** - Generate personalized motivational quotes
- **DSA-Specific Content** - Quotes tailored for competitive programming
- **Fallback System** - Curated motivational quotes when AI is unavailable
- **One-Click Refresh** - Get new motivation with a single click

### 🎨 **Modern UI/UX**

- **Responsive Design** - Works seamlessly on desktop and mobile
- **Tailwind CSS** - Beautiful, modern styling
- **Interactive Components** - Real-time data updates without page refresh
- **Error Handling** - User-friendly error states and loading indicators

## 🛠️ Tech Stack

### **Frontend**

- **Next.js 15** - App Router, Server Components, Middleware
- **React 19** - Latest React features with concurrent rendering
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework

### **Backend & Database**

- **Next.js API Routes** - Serverless API endpoints
- **PostgreSQL** - Robust relational database
- **Drizzle ORM** - Type-safe database operations
- **Database Migrations** - Version-controlled schema changes

### **Authentication & APIs**

- **NextAuth.js** - Complete authentication solution
- **Google OAuth Provider** - Secure Google sign-in
- **LeetCode API** - Real-time problem-solving data
- **Google Gemini AI** - AI-powered motivational content

### **Development & Deployment**

- **TypeScript** - Static type checking
- **ESLint** - Code linting and formatting
- **pnpm** - Fast, efficient package manager
- **Turbopack** - Ultra-fast bundler for development

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+** - [Download here](https://nodejs.org/)
- **pnpm** - `npm install -g pnpm`
- **PostgreSQL Database** - Local or cloud instance
- **Google OAuth App** - [Google Cloud Console](https://console.cloud.google.com/)
- **Gemini API Key** - [Google AI Studio](https://aistudio.google.com/apikey)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd dsa-helper
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/dsa_helper"

   # NextAuth.js
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Gemini AI
   GEMINI_API_KEY="your-gemini-api-key"
   ```

4. **Database Setup**

   ```bash
   # Generate and run migrations
   pnpm drizzle-kit generate
   pnpm drizzle-kit migrate
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### **First Time Setup**

1. **Sign In** - Use your Google account to authenticate
2. **LeetCode Setup** - Enter your LeetCode username
3. **Set Goals** - Define your target questions and deadline
4. **Start Tracking** - Your dashboard will display real-time progress

### **Dashboard Features**

- **📊 Progress Overview** - Visual representation of your goal progress
- **👤 Profile Card** - LeetCode profile information and stats
- **📈 Question Breakdown** - Easy/Medium/Hard problem distribution
- **🔄 Refresh Data** - Update your stats with the latest LeetCode data
- **✨ Motivation Quotes** - Get AI-generated encouragement

### **Goal Management**

- Navigate to `/goal` to update your targets
- Set realistic deadlines for better tracking
- Monitor daily progress requirements

## 🏗️ Project Structure

```
dsa-helper/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── goal/              # Goal setting page
│   ├── setup/             # Initial setup flow
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard homepage
│   └── middleware.ts      # Route protection
├── components/            # Reusable UI components
│   ├── DashboardContent.tsx
│   ├── LeetCodeStats.tsx
│   ├── ProfileCard.tsx
│   └── ...
├── lib/                   # Utilities and configurations
│   ├── auth.ts           # NextAuth configuration
│   ├── leetcode.ts       # LeetCode API integration
│   ├── gemini.ts         # Gemini AI integration
│   ├── types.ts          # TypeScript type definitions
│   └── user.ts           # User database operations
├── db/                    # Database configuration
│   ├── index.ts          # Database connection
│   └── schema.ts         # Drizzle schema definitions
├── drizzle.config.ts     # Drizzle ORM configuration
└── package.json          # Dependencies and scripts
```

## 🔧 API Endpoints

- `GET /api/refresh-leetcode` - Fetch latest LeetCode statistics
- `GET /api/motivation` - Generate new motivational quote
- `POST /api/auth/[...nextauth]` - NextAuth.js authentication routes

## 🛡️ Error Handling & Resilience

### **Rate Limiting Protection**

- Automatic retry with exponential backoff
- Respects `Retry-After` headers
- User-friendly rate limit notifications

### **Fallback Systems**

- Cached data when APIs are unavailable
- Pre-written motivational quotes
- Graceful degradation of features

### **Type Safety**

- Comprehensive TypeScript coverage
- Runtime error boundaries
- Structured error responses

## 🚀 Deployment

### **Vercel (Recommended)**

1. **Push to GitHub** - Ensure your code is in a Git repository
2. **Connect to Vercel** - Import your project from GitHub
3. **Environment Variables** - Add all environment variables in Vercel dashboard
4. **Database Setup** - Use Vercel Postgres or external PostgreSQL
5. **Deploy** - Automatic deployments on every push

### **Environment Variables for Production**

Update these for production deployment:

```env
NEXTAUTH_URL="https://your-domain.com"
DATABASE_URL="your-production-database-url"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **LeetCode** - For providing the problem-solving platform
- **Google Gemini AI** - For AI-powered motivational content
- **Next.js Team** - For the amazing React framework
- **Drizzle Team** - For the type-safe ORM
- **NextAuth.js** - For authentication made simple

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please [open an issue](https://github.com/your-username/dsa-helper/issues) with detailed information.

## 📞 Support

Need help getting started? Feel free to reach out or check the documentation for troubleshooting tips.

---

**Happy Coding! 🎯** Keep pushing your limits and achieving your DSA goals!
