const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

let activeDB = 'mongodb';

// Koneksi MongoDB
const timeout = (ms) => new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Connection timed out after 20 seconds')), ms);
});

// Koneksi MongoDB dengan timeout 20 detik
const mongoConnect = async () => {
    try {
        await Promise.race([
            mongoose.connect(process.env.MONGO_CONNECTION),
            timeout(20000) // Timeout 20 detik
        ]);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
};

// Koneksi PostgreSQL dengan timeout 20 detik
const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION, {
    dialect: 'postgres',
});

const postgreConnect = async () => {
    try {
        await Promise.race([
            sequelize.authenticate(),
            timeout(20000) // Timeout 20 detik
        ]);
        console.log('Connected to PostgreSQL');
    } catch (error) {
        console.error('Failed to connect to PostgreSQL:', error);
        throw error;
    }
};

// Fungsi untuk switch database
const switchDB = async (dbType, app) => {
    app.set('activeDB', dbType);  // Set activeDB di app
    if (dbType === 'mongodb') {
        await mongoConnect();
    } else if (dbType === 'postgresql') {
        await postgreConnect();
    }
};

const runActiveDB = async () => {
    if (activeDB === 'mongodb') {
        await mongoConnect();
    } else if (activeDB === 'postgresql') {
        await postgreConnect();
    }
};

module.exports = { switchDB, sequelize, mongoose, activeDB, runActiveDB };
