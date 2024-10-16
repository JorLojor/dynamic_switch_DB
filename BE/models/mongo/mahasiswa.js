const mongoose = require('mongoose');

const mahasiswaSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    nim: {
        type: String,
        required: true,
    },
    jurusan: {
        type: String,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
});

const Mahasiswa = mongoose.model('Mahasiswa', mahasiswaSchema);


module.exports = Mahasiswa;
