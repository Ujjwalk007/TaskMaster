const mon = require('mongoose');

const connection = "mongodb+srv://UK:mongo%40uk@cluster0.awsgmde.mongodb.net/todoData";

mon.connect(connection);
console.log('Database Connected!!')

const todoSchema = new mon.Schema({

    title : String,
    description : String,
    stat : Boolean
})

const UserData = new mon.Schema({

   user: String,
   password:String
})








module.exports = {
    
    todoSchema,
    UserData,
    mon
}