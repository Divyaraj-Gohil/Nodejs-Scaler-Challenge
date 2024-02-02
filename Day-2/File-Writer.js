const fs = require('fs');

function writeToFile(filePath,content){
    fs.writeFile(filePath,content,(err)=>{
        if(err){
            console.log(`Error writing to file: ${err.message}`);
        }else{
            console.log(`Data written to ${filePath}`);
        }
    });
}

writeToFile('file1.txt',"first file data added");
writeToFile('folder\nonexistent.txt',"undefined file");