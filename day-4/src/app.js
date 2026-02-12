const express = require('express');

const app = express();
app.use(express.json());

const notes=[
    {
        "title":"title 1",
        "description":"description 1"
    },
    {
        "title":"title 2",
        "description":"description 2"
    },
    {
        "title":"title 3",
        "description":"description 3"
    }
];

app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.post('/notes',(req,res)=>{
    console.log(req.body);
    notes.push(req.body);
    console.log(notes);
    
    res.send("Note added successfully");
})

app.get('/notes',(req,res)=>{
    res.send(notes)
})

app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index]
    if(notes[req.params.index]===undefined){
        return res.status(404).send("Note not found")
    }else if(notes[req.params.index]>=notes.length){
        return res.status(404).send("note not found")
    }else
    res.send("Note deleted successfully")
    
})

app.patch('/notes/:index',(req,res)=>{

    notes[req.params.index].description=req.body.description;
    notes[req.params.index].title=req.body.title;
    
    res.send("Note deleted successfully")
})

module.exports=app;