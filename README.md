# Full Stack Task Manager App

A modern task management application built with React and TypeScript, featuring a clean and intuitive user interface for managing tasks with different priorities and statuses.

## Features

- Create, read, update, and delete tasks
- Task prioritization (Critical, High, Medium, Low, None)
- Task status management (Completed/Pending)
- Responsive design (also for mobile )
- Real-time updates
- Form validation
- Tooltips for better UX
- Toast notifications

## Technologies Used

- **Frontend Framework**: React 19.1.0
- **Language**: TypeScript 4.9.5
- **State Management**: React Query (@tanstack/react-query) 5.74.4
- **Routing**: React Router DOM 7.5.1
- **Form Handling**: Formik 2.4.6
- **Form Validation**: Yup 1.6.1
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**:
  - Lucide React 0.503.0 (Icons)
  - React Tooltip 5.28.1
  - React Toastify 11.0.5
- **Utility Libraries**:
  - Tailwind Merge 3.2.0

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A running backend server (endpoint configuration required)
- Follow the server instructions to setup it locally

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/lucasferreiragit/client-tasks-manager
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure the API endpoint**

   - The application expects a backend server to be running ( see [Server app reference](https://github.com/lucasferreiragit/server-tasks-manager))
   - Update the API endpoint in the configuration files if needed
   - The default endpoint is set to `http://localhost:3000/api`

4. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open the application**
   - The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── api/          # API related utilities
├── components/   # React components
├── constants/    # Application constants
├── helpers/      # Helper functions
├── hooks/        # Custom React hooks
├── pages/        # Page views components
└── types/        # TypeScript type definitions
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production

## Note on Backend Configuration
[Server app reference](https://github.com/lucasferreiragit/server-tasks-manager)

The application requires a backend server to function properly. The API endpoint configuration may need to be adjusted based on your server setup. Please ensure that:

1. The backend server is running
2. The API endpoints match the expected format
3. CORS is properly configured on the backend
4. The required environment variables are set if needed

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License.
