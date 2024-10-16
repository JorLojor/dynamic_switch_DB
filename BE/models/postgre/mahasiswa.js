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
});

module.exports = Mahasiswa;
