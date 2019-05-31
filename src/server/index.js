var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) =>{
    res.send('Hello world');
});

http.listen(3001, () => {
    console.log('listening on :3001');
});

io.on('connection', function (socket) {

   socket.on('message', (value) => {
      console.log(JSON.stringify(value));
      io.emit('message', value);
    }); 
    
    console.log('user connected!');
  });