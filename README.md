# Assessment

## Backend

This REST API is designed using Node.js with Express.js, following the MVC (Model-View-Controller) pattern. It utilizes Sequelize as the Object-Relational Mapping (ORM) tool and MySQL as the Relational Database Management System (RDBMS).

### Key Features

- **MVC Pattern**: The API follows the Model-View-Controller pattern, ensuring a clear and organized code structure.

- **Database Model**: Sequelize is used to define and create models for the MySQL database, facilitating data management.

- **RDBMS**: The backend utilizes MySQL as the relational database for data storage.

- **API Routes**:

  - `/api/v1/users`: This route is responsible for managing user data and supports all four major CRUD operations (Create, Read, Update, Delete).
  - `/api/user/admin`: Another API route to manage administrative tasks.

- **CRUD Operations**: All main routes are designed to communicate with the database for Create, Read, Update, and Delete operations.

- **Pagination**: The API features a built-in pagination mechanism to handle large datasets efficiently.
