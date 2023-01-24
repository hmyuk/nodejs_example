const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const fs = require('fs');

const multer = require('multer');

const indexRouter = require('./routes');

const app = express();
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engin', 'pug');


try{
    fs.readdirSync('uploads');
}catch(err){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}


const upload = multer({
    storage : multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits : { fileSize : 5 * 1024 * 1024}
});

app.use('/', indexRouter);  

app.use(morgan('combined'));

//console.log(__dirname);
app.use('/', express.static(__dirname  + 'public'));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie:{
        httpOnly : true
    }
}));

app.use(session());


app.use(express.json);
app.use(express.urlencoded({extended : true}));



//localhost:3000/test.html   ->   public /test.html

//공통 사용되는 부분을 App.use로 공통 처리
app.use((req, res, next) => {
    console.log('A. 모든 요청에 실행 하고 싶어요.');
    next();
}, (req, rest, next) =>{
    console.log('A. 다음으로 실행되는 미들웨어 ');
//throw new Error('에러가 발생 했습니다.');
    next();
});


app.get('/category/javascript', (req, res)=>{
    res.send(`hello javascript`);
});

app.get('/category/:name', (req, res)=>{
    res.send(`hello ${req.params.name}`);
});

//모든 GET 요청을 처리 하겠다.
// app.get('*', (req, res)=>{

// });


app.get('/', (req,res) => {
//    res.sendFile(path.join(__dirname, '/index.html'));

    req.cookies // {mycookie: 'test'}
    req.signedCookies;
    // 'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,

    //쿠키세팅
    res.cookie('name', encodeURIComponent(name), {
        expires: new Date(),
        httpOnly: true,
        path: '/'
    });

    //쿠키제거
    res.clearCookie('name', encodeURIComponent(name), {
        httpOnly : true,
        path : '/'
    });

    

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('안녕하세요.');
});

app.post('/', (req, res) => {
    res.send('hello express!');
});

app.get('/about', (req,res)=>{
    res.send('hello express');
});

app.use(((req, res, next)=>{
    res.status(404).send('404입니다.');
}));

// app.get('/', (req, res) =>{
//     res.writeHead(200, { 'Content-Type' : 'application/json'});
//     res.send(JSON.stringify({hello : 'hmyuk'}));

//     res.json({hello : 'hmyuk'});
// });


// err, req, res , next 4개가 모두 있어야 합니다.
app.use((err, req, res, next)=>{
    console.error(err);
});


app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});



  