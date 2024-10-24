const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize instance with error handling
let sequelize;

try {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 5432,
            dialect: 'postgres',
            logging: false,
        }
    );

    sequelize.authenticate()
        .then(() => {
            console.log('Database connection established successfully.');
        })
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        });
} catch (error) {
    console.error('Sequelize initialization error:', error);
}

module.exports = sequelize;
