const express = require("express");
const app = express();
const path = require("path");
const personajesRoutes = require("./routes/personajes")
const peliculasRoutes = require("./routes/peliculas")
const cors = require("cors")

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3010, ()=>{ 
    console.log("El servidor RED corriendo en: http://localhost:3010/");
});

app.use("/characters", personajesRoutes)
app.use("/movies", peliculasRoutes)