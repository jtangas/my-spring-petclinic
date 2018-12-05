import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let PetTypeSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('PetType', PetTypeSchema);