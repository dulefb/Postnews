const portNumber = 6500;
const mongodbConnectionString="mongodb://localhost/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.3";

module.exports={
    portNumber,
    mongodbConnectionString
}