const mongoose = require('mongoose');
const UserSchema = require('./user');

const AdminSchema = new mongoose.Schema({
   
});

const Admin = UserSchema.discriminator('Admin', AdminSchema);

module.exports = mongoose.model('Admin');
