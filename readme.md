
## 🗂️ Project Structure Breakdown

The `src` folder contains the actual source code for the project, and will **not** include any tests. (You might want to create a separate `tests` folder for that purpose.)

Let's take a look inside the `src` folder:

### 📂 **config**
The `config` folder contains all the **configurations** and **setup** of libraries or modules. For example:
- **dotenv** setup for using environment variables cleanly. This setup is done in `server-config.js`.
- **Logging library** setup (like Winston), where configurations for logging are defined.

### 📂 **routes**
In the `routes` folder, you define and register your **routes** along with their corresponding **middleware** and **controllers**. This is where you map each route to its handler.

### 📂 **middlewares**
The `middlewares` folder is used to intercept incoming requests. You can place **validators**, **authenticators**, and other checks here before they reach the controller. They help in modifying or validating the request before processing further.

### 📂 **controllers**
The `controllers` are the next step after middlewares. Here, you receive the incoming requests and data. Then, you pass the data to the **business layer** (which resides in the services layer). After the business logic completes, the controller structures the API response and sends it back.

### 📂 **repositories**
The `repositories` folder contains the **data access logic**, where you interact with the database. This includes raw SQL queries or ORM queries to retrieve and manipulate the data.

### 📂 **services**
The `services` folder holds the **business logic**. It interacts with the `repositories` to fetch data from the database, process the data, and return the results. It acts as an intermediary between controllers and repositories.

### 📂 **utils**
The `utils` folder contains **helper methods**, **utility functions**, custom **error classes**, and other reusable utilities that assist the rest of the project.

# Setup Instructions

Follow these steps to get started:

## Installation
```bash
npm install
```
## Create .env File
Create a .env file in the root directory and add your desired port: **PORT:<PORT_NUMBER>**

    PORT=<port number of your choice>
ex:
```bash
PORT=3000
```
## Run the Project
```bash
 npm run dev
```
Inisde the **src/config** folder create a new file named as `config.json` and write the following code :
```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
Replace username and password with your db credentialS