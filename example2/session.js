const http = require("http");
const http2 = require('http2');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '')=>
    cookie.split(';')
    .map(v= v.split('='))
    .reduce((acc, [k,y]) =>{
        acc[k.trim()] = decodeURIComponent(v);
        return acc;

    } , {});

  const session = {};

  http.createServer(async (req, res) => {
    try{
        if(req.method === 'GET'){
            if(req.url === '/'){ 
                const data = await fs.readFile('./index.html');
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                return res.end(data);
            }

        }
    }catch(err){
        res.writeHead(500, { 'Content-Type' : 'text/plain; charset=utf-8'});
    }

  });
  