const mongoose = require('mongoose');

const TODO_List_Schema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    category: {
        type:String,
        required: true
    },
    date: {
        type:Date,
        required: true
    }
});


const TODOList = mongoose.model('TODOList', TODO_List_Schema);

module.exports = TODOList;