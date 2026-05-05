# Klyne User Management System

A simple User CRUD (Create, Read, Update, Delete) application built with Next.js and React. This app uses the JSONPlaceholder API to manage user data.

## Features
- List all users with name and email
- Dynamic routing for individual user profiles
- Update user details (Name and Email)
- Delete users from the list
- Clean, minimalist UI 
- Fully responsive design

## Tech Stack
- Next.js (App Router)
- React
- Vanilla CSS
- Native Fetch API

## How to Run
1. Clone the project or download the files.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `/app/users`: Contains the main user list page.
- `/app/users/[id]`: Contains the dynamic profile and edit page.
- `/app/context`: Contains the React Context for local state management.
- `/app/globals.css`: Global styles and theme variables.
