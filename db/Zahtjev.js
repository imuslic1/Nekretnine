const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes){
    const Zahtjev = sequelize.define('Zahtjev', {
        tekst: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        trazeniDatum: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        odobren: {
            allowNull: true,
            type: DataTypes.BOOLEAN,
            defaultValue: null,
        },
    },
    {
        freezeTableName: true,
    })
    return Zahtjev;
};