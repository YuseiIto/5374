var request = require('request');
var fs = require('fs');

require("dotenv").config();
var url = `https://pdftables.com/api?key=${process.env.API_KEY}&format=csv`;

const dir = "./sources"; // ← 変更してね
const fileNameList = fs.readdirSync(dir);
const targetFileNames = fileNameList.filter(RegExp.prototype.test, /.*\.pdf$/);

const promises = [];


function convert(filename) {

    return new Promise((resolve) => {

        filename = filename.substring(0, filename.length - 4)
        console.log(filename);
        var req = request.post({ encoding: null, url: url }, function(err, resp, body) {
            if (!err && resp.statusCode == 200) {
                fs.writeFile(`./converted/${filename}.csv`, body, function(err) {
                    if (err) {
                        console.log('error writing file');
                    } else {
                        resolve();
                    }
                });
            } else {
                console.log('error retrieving URL');
            };
        });

        var form = req.form();
        form.append('file', fs.createReadStream(`./sources/${filename}.pdf`));

    });
}


targetFileNames.forEach((filename) => { promises.push(convert(filename)) });





Promise.all(promises).then(() => {
    console.log("Download done.");


});