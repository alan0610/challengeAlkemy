module.exports = (sequelize, dataTypes) => {
    let alias = "Genero";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        imagen: {
            type: dataTypes.STRING(255),
            allowNull: false
        }
    }

    let config = {
        tableName: "genero",
        timestamps: false,
    }
    const Genero = sequelize.define(alias, cols, config);

    Genero.associate = function (models) {
        Genero.hasMany(models.Pelicula,{
            as: 'peliculas',
            foreingKey: "genero_id",
        })
    }

    return Genero;

}