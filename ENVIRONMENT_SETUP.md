# Environment Configuration Guide

This project uses environment variables to manage different configurations for development and production environments.

## Frontend (Client)

### Environment Files:
- `.env.local` - Development environment (localhost)
- `.env.example` - Template file for reference

### Environment Variables:
- `REACT_APP_API_BASE_URL` - Backend API URL

### Setup:
1. Copy `.env.example` to `.env.local` for development
2. Update the values in `.env.local` for your local setup
3. For production, set `REACT_APP_API_BASE_URL` in your Vercel dashboard

## Backend (Server)

### Environment Files:
- `.env.local` - Development environment only
- `.env.example` - Template file for reference

### Environment Variables:
- `NODE_ENV` - Environment type (development/production)
- `PORT` - Server port (default: 8000)
- `DatabaseConnect` - MongoDB connection string (your current setup)
- `JWT_SECRET` - JWT secret key
- `FIREBASE_PROJECT_ID` - Firebase project ID

### Setup:
1. Copy `.env.example` to `.env.local` for development
2. Update the values in `.env.local` with your actual credentials
3. For production, your current Render setup is already working perfectly!

## Quick Start

### Development:
1. Ensure `.env.local` files exist in both client and server directories
2. Start backend: `cd server && npm start`
3. Start frontend: `cd client && npm start`

### Production:
1. **Render Backend**: Your current setup is already perfect - no changes needed!
2. **Vercel Frontend**: Just add `REACT_APP_API_BASE_URL = https://talkofcodebackend.onrender.com`

## Security Notes:
- Never commit `.env.local` or `.env.production` files to git
- Use strong random strings for JWT_SECRET
- Keep Firebase credentials secure
- Always use HTTPS in production

## Environment Switching:
The application automatically detects the environment and uses appropriate configurations:
- Development: Uses localhost URLs
- Production: Uses deployed URLs

No code changes needed when switching between environments!
