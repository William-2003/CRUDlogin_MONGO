const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    fecha_expiracion: String,
    tipo_tarjeta: String,
    nombre_titular: String,
    numero_tarjeta: Number,
    codigo_seguridad: Number

});

const Card = mongoose.model('card', cardSchema);

module.exports = Card;

