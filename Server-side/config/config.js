const portNumber = 6500;
const username = 'root';
const password = 'secretpassword'
const DBport = '27017';
const mongodbConnectionString='mongodb://'+username+':'+password+'@localhost:'+DBport+'/';

module.exports={
    portNumber,
    mongodbConnectionString
}