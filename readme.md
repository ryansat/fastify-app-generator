# Fastify Project Starter

This project provides a quick setup script for a Fastify application using TypeScript, including a basic user model with Drizzle ORM, MariaDB for the database, and JWT for authentication. The setup script automates the creation of the project structure, installation of dependencies, and generation of starter files.

## Prerequisites

Before running the setup script, ensure you have the following installed on your system:

- Node.js (v14 or newer recommended)
- npm (usually comes with Node.js)
- MariaDB or MySQL (for the database)

## Getting Started

Follow these steps to create your Fastify project using the `setup.js` script.

### 1. Save the Setup Script

Copy the content of the `setup.js` script provided in the project repository and save it to a file named `setup.js` on your computer.

### 2. Run the Setup Script

Open a terminal or command prompt, navigate to the directory where you saved `setup.js`, and run the script by executing:

```bash
node setup.js my-fastify-project
```

Replace `my-fastify-project` with your desired project name.

### 3. Navigate to Your Project Directory

After the script execution completes, navigate to the newly created project directory:

```bash
cd my-fastify-project
```

### 4. Start the Development Server

Run the development server with auto-reload enabled:

```bash
npm run dev
```

Your Fastify server should now be running on `http://localhost:3000/`, and you can start developing your application.

## Project Structure

The setup script generates the following project structure:

- `src/` - Contains the TypeScript source files for your application.
  - `controllers/` - Place your route controllers here.
  - `models/` - Contains ORM models, starting with a `User` model.
  - `routes/` - Define your application routes here.
  - `services/` - Services for business logic go here.
  - `utils/` - Utility functions and helpers.
  - `migrations/` - Database migration scripts.
  - `app.ts` - The entry point for your Fastify application.
- `.env` - Environment variables for database configuration and JWT secret.
- `tsconfig.json` - TypeScript compiler configuration.

## Additional Notes

- The `.env` file is created with placeholder values for database connection and JWT secret. Ensure to update these with your actual configuration before starting your application.
- This starter project includes a simple route (`/`) as an example. Expand upon this by adding new routes, controllers, and services as needed.
- Implement authentication logic in the login controller based on your requirements.

For more information on Fastify, TypeScript, Drizzle ORM, and JWT, refer to their official documentation.

## Contributing

Contributions to improve the setup script or project structure are welcome. Please feel free to submit a pull request or open an issue.
