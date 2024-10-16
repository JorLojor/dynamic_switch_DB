const express = require('express');
const mahasiswaController = require('../controllers/mahasiswaController');
const router = express.Router();

router.post('/mahasiswa', mahasiswaController.postMahasiswa);
// Method POST 
// http://localhost:3567/api/mahasiswa


router.get('/mahasiswa', mahasiswaController.getMahasiswa);
// Method GET
// http://localhost:3567/api/mahasiswa

module.exports = router;
