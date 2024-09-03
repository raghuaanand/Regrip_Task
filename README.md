# Regrip Task

This project is a web application that visualizes tyre purchase data using charts. The frontend is built with React, and data is fetched from a backend server.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher) or [yarn](https://yarnpkg.com/) (v1.22 or higher)
- [Git](https://git-scm.com/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/raghuaanand/Regrip_Task.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd Regrip_Task
   ```

3. **Install dependencies for the backend:**

   Make sure you are in the backend directory (`Regrip_Task/backend`).

   If you are using `npm`:

   ```bash
   npm install
   ```

   If you are using `yarn`:

   ```bash
   yarn install
   ```

4. **Navigate to the frontend directory and install dependencies:**

   ```bash
   cd ..
   cd frontend
   ```

   Install dependencies:

   If you are using `npm`:

   ```bash
   npm install
   ```

   If you are using `yarn`:

   ```bash
   yarn install
   ```

## Running the Project

### Running the Backend Server

1. **Get PostgreSQL Database URL from neon or avien (from browser) or download PostgreSQL locally**
2. **Copy the .env.example to .env and use your Database URL**

3. **Navigate back to the root directory (if not already there):**

   ```bash
   cd ..
   ```

4. **Start the backend server:**

   ```bash
   node index.js
   ```

   The backend server should now be running on [http://localhost:8000](http://localhost:8000).

### Running the Frontend Application

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Start the React application:**

   If you are using `npm`:

   ```bash
   npm start
   ```

   If you are using `yarn`:

   ```bash
   yarn start
   ```

   The React application should now be running on [http://localhost:3000](http://localhost:3000).

### Viewing the Application

Open your web browser and visit [http://localhost:3000](http://localhost:3000) to view the application. The app should now display the dashboard with charts visualizing tyre purchase data.

## Project Structure

- **/frontend**: Contains the frontend React application.
- **/backend**: Contains the backend Node.js/Express server.
- **/public**: Contains static assets for the frontend.
- **/src**: Contains the main code for the frontend, including components, styles, and utility functions.

## Usage

- The application allows you to visualize tyre data using bar charts.
- You can select different months and tyre types to filter the data displayed in the charts.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
