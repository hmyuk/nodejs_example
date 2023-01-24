const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

console.log(numCPUs);