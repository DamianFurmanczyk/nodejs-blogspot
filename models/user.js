const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHadler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [
      true, '⚠ Name missing! ⚠'
    ],
    trim: true
  },
  email: {
    type: String,
    required: [
      true, '⚠ email missing! ⚠'
    ],
    validate: [
      validator.isEmail, '⚠ Niewłaściwy Adres Imeil ⚠'
    ],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [
      true, '⚠ password missing! ⚠'
    ],
    trim: true
  }
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(mongodbErrorHadler);

module.exports = mongoose.model('user', userSchema);