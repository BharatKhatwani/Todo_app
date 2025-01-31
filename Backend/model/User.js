const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

// Hash password before saving
UserSchema.pre('save', async function(next) {
       const person  = this;
       if (person.isModified('password')) {
        return next();
       }
       try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        User.password = hashedPassword;
        next();
       }
       catch(error){
        return next(error);
       }
})
// Compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
