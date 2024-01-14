const exp = require('express');
const cors = require('cors')
const { todolist } = require('./DB')
const { newtodo } = require('./check')
const body_parser = require('body-parser')


const app = exp();

app.use(cors());
app.use(exp.json());


app.get('/all',async function(req,res){

    const r = await todolist.find({});
    res.json({"todolist":r});

})

app.post('/create',async function(req,res){

    const newObj = req.body;

    if( !newtodo.safeParse(newObj).success )
    {
        res.status(404).send("Wrong input");
        return;
    }

    await todolist.create(newObj);
    res.json({"Msg":"Success"});
})

app.delete('/del',async function(req,res){

    const id = req.body.id;

        try{
            await todolist.findByIdAndDelete(id);
            res.send("Object Deleted...");
        }catch{
            res.status(400).send("Object not exist...");
        }   
})

app.post('/done',async function(req,res){

    const id = req.body.id;
    try{
        await todolist.findByIdAndUpdate(id,{stat:true});
        res.send("Done...");
    }catch{
        res.send("Update Failed...");
    }

})

console.log("Server starting...");
const PORT = process.env.PORT || 5000;
app.listen(PORT);