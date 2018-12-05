import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let OwnerSchema = new Schema({
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  telephone: String,
});

module.exports = mongoose.model('Owner', OwnerSchema);
