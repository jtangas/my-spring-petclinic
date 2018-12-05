import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let VisitSchema = new Schema({
  visitDate: Date,
  description: String,
  pet: Object,
});

module.exports = mongoose.model('Visit', VisitSchema);