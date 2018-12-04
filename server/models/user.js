import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
});

module.exports = mongoose.model('User', UserSchema);
