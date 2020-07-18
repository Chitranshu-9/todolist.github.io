// importing library
const mongoose = require('mongoose');

//connecting to database
mongoose.connect('mongodb://localhost/TODO_List_db');

// acquire the connection( if connection is successful)
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error connecting to db'));

// up and  running then print message
db.once('open', function(){
    console.log('Succesfully connected to the database');
})