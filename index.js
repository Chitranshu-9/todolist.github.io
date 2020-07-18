const express = require('express');
const path = require('path');
const port = 8000;

// setting up database
const db = require('./config/mongoose');
const TODO_List = require('./models/TODO_List');

const app = express();

 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// adding parser to handle the encoded data
app.use(express.urlencoded());

// using static files
app.use(express.static('assets'));

// arrray to store "task/ data" by the user 
var todolist= [
    {
        task:"",
        category:"",
        date:""
    }
]

// handling request for the home page

app.get('/', function(req, res){
    // fetching data from db
    TODO_List.find({}, function(err, tasks){
            if(err){console.log('Error in fetching contact');
            return;
        }

        return res.render('home',{ 
            title:"TODO List Application",
            todo_list: tasks
        });
    
    });
    
    
});

// handling req for the "added-task" to the list and adding to the database
app.post('/create-tasklist', function(req,res){
    
    // pushing parsed data to "todolist" array
    // todolist.push(req.body);
    TODO_List.create({
        task: req.body.task,
        category: req.body.category,
        date: req.body.date
    }, function(err, newtask){
        if(err){console.log('error in creating the contact'); return;}
        
        console.log(newtask);
        return res.redirect('back');
    });

});

// for deleting a task
app.get('/delete-task/', function(req, res){
    // get the id from the query in the url
    let id= req.query.id;

    // finding the tak using id and delete it
    TODO_List.findByIdAndDelete(id, function(err){
        if(err){console.log('Error in deleting object from database');
        return;
        }
        return res.redirect('back');
    });
    
});


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);

    }
    console.log('server is up and running on port:', port);

});