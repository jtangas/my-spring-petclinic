import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let PetSchema = new Schema({
  name: String,
  birthDate: Date,
  type: Object,
  owner: Object,
});

module.exports = mongoose.model('Pet', PetSchema);