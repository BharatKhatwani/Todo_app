const mongoose = require('mongoose');

const UserSchema =  new mongoose.Schema({
    username : {
        type : String,
        required : true, 
        unique : true

    }, 
   email :{
    type : String ,
    require : true, 
    unique : true
   }, 
   password : {
    type : String ,
    required : true

   }

})

UserSchema.pre('save', async function(next){
    if(!this.isModified('password') ) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(err);
    }
})

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);
module.exports = User;





/*
UserSchema.pre('save', async function(next)):

This is a Mongoose middleware that runs before saving the user document.
It checks if the password is modified. If it is, it hashes the password using bcrypt before saving it to the database.
If hashing is successful, it proceeds with the save; if not, it throws an error.
UserSchema.methods.comparePassword:

This method is used to compare the entered password (during login) with the hashed password stored in the database.
It uses bcrypt.compare() to check if the passwords match and returns true or false.

*/