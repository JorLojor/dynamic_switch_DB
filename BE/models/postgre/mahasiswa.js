const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/dbConnections');

const Mahasiswa = sequelize.define('Mahasiswa', {
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nim: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jurusan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true
});


sequelize.sync({ force: false })
    .then(() => {
        console.log('Tabel Mahasiswa sudah disinkronkan.');
    })
    .catch((err) => {
        console.error('Error saat sinkronisasi tabel:', err);
    });

module.exports = Mahasiswa;
