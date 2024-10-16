const { switchDB } = require('../config/dbConnections');
const express = require('express');
const app = express();

const ControllerSwitchDB = async (req, res) => {
    const { dbType } = req.body;
    try {
        await switchDB(dbType, app);
        res.json({ message: `Switched to ${dbType}` });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error);
    }
}


module.exports = { ControllerSwitchDB };
