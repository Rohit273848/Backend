const express = require('express');
const noteModel = require('../models/notes.model');
const app = express();

app.use(express.json());

app.post('/api/notes',async(req,res)=>{
     const {title,description,createdAt} = req.body;
     const note = await noteModel.create({title,description,createdAt});
     res.status(200).json({
          message:"Note created successfully",
          note
     });
})

app.get('/api/notes',async (req,res)=>{
     const notes = await noteModel.find();
     res.status(200).json(notes);
})

app.delete('/api/notes/:id',async (req,res)=>{
     const id = req.params.id;
     await noteModel.findByIdAndDelete(id);
     res.status(200).json({
          message:"Note deleted successfully"
     })
})

app.patch('/api/notes/:id',async (req,res)=>{
     const id = req.params.id;
     const {description,createdAt} = req.body;
     const note = await noteModel.findByIdAndUpdate(id,{description,createdAt});
     res.status(200).json({
          message:"Note updated successfully",
          note
     })
})

module.exports = app;