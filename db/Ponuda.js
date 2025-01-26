const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes){
    const Ponuda = sequelize.define('Ponuda', {
        tekst: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        cijenaPonude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        datumPonude: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        odbijenaPonuda: {
            allowNull: true,
            type: DataTypes.BOOLEAN,
            defaultValue: null,
        },
    },
    {
        freezeTableName: true,
    }
)
    return Ponuda;
};