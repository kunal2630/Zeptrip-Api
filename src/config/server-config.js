const dotenv = require('dotenv');

// Load environment variables from the .env file into process.env,
// making them accessible throughout the application using process.env.VARIABLE_NAME
dotenv.config();

module.exports = {
    PORT: process.env.PORT
};