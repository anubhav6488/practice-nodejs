const express=require('express')
const dbconnect=require('./mongodb')
const mongodb=require('mongodb')
const app=express();

app.use(express.json());


app.get('/',async (req,resp)=>{

    let data=await dbconnect();

    data=await data.find({}).toArray();

   
    resp.send(data)






});

app.post('/',async (req,resp)=>
{
    let data= await dbconnect();
    //data= await data.find({}).toArray();

    //resp.send({name:"anubhav"})
    //console.log(data)
    let result=await data.insertOne(req.body)
    resp.send(result)

    console.log(req.body);



});

app.put("/:_id",async (req,resp)=>{
console.log(resp)
    let data=await dbconnect();
    let result=await data.updateOne(
        {id: req.params.id},
        { $set:req.body.body}

    )
    console.log('req====',result);
    resp.send({ result:"updated"});


});

app.delete('/:id', async(req,resp)=>{


    const data=await dbconnect();
    console.log(req.params.id)
    const result= await data.deleteOne({_id:new mongodb.ObjectId(req.params.id)})
    console.log(req.params.id)

resp.send(result)
console.log(result)
    

});


app.listen(5800);
