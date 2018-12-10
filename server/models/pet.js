import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let PetSchema = new Schema({
  name: String,
  birthDate: Date,
  petType: String,
  owner: String,
});

module.exports = mongoose.model('Pet', PetSchema);
