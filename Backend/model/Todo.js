

const mongoose = require('mongoose');
const User = require('./User')
const TodoSchema = new mongoose.Schema  (
{
    title :{
        type:String,
        required:true

    }, 
    description : {
        type:String,
        required:true

    },
    complete : {
        type:Boolean,
        default:false

    }, 
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User, // Reference to the User model
        required: true,
      },

}, 
{ timestamps: true }
)

// User: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;