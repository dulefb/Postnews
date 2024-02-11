const http = require("http");
const util = require("util");
const url = require("url");
const mongodb = require("mongodb");
const { portNumber, mongodbConnectionString } = require("../config/config");

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
        if(rootPath[0]=='users'){
            res.writeHead(200,'OK',headers);
            res.end();
        }
    }
    if(req.method.toLowerCase()==='get')
    {
        //get method
        if(rootPath[0]==='users'){
            const users = await database.collection('users');

            let response = await users.find(/*{email:{$eq:"michaelf@gmail.com"}},{projection:{_id:0}}*/);
            let arr = [];
            for await( let i of response){
                arr.push(i);
            }
            res.writeHead(200,"OK",headers);
            res.write(JSON.stringify(arr));
            res.end();
        }
    }
    if(req.method.toLowerCase()==='post')
    {
        //post method
        if(rootPath[0]==='users'){
            const users = await database.collection('users');
            let user ={
                name:"Smiljko",
                lastname:"Milic",
                age:25,
                email:"smiljko@gmail.com"
            };
            let response = await users.insertOne(user);
            res.writeHead(200,"OK",headers);
            res.write(JSON.stringify(response));
            res.end();
        }
    }
    if(req.method.toLowerCase()==='delete')
    {
        //delete method
        
    }
    if(req.method.toLowerCase()==='put')
    {
        //put method
    }
});

server.listen(portNumber,()=>{
    console.log("Listening on port "+portNumber+"...\n");
    //start here
    mongoClient = new mongodb.MongoClient(mongodbConnectionString);
    console.log("ALL DONE...\n");
});