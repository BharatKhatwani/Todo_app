const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User Schema
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
    { timestamps: true }
);

// Hash the password before saving the user
// UserSchema.pre('save', async function (next) {
//     const person = this;

//     // ✅ FIX: Hash password ONLY if it's modified or newly created
//     if (!person.isModified('password')) {
//         return next();
//     }

//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(person.password, salt);
//         person.password = hashedPassword;  // ✅ Store hashed password correctly
//         next();
//     } catch (error) {
//         return next(error);
//     }
// });

// // Compare entered password with stored hashed password
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };

const User = mongoose.model('User', UserSchema);
module.exports = User;
