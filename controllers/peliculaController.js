const db = require('../db/models');
const { Op } = require("sequelize");

module.exports = {

    //Mostrar todas las peliculas y series
    list: function(req, res){
        let arrayPeliculas = [];
        db.Pelicula.findAll({
        raw: true
        })
        .then((e) => {
            e.forEach( pelicula =>  arrayPeliculas.push(
                {
                    titulo: pelicula.titulo,
                    imagen: pelicula.imagen
                }
            ))
    
            let dataPeliculas = {
                count: e.length,
                peliculas: arrayPeliculas,
            }
            return res.json(dataPeliculas)
    }
    )
    },

    //Mostrar una pelicula
    show: async (req, res) => {

        let pelicula = await db.Pelicula.findOne({
            raw: true,
            attributes: ['id', 'imagen', 'titulo', 'fecha_creacion', 'calificacion', 'genero_id'],
            include: [{ association: "personajes", attributes: ["nombre"] }, /*{ association: "generos", attributes: ["nombre"] }*/],
            where: {
                id: req.params.id
            }
        })

        res.json(pelicula?? {'error':'Pelicula no encontrada'})
    },

    //Crear pelicula
    create: (req, res) => {
        db.Pelicula.create({
            imagen: req.body.imagen,
            titulo: req.body.titulo,
            fecha_creacion: req.body.fecha_creacion,
            calificacion: req.body.calificacion,
            genero_id: req.body.genero_id
        })
        return res.json({
            "messagge": "Pelicula crerada con exito!"
        })
    },

    //Actualizar pelicula
    update: (req, res) => {
        db.Pelicula.update({
            imagen: req.body.imagen,
            titulo: req.body.titulo,
            fecha_creacion: req.body.fecha_creacion,
            calificacion: req.body.calificacion,
            genero_id: req.body.genero_id,
        }, {where: {
                id:req.params.id
        }})
        return res.json({
            "messagge": "Pelicula actualizada con exito!"
        })
    },

    //Eliminar pelicula
    destroy: (req,res) => {
        db.Pelicula.destroy({
            where:{
                id: req.params.id
            }
        })
        return res.json({
            "messagge": "Pelicula eliminada con exito!"
        })
    },

    //Buscar pelicula
    search: (req, res) => {
        db.Pelicula.findAll({
            where: {
                [Op.or]: [{
                        titulo: {
                            [Op.like]: '%' + req.query.titulo + '%'
                        }
                    },
                    {
                        genero_id: {
                            [Op.substring]: '%' + req.query.idGenero + '%'
                        }
                    },
                ]
            },
            order:[
                ["fecha_creacion", "ASC"]
            ]
        })
        .then(peliculas => {
            if(peliculas.length > 0){
                return res.json(peliculas)
            }
            return res.json("No existe esa pelicula")
        })
    },
}

