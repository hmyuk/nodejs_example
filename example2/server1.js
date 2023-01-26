const fs = require('fs').promises;
const http = require('http');

const server = http.createServer(async (req, res) =>{
    res.writeHead(200, {'Content-TYpe' : 'text/html; charset=utf-8'});
    const data = await fs.readFile('./index.html');
    // res.write('<h1>hello Node!</h1>');
    // res.write('<p>Heelo server</p>');
    // res.end('<h1>hello ZeroCho</h1>');
    res.end(data);
}).listen(8080);


server.on('listening', ()=>{
    console.log('8080번 포트에서 서버 대기 중입니다.')
});

server.on('error', (error) =>{
    console.error(error);
});