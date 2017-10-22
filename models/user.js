const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHadler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [
      true, '⚠ Username missing! ⚠'
    ],
    trim: true,
    unique: [true, 'Username already taken']
  },
  email: {
    type: String,
    lowercase: true,
    required: [
      true, '⚠ Email missing! ⚠'
    ],
    validate: [
      validator.isEmail, '⚠ Email is invalid ⚠'
    ],
    trim: true,
    unique: [true, 'Email is already in use']
  },
  ispublic: {
    required: true,
    type: String
  }
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(mongodbErrorHadler);

module.exports = mongoose.model('user', userSchema);