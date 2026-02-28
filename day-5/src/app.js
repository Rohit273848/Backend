const express = require('express');

const app = express();
app.use(express.json());

const notes =[
    {
        title:"day 5 title",
        description:"day 5 description"
    }
];

app.get('/',(req,res)=>{
    res.send("day 5 - today we will learn about database and how to connect it with our node js application (Notes app)");
})

app.post('/Notes',(req,res)=>{
    notes.push(req.body);
    // console.log(req.body);
    
    res.status(201).json({
        message:"Note added successfully"
    })
})

app.get('/notes',(req,res)=>{
    res.status(200).json({
        note:notes
    })
})

app.delete('/Notes/:index',(req,res)=>{
    delete notes[req.params.index];
    res.status(200).json({
        message:"Note deleted successfully"
    })
})

app.patch('/Notes/:index',(req,res)=>{
    notes[req.params.index].description=req.body.description;

    res.status(200).json({
        message:"Notes Updated Successfuly"
    })
})


module.exports = app;