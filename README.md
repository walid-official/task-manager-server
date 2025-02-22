
# Project Name :

## PlanMate - Task Management Application

A fully responsive Task Management App where users can add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are organized into To-Do, In Progress, and Done categories, with real-time updates and instant database persistence. The app features a clean, minimalistic UI optimized for both desktop and mobile users, showcasing seamless frontend interactivity, efficient backend data handling, and real-time synchronization. 🚀

#  🌟  Live Site URL
     https://task-manager-web-app.surge.sh/
  

## Dependencies

This project requires the following dependencies:

- `cors`: ^2.8.5
- `dotenv`: ^16.4.7
- `express`: ^4.21.2
- `mongodb`: ^6.13.0

### Installation

To install the dependencies, run the following command:

```bash
npm install
```
## Environment Variables

To connect to the database, you need to create a `.env` file in the root of your project with the following variables:

```env
DB_USER=your_username
DB_PASS=your_password
DB_URI=mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mongodb.net/your_database_name?retryWrites=true&w=majority

```

## 🚀 Technologies Used :


 * Express.js 
 * MongoDB
