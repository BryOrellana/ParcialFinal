const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var refriSchema = new Schema({
    marca: {
        type: String,
        required: true
    },
    color: {
        color: String
    },
    tamaño: {
        tamaño: Number
    },
    puertas: {
        cantidad: Number
    },
    login_count: Number
}, {
    timestamps: true
});

module.exports = mongoose.model("refri", refriSchema);