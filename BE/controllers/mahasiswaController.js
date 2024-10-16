const MahasiswaMongo = require('../models/mongo/mahasiswa');
const MahasiswaPostgre = require('../models/postgre/mahasiswa');
const { activeDB } = require('../config/dbConnections');

// post data mahasiswa
const postMahasiswa = async (req, res) => {
    const { nama, nim, jurusan, alamat } = req.body;
    try {
        if (req.app.get('activeDB') === 'mongodb') {
            const mahasiswa = new MahasiswaMongo({
                nama,
                nim,
                jurusan,
                alamat,
            });
            await mahasiswa.save();
        } else if (req.app.get('activeDB') === 'postgresql') {
            await MahasiswaPostgre.create({
                nama,
                nim,
                jurusan,
                alamat,
            });
        }
        res.status(201).send('Data mahasiswa berhasil ditambahkan');
    } catch (error) {
        res.status(500).send(error);
    }
};

const getMahasiswa = async (req, res) => {
    try {
        console.log('Active Database:', activeDB);
        if (activeDB === 'mongodb') {
            const mahasiswa = await MahasiswaMongo.find();
            res.status(200).json(mahasiswa);
        } else if (activeDB === 'postgresql') {
            const mahasiswa = await MahasiswaPostgre.findAll();
            res.status(200).json(mahasiswa);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
};

module.exports = { postMahasiswa, getMahasiswa };
