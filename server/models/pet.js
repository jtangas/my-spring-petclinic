import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let PetSchema = new Schema({
  name: String,
  birthDate: Date,
  petType: Schema.ObjectId,
  owner: Schema.ObjectId,
});

module.exports = mongoose.model('Pet', PetSchema);
