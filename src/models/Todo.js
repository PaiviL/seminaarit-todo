const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    priority: String,
    todo: String,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = mongoose.model('Todo', todoSchema);