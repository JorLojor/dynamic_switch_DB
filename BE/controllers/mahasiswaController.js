const MahasiswaMongo = require('../models/mongo/mahasiswa');
const MahasiswaPostgre = require('../models/postgre/mahasiswa');

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
        const activeDB = req.app.get('activeDB');
        console.log('Active DB:', activeDB);

        if (activeDB === 'mongodb') {
            console.log('Querying MongoDB');
            const MongoMahasiswa = await MahasiswaMongo.find();
            return res.json(MongoMahasiswa);

        } else if (activeDB === 'postgresql') {
            console.log('Querying PostgreSQL');
            const PstgreMahasiswa = await MahasiswaPostgre.findAll();
            return res.json(PstgreMahasiswa);
        }

        res.status(400).json({ message: 'Database type not set or invalid' });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error);
    }
};


module.exports = { postMahasiswa, getMahasiswa };
