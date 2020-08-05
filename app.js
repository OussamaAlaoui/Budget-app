const express=require('express');
const nedb=require('nedb');
const app=express();
app.listen('8000',()=>{console.log("Server started listening at port 8000");});
app.use(express.json());
app.use(express.static('public'));
const database=new nedb('database.db');
database.loadDatabase();
const today=new Date();
app.get('/app',(req,res)=>
{
    database.find({ "date.month": today.getMonth()+1,"date.year":today.getFullYear() }, function(err, doc) {
        res.json(doc);
        });
  
});

app.post('/app',(req,res)=>{
    
      const data=req.body;
  
    database.insert(data);
});

app.post('/delete',(req,res)=>{
    
   
    console.log(req.body.id);
//     const data=req.body;
   database.remove({"_id":req.body.id}, {multi: true}, function (err, result) {
    console.log('item delted');

    });
});
