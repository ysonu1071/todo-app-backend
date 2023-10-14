const mongoose = require("mongoose");


const todoSchema = new mongoose.Schema({
    todo:{
        type:String,
        required: true,
    },
    completed:{
        type:Boolean,
        default: false,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}, {timestamps: true});

const TodoModel = mongoose.model('todo', todoSchema);
module.exports = TodoModel;