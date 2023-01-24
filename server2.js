const fs = require('fs').promises;
const http = require('http');


const server  = http.createServer(async (req,res)=>{

    try{
        if(req.method === "GET"){
            if(req.url === "/"){
                const data = await fs.readFile('./index.html');

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data);

            }else if (req.url  === "/json"){
                const data = {"text" : "a" , "text2" : "b"};

                res.writeHead(200, {'Context-Type' : 'application/json; charset=utf-8'});
                return res.end(JSON.stringify(data));
            }
        }

        if(req.method === "POST"){
            if(req.url === "/body"){
                let bodyt = '';

                req.on('data', (data) =>{
                    body += data;
                });

                return req.on('end', ()=>{
                    console.log('POST 본문 (body) ' , body);
                });

            }

        }


    }catch(e){
        console.error(e);
    }



}).listen('8080');


server.on('listening', ()=>{
    console.log("server listening !! ");
});

server.on('error', (error) =>{
    console.log(error);
});