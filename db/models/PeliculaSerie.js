module.exports = (sequelize, dataTypes) => {
    let alias = "Pelicula";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        imagen: {
            type: dataTypes.STRING(255),
        },
        titulo: {
            type: dataTypes.STRING(255),
        },
        fecha_creacion: {
            type: dataTypes.DATE,
        },
        calificacion: {
            type: dataTypes.TINYINT(5),
        },
        genero_id: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: "pelicula_serie",
        timestamps: false,
    }
    const Pelicula = sequelize.define(alias, cols, config);

    Pelicula.associate = function (models) {
        Pelicula.belongsTo(models.Genero,{
            as: 'generos',
            foreingKey: 'genero_id',
        })
    }

    Pelicula.associate = function(models) {
        Pelicula.hasMany(models.Personaje, {
            as: "personajes",
            foreignKey: "pelicula_serie_id",
        })
    }

    return Pelicula;

}