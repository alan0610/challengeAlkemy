const db = require('../db/models');

module.exports = {

    //Mostrar todos los personajes
    list: function(req, res){
        let arrayPersonajes = [];
        db.Personaje.findAll({
        raw: true
        })
        .then((e) => {
            e.forEach( personaje =>  arrayPersonajes.push(
                {
                    nombre: personaje.nombre,
                    imagen: personaje.imagen
                }
            ))
    
            let dataPersonajes = {
                count: e.length,
                personajes: arrayPersonajes,
            }
            return res.json(dataPersonajes)
    }
    )
    },

    //Mostrar un personaje
    show: async (req, res) => {

        let personaje = await db.Personaje.findOne({
            raw: true,
            attributes: ['id', 'imagen', 'nombre', 'edad', 'peso', 'historia'],
            include: [{ association: "peliculas", attributes: ["titulo"] }],
            where: {
                id: req.params.id 
            }
        })

        res.json(personaje?? {'error':'Personaje no encontrado'})
    },


    //Crear personaje
    create: (req, res) => {
        db.Personaje.create({
            imagen: req.body.imagen,
            nombre: req.body.nombre,
            edad: req.body.edad,
            peso: req.body.peso,
            historia: req.body.historia,
            pelicula_serie_id: req.body.pelicula_serie_id
        })
        return res.json({
            "messagge": "Personaje crerado con exito!"
        })
    },

    //Actualizar personaje
    update: (req, res) => {
        db.Personaje.update({
            imagen: req.body.imagen,
            nombre: req.body.nombre,
            edad: req.body.edad,
            peso: req.body.peso,
            historia: req.body.historia,
            pelicula_serie_id: req.body.pelicula_serie_id
        }, {where: {
                id:req.params.id
        }})
        return res.json({
            "messagge": "Personaje actualizado con exito!"
        })
    },

    //Eliminar personaje
    destroy: (req,res) => {
        db.Personaje.destroy({
            where:{
                id: req.params.id
            }
        })
        return res.json({
            "messagge": "Personaje eliminado con exito!"
        })
    },

    //Buscar personaje
    search: (req, res) => {
        db.Personaje.findAll({
            where: {
                [Op.or]: [{
                        nombre: {
                            [Op.like]: '%' + req.query.name + '%'
                        }
                    },
                    {
                        edad: {
                            [Op.substring]: '%' + req.query.age + '%'
                        }
                    },
                    {
                        peso: {
                            [Op.substring]: '%' + req.query.weight + '%'
                        }
                    },
                    {
                        pelicula_serie_id: {
                            [Op.substring]: '%' + req.query.idMovie + '%'
                        }
                    }
                ]
            }
        })
        .then(personajes => {
            if(personajes.length > 0){
                return res.json(personajes)
            }
            return res.json("No existe ese personaje")
        })
    },
}