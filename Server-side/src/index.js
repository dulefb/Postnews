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
                response.valid=true;
                response.message='Correct credentials.';
                response.data=usersArray;
                res.writeHead(200,"OK",headers);
                res.write(JSON.stringify(response));
                res.end();
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
            if(queryData.tags){
                const objave = await database.collection('objava');
                //objave po tagovima
                let objaveArray = await objave.find();
                let arr = [];
                for await( let i of response){
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
                let objaveArray = await objave.find();
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
                    if(alreadyExists!==null){
                        response.valid=false;
                        response.message="User with this email already exists...";
                        res.writeHead(404,"ERROR",headers);
                        res.write(JSON.stringify(response));
                        res.end();
                    }
                    else{
                        let mongoRequest = await users.insertOne(dataObj);
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
                if(dataObj){
                    const objave = await database.collection('objava');
                    let response=new DBResponse();
                    let postObjava = await objave.insertOne(dataObj);
                    console.log(postObjava);
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
                // console.log(mongoRequest);
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
                console.log(mongoRequest);
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