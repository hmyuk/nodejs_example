const fs = require('fs').promises;


async function main(){
    let data = await fs.readFile('./readme.txt');
    console.log(data.toString());
}

main();