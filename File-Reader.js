const fs = require('fs')

function readFileContent(filePath) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err.message);
            return
        }
        console.log(data.toString());
    })
}
console.log("Contents");
readFileContent(__dirname + "\\file1.txt")
readFileContent(__dirname + "\\empty-file.txt")
readFileContent(__dirname + "\\nonexistent-file.txt")