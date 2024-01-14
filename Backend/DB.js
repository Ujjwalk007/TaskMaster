const mon = require('mongoose');
mongoose.set('strictQuery', true);


mon.connect("mongodb+srv://UK:mongo%40uk@cluster0.awsgmde.mongodb.net/todoData");
console.log('Database Connected!!')

const todoSchema = new mon.Schema({

    title : String,
    description : String,
    stat : Boolean
})




const todolist = mon.model('todo',todoSchema);

module.exports = {
    todolist
}