var request = require('request');
var fs = require('fs');

function trimbody(raw) {
    const raw_ = raw.replace(/\.\.\./g, "");
    const textArray = raw_.split(/\r\n|\r|\n/);
    var res = "";
    for (let i = 0; i < textArray.length; i++) {
        if (i < 5 || i > 40) {
            //ignore
        } else {
            res += textArray[i] + "\n";
        }
    }
    return res;
}

function cleanbody(raw) {
    const textArray = raw.split("\n");
    var res = "";
    for (let i = 0; i < textArray.length; i++) {

        if (i % 12 != 0 && i % 12 != 1) {
            res += textArray[i] + "\n";
        }
    }
    return res;
}


function parsebody(str) {
    let arr = str.split(/\n/);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split(/\,/);
    }
    return arr;
}



const dir = "./sources"; // ← 変更してね
const fileNameList = fs.readdirSync(dir);
const targetFileNames = fileNameList.filter(RegExp.prototype.test, /.*\.pdf$/);

targetFileNames.forEach((filename) => {
    filename = filename.substring(0, filename.length - 4)
    const text_fs = fs.readFileSync(`./converted/${filename}.csv`, 'utf8');
    let text = trimbody(text_fs.toString());
    text = cleanbody(text);

    let lines = text.split('\n');

    console.log(`${i}:${lines[i]}`);
});