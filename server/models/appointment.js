import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let ApptSchema = new Schema({
  pet: Schema.ObjectId,
  owner: Schema.ObjectId,
  vet: Schema.ObjectId,
  datetime: Date,
});

module.exports = mongoose.model('Appointments', ApptSchema);