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

app.get('/elem/:id',(req,res)=>{
    
    var id=req.params.id;
     database.findOne({ "_id": id}, function(err, doc) {
         if(err)
         throw err;
         res.json(doc);
        });
});
app.post('/delete',(req,res)=>{
    
   
   
//     const data=req.body;
   database.remove({"_id":req.body.id}, function (err, result) {
       if (err)
       throw err;

    console.log('item delted!');

    });
});
app.post('/edit/:id',(req,res)=>{
    
 //   console.log(req.body.description);
  const id =req.params.id;
database.update(
    { _id: id }, 
    { $set: { type: req.body.type, description: req.body.description,amount: req.body.amount}},
    {},// this argument was missing
    function (err, numReplaced) {
      console.log("replaced---->" + numReplaced);
    }
    );
});

