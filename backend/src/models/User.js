const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
});

module.exports = mongoose.model('User', UserSchema);

//Controllers= Regras de negócio da aplicação