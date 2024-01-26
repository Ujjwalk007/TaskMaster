const exp = require('express');
const cors = require('cors')
const { todoSchema,mon,UserData } = require('./DB')
const { newtodo } = require('./check')
const body_parser = require('body-parser')


const user = new mon.model('UserData',UserData);
var todolist;

const app = exp();

app.use(cors());
app.use(exp.json());


async function validate(req,res,next)
{
    const userr = req.headers['username'];
    const pass = req.headers['password'];

    if( userr===null || pass === null )
    res.status(404).send("Empty");


    const u = await user.find({"user":userr,"password":pass});

    if(u.length > 0)
    {
        todolist = mon.model(userr,todoSchema);
        next();
    }
    else
    {
        res.status(404).send("Empty");
    }
    
}

app.get('/all',validate,async function(req,res){

    const r = await todolist.find({});
    res.json({"todolist":r});

})

app.post('/create',validate,async function(req,res){

    const newObj = req.body;

    if( !newtodo.safeParse(newObj).success )
    {
        res.status(404).send("Wrong input");
        return;
    }

    await todolist.create(newObj);
    res.json({"Msg":"Success"});
})

app.delete('/del',validate,async function(req,res){

    const id = req.body.id;

        try{
            await todolist.findByIdAndDelete(id);
            res.send("Object Deleted...");
        }catch{
            res.status(400).send("Object not exist...");
        }   
})

app.post('/done',validate,async function(req,res){

    const id = req.body.id;
    try{
        await todolist.findByIdAndUpdate(id,{stat:true});
        res.send("Done...");
    }catch{
        res.send("Update Failed...");
    }

})

//Login functions

app.post('/log',async function(req,res){

    const username = req.body.username;
    const password = req.body.password;

    const u = await user.findOne({"user":username,"password":password});

    if(u)
    {
        todolist = mon.model(username,todoSchema);
        res.send("True");
    }
    else
    {
        res.send("False");
    }



})

app.post('/newuser',async function(req,res){

    const username = req.body.username;
    const password = req.body.password;

    const check = await user.findOne({user:username});

    if(check)
    {
        res.send("Exist");
    }
    else
    {
        user.create({user:username,password:password});
        res.send("NotExist");
    }
    

})




app.listen(5000);