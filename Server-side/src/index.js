const http = require("http");
const util = require("util");
const url = require("url");
const mongodb = require("mongodb");
const { portNumber, mongodbConnectionString } = require("../config/config");
const { DBResponse } = require("./DBResponse");
const { json } = require("stream/consumers");

let mongoClient;

function processRequestBody(requset,callback){
    let chunks = [];
    requset.on("data", (chunk) => {
        chunks.push(chunk);
    });
    requset.on("end", () => {
        const data = Buffer.concat(chunks);
        const querystring = data.toString();
        const parsedData = new URLSearchParams(querystring);
        const dataObj = {};
        for (var pair of parsedData.entries()) {
          dataObj[pair[0]] = pair[1];
        }
        callback(dataObj);
    });
}

const server = http.createServer(async(req,res)=>{
    let path = url.parse(req.url,true);
    let queryData = path.query;
    let rootPath = path.pathname.split("/").filter((val,ind)=>ind>0);
    let database = mongoClient.db("postnews");

    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Accept':'*',
        'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,DELETE,PUT',
        'Access-Control-Request-Method': 'OPTIONS,GET,POST,DELETE,PUT',
        'Access-Control-Max-Age': 2592000,
        'Access-Control-Allow-Headers':'*'
    };

    if(req.method.toLowerCase()==='options')
    {
        //options method
        //important,every rootpath must return OK and named headers so the request can be processed
        //example
        // if(rootPath[0]=='users'){
        //     res.writeHead(200,'OK',headers);
        //     res.end();
        // }
        //start here
        if(rootPath[0]==='users'){
            res.writeHead(200,'OK',headers);
            res.end();
        }
        else if(rootPath[0]==='objava'){
            res.writeHead(200,'OK',headers);
            res.end();
        }
        else if(rootPath[0]==='like'){
            res.writeHead(200,'OK',headers);
            res.end();
        }
        else if(rootPath[0]==='dislike'){
            res.writeHead(200,'OK',headers);
            res.end();
        }
        else{
            res.writeHead(404,'Error',headers);
            res.end();
        }
    }
    if(req.method.toLowerCase()==='get')
    {
        //get method
        if(rootPath[0]==='users'){
            if(queryData.email && queryData.password){
                const users = await database.collection('users');
                let response = new DBResponse();
                let usersArray = await users.findOne({email:queryData.email,password:queryData.password});
                if(usersArray!==null){
                    response.valid=true;
                    response.message='Correct credentials.';
                    response.data=usersArray;
                    res.writeHead(200,"OK",headers);
                    res.write(JSON.stringify(response));
                    res.end();
                }
                else{
                    response.valid=false;
                    response.message='Incorrect credentials!';
                    res.writeHead(404,"ERROR",headers);
                    res.write(JSON.stringify(response));
                    res.end();
                }
            }
            else if(queryData.email){
                const users = await database.collection('users');
                let response = new DBResponse();
                let usersArray = await users.findOne({email:{$eq:queryData.email}},{projection:{_id:0}});
                response.valid=true;
                response.message='Users found.';
                response.data=usersArray;
                res.writeHead(200,"OK",headers);
                res.write(JSON.stringify(response));
                res.end();
            }
            else{
                let response = new DBResponse();
                response.valid=false;
                response.message="Invalid request...";
                res.writeHead(404,"ERROR",headers);
                res.write(JSON.stringify(response));
                res.end();
            }
        }
        else if(rootPath[0]==='objava'){
            let response = new DBResponse();
            if(queryData.email){
                const objave = await database.collection('objava');
                let objaveArray = await objave.find(
                    {
                        'author.email':{
                            $eq:queryData.email
                        }
                    }
                );
                let arr = [];
                for await( let i of objaveArray){
                    arr.push(i);
                }
                response.valid=true;
                response.message='Objava found.';
                response.data=arr;
                res.writeHead(200,"OK",headers);
                res.write(JSON.stringify(response));
                res.end();
            }
            else if(queryData.search){
                const objave = await database.collection('objava');
                let response = new DBResponse();
                let querySearch = decodeURIComponent(queryData.search);
                let objaveArray = await objave.find(
                    {
                        name:{
                            $regex:querySearch,
                            $options:'i'
                        }
                    }
                ).sort({_id:-1});
                let arr = [];
                for await( let i of objaveArray){
                    arr.push(i);
                }
                response.valid=true;
                response.message='Objava found.';
                response.data=arr;
                res.writeHead(200,"OK",headers);
                res.write(JSON.stringify(response));
                res.end();
            }
            else{
                const objave = await database.collection('objava');
                let response = new DBResponse();
                let objaveArray = await objave.find().sort({_id:-1});
                let arr = [];
                for await( let i of objaveArray){
                    arr.push(i);
                }
                response.valid=true;
                response.message='Objava found.';
                response.data=arr;
                res.writeHead(200,"OK",headers);
                res.write(JSON.stringify(response));
                res.end();
            }
        }
        else{
            let response = new DBResponse();
            response.valid=false;
            response.message="Invalid request...";
            res.writeHead(404,"ERROR",headers);
            res.write(JSON.stringify(response));
            res.end();
        }
    }
    if(req.method.toLowerCase()==='post')
    {
        //post method
        if(rootPath[0]==='users'){
            processRequestBody(req,async (dataObj)=>{
                const users = await database.collection('users');
                let response=new DBResponse();
                if(dataObj){
                    let alreadyExists = await users.findOne({email:dataObj.email});
                    if(alreadyExists){
                        response.valid=false;
                        response.message="User with this email already exists...";
                        res.writeHead(404,"ERROR",headers);
                        res.write(JSON.stringify(response));
                        res.end();
                    }
                    else{
                        let mongoRequest = await users.insertOne(dataObj);
                        let mongoUpdate = await users.updateOne(
                            {
                                _id:mongoRequest.insertedId
                            },
                            {
                                $set:{
                                    content:[],
                                    tags:[]
                                }
                            });
                        response.valid=true;
                        response.message="User added successfully.";
                        res.writeHead(200,"OK",headers);
                        res.write(JSON.stringify(response));
                        res.end();
                    }
                }
                else{
                    response.valid=false;
                    response.message="Invalid body...";
                    res.writeHead(404,"ERROR",headers);
                    res.write(JSON.stringify(response));
                    res.end();
                }
            })
        }
        else if(rootPath[0]==='objava'){
            processRequestBody(req,async (dataObj)=>{
                if(queryData.tags && dataObj){
                        const objave = await database.collection('objava');
                        let response=new DBResponse();
                        //objave po tagovima
                        let objaveArray = await objave.find(
                            {
                                tags:{
                                    $in:JSON.parse(dataObj.tags)
                                }
                            }
                        ).sort({_id:-1});
                        let arr = [];
                        for await( let i of objaveArray){
                            arr.push(i);
                        }

                        let objaveWithoutTagsArray = await objave.find(
                            {
                                tags:{
                                    $nin:JSON.parse(dataObj.tags)
                                }
                            }
                        ).sort({_id:-1});

                        for await( let i of objaveWithoutTagsArray){
                            arr.push(i);
                        }
                        response.valid=true;
                        response.message='Objava found.';
                        response.data=arr;
                        res.writeHead(200,"OK",headers);
                        res.write(JSON.stringify(response));
                        res.end();
                }
                else if(dataObj){
                    const objave = await database.collection('objava');
                    let response=new DBResponse();
                    let postObjava = await objave.insertOne(dataObj);
                    let mongoUpdate = await objave.updateOne(
                        {
                            _id:postObjava.insertedId
                        },
                        {
                            $set:{
                                tags:JSON.parse(dataObj.tags),
                                likes:[],
                                author:JSON.parse(dataObj.author)
                            }
                        }
                    );
                    response.valid=true;
                    response.message="Post added successfully";
                    res.writeHead(200,"OK",headers);
                    res.write(JSON.stringify(response));
                    res.end();
                }
                else{
                    let response = new DBResponse();
                    response.valid=false;
                    response.message="Post not added";
                    res.writeHead(404,"Error",headers);
                    res.write(JSON.stringify(response));
                    res.end();
                }
            });
        }
        else if(rootPath[0]==='like'){
            if(queryData.email && queryData.oid){
                const users = await database.collection('users');
                const objave = await database.collection('objava');
                let response = new DBResponse();
                let alreadyLiked = await objave.updateOne(
                    {
                        _id:new mongodb.ObjectId(queryData.oid)
                    },
                    {
                        $pull:{
                            likes:queryData.email
                        }
                    }
                );
                if(alreadyLiked.modifiedCount===0){
                    let likePost = await objave.updateOne(
                        {
                            _id:new mongodb.ObjectId(queryData.oid)
                        },
                        {
                            $push:{
                                likes:queryData.email
                            }
                        }
                    );
                    
                    let getObjavaTags = await objave.findOne(
                        {
                            _id:new mongodb.ObjectId(queryData.oid)
                        },
                        {
                            tags:1,
                            likes:1
                        }
                    );
                    let userTagUpdate = await users.updateOne(
                        {
                            email:queryData.email
                        },
                        {
                            $push:{
                                tags:{
                                    $each:getObjavaTags.tags
                                }
                            }
                        }
                    );
                    response.valid=true;
                    response.message="Post liked successfully.";
                    response.data=getObjavaTags.likes.length;
                    res.writeHead(200,"OK",headers);
                    res.write(JSON.stringify(response));
                    res.end();
                }
                else{
                    let likePost = await objave.updateOne(
                        {
                            _id:new mongodb.ObjectId(queryData.oid)
                        },
                        {
                            $push:{
                                likes:queryData.email
                            }
                        }
                    );
                    response.valid=false;
                    response.message="You already like this post.";
                    res.writeHead(400,"Error",headers);
                    res.write(JSON.stringify(response));
                    res.end();
                }
            }
            else{
                let response = new DBResponse();
                response.valid=false;
                response.message="Invalid request...";
                res.writeHead(404,"ERROR",headers);
                res.write(JSON.stringify(response));
                res.end();
            }
        }
        else if(rootPath[0]==='dislike'){
            if(queryData.email && queryData.oid){
                const users = await database.collection('users');
                const objave = await database.collection('objava');
                let response = new DBResponse();
                let alreadyLiked = await objave.updateOne(
                    {
                        _id:new mongodb.ObjectId(queryData.oid)
                    },
                    {
                        $pull:{
                            likes:queryData.email
                        }
                    }
                );
                let getObjavaTags = await objave.findOne(
                    {
                        _id:new mongodb.ObjectId(queryData.oid)
                    },
                    {
                        tags:1,
                        likes:1
                    }
                );
                let userTagUpdate = await users.updateOne(
                    {
                        email:queryData.email
                    },
                    {
                        $pull:{
                            tags:{
                                $in:getObjavaTags.tags
                            }
                        }
                    }
                );
                response.valid=true;
                response.data=getObjavaTags.likes.length;
                response.message="You disliked this post.";
                res.writeHead(200,"OK",headers);
                res.write(JSON.stringify(response));
                res.end();
            }
            else{
                let response = new DBResponse();
                response.valid=false;
                response.message="Invalid request...";
                res.writeHead(404,"ERROR",headers);
                res.write(JSON.stringify(response));
                res.end();
            }
        }
        else{
            let response = new DBResponse();
            response.valid=false;
            response.message="Invalid request...";
            res.writeHead(404,"ERROR",headers);
            res.write(JSON.stringify(response));
            res.end();
        }
    }
    if(req.method.toLowerCase()==='delete')
    {
        //delete method
        if(rootPath[0]==='users'){
            if(queryData.email){
                const users = await database.collection('users');
                let response=new DBResponse();
                let mongoRequest = await users.deleteOne({email:queryData.email});
                if(mongoRequest.acknowledged && mongoRequest.deletedCount>0){
                    response.valid=true;
                    response.message="User deleted.";
                    res.writeHead(200,"OK",headers);
                    res.write(JSON.stringify(response));
                    res.end();
                }
                else{
                    let response = new DBResponse();
                    response.valid=false;
                    response.message="User not found...";
                    res.writeHead(404,"ERROR",headers);
                    res.write(JSON.stringify(response));
                    res.end();
                }
            }
            else{
                let response = new DBResponse();
                response.valid=false;
                response.message="Invalid request...";
                res.writeHead(404,"ERROR",headers);
                res.write(JSON.stringify(response));
                res.end();
            }
        }
        else if(rootPath[0]==='objava'){
            if(queryData.id){
                const objave = await database.collection('objava');
                let response=new DBResponse();
                let mongoRequest = await objave.deleteOne({_id:new mongodb.ObjectId(queryData.id)});
                if(mongoRequest.acknowledged && mongoRequest.deletedCount>0){
                    response.valid=true;
                    response.message="Objava successfully deleted.";
                    res.writeHead(200,"OK",headers);
                    res.write(JSON.stringify(response));
                    res.end();
                }
                else{
                    let response = new DBResponse();
                    response.valid=false;
                    response.message="Objava not found...";
                    res.writeHead(404,"ERROR",headers);
                    res.write(JSON.stringify(response));
                    res.end();
                }
            }
            else{
                let response = new DBResponse();
                response.valid=false;
                response.message="Invalid request...";
                res.writeHead(404,"ERROR",headers);
                res.write(JSON.stringify(response));
                res.end();
            }
        }
        else{
            let response = new DBResponse();
            response.valid=false;
            response.message="Invalid request...";
            res.writeHead(404,"ERROR",headers);
            res.write(JSON.stringify(response));
            res.end();
        }
    }
    if(req.method.toLowerCase()==='put')
    {
        //put method
        if(rootPath[0]==='objava'){
            processRequestBody(req,async (dataObj)=>{
                if(dataObj){
                    const objave = await database.collection('objava');
                    let response = new DBResponse();
                    if(dataObj.text!==null){
                        let mongoResponse = await objave.updateOne(
                            {
                                _id:new mongodb.ObjectId(dataObj.id)
                            },
                            {
                                $set:{
                                    text:dataObj.text
                                }
                            }
                        );
                    }
                    if(dataObj.picture!==null){
                        mongoResponse = await objave.updateOne(
                            {
                                _id:new mongodb.ObjectId(dataObj.id)
                            },
                            {
                                $set:{
                                    picture:dataObj.picture
                                }
                            }
                        );
                    }
                    response.valid=true;
                    response.message='Objava changed...';
                    res.writeHead(200,"OK",headers);
                    res.write(JSON.stringify(response));
                    res.end();
                }
                else{
                    let response = new DBResponse();
                    response.valid=false;
                    response.message='Invalid request...';
                    res.writeHead(404,"Error",headers);
                    res.write(JSON.stringify(response));
                    res.end();
                }
            });

        }
        else{
            let response = new DBResponse();
            response.valid=false;
            response.message="Invalid request...";
            res.writeHead(404,"ERROR",headers);
            res.write(JSON.stringify(response));
            res.end();
        }
    }
});

server.listen(portNumber,()=>{
    console.log("Listening on port "+portNumber+"...\n");
    //start here
    mongoClient = new mongodb.MongoClient(mongodbConnectionString);
    console.log("ALL DONE...\n");
});