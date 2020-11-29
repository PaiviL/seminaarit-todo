const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/tek-seminaarit';
const Todo = require('./models/Todo');

mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', err => {
    console.error('connection error:', err)
})
db.once('open', _ => {
    console.log('Database connected:', url)
})

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {

    res.sendFile(__dirname + '/template/welcomeForm.html');
})

app.get('/todolist', function (req, res) {

    let { priority } = req.query;

    if (priority === undefined) {   // no parameter given
        Todo.find( function(error, todos) { 
            if (error) console.error(error)
            console.log(todos)
            res.json(todos)
        })
    } else {                        // priority parameter given
        Todo.find({ priority: priority }, function(error, todos) { 
            if (error) console.error(error)
            console.log(todos)
            res.json(todos)
        })
    }
})

app.post('/todos', function (req, res) {
    console.log(req.body);

    const todo = new Todo({
        priority: req.body.priority, 
        todo: req.body.todo,
    });

    todo.save(function (error, savedTodo) {
        if (error) console.error(error)
        console.log(savedTodo)
        res.redirect('/todolist')
    })
})

app.get('/deletetodo', function (req, res) {

    res.sendFile(__dirname + '/template/deleteForm.html');
})

app.post('/deletetodos', function (req, res) {
    console.log(req.body);

    Todo.findByIdAndRemove({ _id: req.body.id }, function(error, rmvdTodo) {
        if (error) console.error(error)
        console.log(rmvdTodo)
        res.redirect('/todolist')
    })
})
 
app.listen(3000, () => console.log('running'))