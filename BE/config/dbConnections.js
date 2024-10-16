const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, 'config.json');
const configDB = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

dotenv.config();

let activeDB = configDB.dbActive;
const timeout = (ms) => new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Connection timed out after 20 seconds')), ms);
});

const mongoConnect = async () => {
    try {
        console.log(activeDB)
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

const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION, {
    dialect: 'postgres',
});

const postgreConnect = async () => {
    try {
        await Promise.race([
            sequelize.authenticate(),
            timeout(20000)
        ]);
        console.log('Connected to PostgreSQL');
    } catch (error) {
        console.error('Failed to connect to PostgreSQL:', error);
        throw error;
    }
};

const switchDB = async (dbType, app) => {
    const configPath = path.join(__dirname, 'config.json');
    const configDB = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
    console.log('configDB:', configDB);

    configDB.dbActive = dbType;
    fs.writeFileSync
        (configPath, JSON.stringify(configDB, null, 2), 'UTF-8');
    activeDB = dbType;
    app.set('activeDB', activeDB);
    console.log('Active Database:', activeDB);

};

const runActiveDB = async () => {
    console.log('Active Database:', activeDB);
    if (activeDB === 'mongodb') {
        await mongoConnect();
    } else if (activeDB === 'postgresql') {
        await postgreConnect();
    }
};

module.exports = { switchDB, sequelize, mongoose, runActiveDB, activeDB };
