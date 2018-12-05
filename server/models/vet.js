import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let VetSchema = new Schema({
  firstName: String,
  lastName: String,
  specialties: Array,
});

module.exports = mongoose.model('Vet', VetSchema);