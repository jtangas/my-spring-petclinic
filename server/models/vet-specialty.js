import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let VetSpecialtySchema = new Schema({
  name: String,
});

module.exports = mongoose.model('VetSpecialty', VetSpecialtySchema);