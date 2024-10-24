const express = require('express');
const cors = require("cors");
const app = express();
const sequelize = require('./config/database');
const apiRoutes = require('../Backend/routes/api');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

// Sync database and start the server
sequelize.sync({ force: false }).then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Database connection error:', err);
});
