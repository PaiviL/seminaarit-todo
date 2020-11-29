const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    priority: String,
    todo: String,
});

const Todo = mongoose.model('Todo', todoSchema);

// todoSchema.statics.findAll = async function () {
//     const todos = await find()
//     console.log(todos);
// }

module.exports = mongoose.model('Todo', todoSchema);