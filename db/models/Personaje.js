module.exports = (sequelize, dataTypes) => {
    let alias = "Personaje";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        imagen: {
            type: dataTypes.STRING(255),
        },
        nombre: {
            type: dataTypes.STRING(255),
        },
        edad: {
            type: dataTypes.INTEGER(11)
        },
        peso: {
            type: dataTypes.STRING(255),
        },
        historia: {
            type: dataTypes.STRING(255),
        },
        pelicula_serie_id: {
            type: dataTypes.INTEGER(11)
        }
    }

    let config = {
        tableName: "personaje",
        timestamps: false,
    }
    const Personaje = sequelize.define(alias, cols, config);

    Personaje.associate = function(models) {
        Personaje.belongsTo(models.Pelicula, {
            as: "peliculas",
            foreignKey: "pelicula_serie_id",
        })
    }

    return Personaje;

}