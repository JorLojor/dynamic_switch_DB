const controllerDB = require('../controllers/databaseController');
const express = require('express');
const router = express.Router();

router.post('/switchDB', controllerDB.ControllerSwitchDB);
// Method POST
// http://localhost:3567/api/switchDB

module.exports = router;
