const value = require('./var');
    console.time('check');

function test(){
    console.log("이게 테트 코 입니다.");
}


const promise = new Promise(function(resolve, reject){
    resolve("안녕하세요.");
});


Promise((resolve, reject)=>{
    
});

promise.then((text)=>{
    console.log(text);
    test();

    console.log(value.even);
    console.log(value.odd);

    console.dir(value);
    console.log(value);

    console.timeEnd('check');
    console.trace('에러위치추적');

    const arr = [{"1" : "1" , "2" : "2"} , {"a" : "a" , "b" : "b"}];

    console.table(arr);
    
    console.dir(value, arr);
});





