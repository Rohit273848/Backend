const { log } = require('console');
const express = require('express');

const app = express();
app.use(express.json());

const note=[
   
]

app.post('/Notes',(req,res)=>{

    console.log(req.body);
     
    note.push(req.body)

    res.send(note);
})

app.listen(3000 ,()=>{
    console.log('Server is running on port 3000');
});