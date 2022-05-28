const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    Departamento: String,
    Codigo_Postal: Number,
    Pais: String,
    Estado_civil: String,
    Ciudad: String,
    Direccion: String,
    Nombre_usuario: String,
    Email: String,
    Numero_secreto: String,
    Contraseña: String
})

// crear modelo
const User = mongoose.model('User', userSchema);


module.exports = User;