var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Formateur = new Schema({
    cin:Number,
    nom:String,
    prenom:String,
    specialite:String
});

module.exports = mongoose.model('formateur', Formateur);