const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String,  }, // User's username
    email:{type:String,required: true,unique: true },
    password:{type:String,required: true},
    userType:{type:String}
    
});
module.exports = mongoose.model('User', userSchema);