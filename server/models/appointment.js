import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let ApptSchema = new Schema({
  pet: Object,
  owner: Object,
  vet: Object,
  datetime: Date,
});

module.exports = mongoose.model('Appointments', ApptSchema);