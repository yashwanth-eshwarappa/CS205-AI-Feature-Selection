const fs = require('fs');
const readline = require('readline');

// Creating a readable stream from file
// readline module reads line by line 
// but from a readable stream only.
// const file = readline.createInterface({
//     input: fs.createReadStream(process.cwd() + '/CS205_CalibrationData__1.txt'),
//     output: process.stdout,
//     terminal: false
// });

var dataList = [];

async function readData() {
    const fileStream = fs.createReadStream(process.cwd() + '/CS205_CalibrationData__1.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (var line of rl) {
        var list = [];
        for (var each of line.trim().split(/\s+/)) {
            list.push(Number.parseFloat(each));
        }
        dataList.push(list);
    }
}
