const  cp = require('child_process')
const { stdout, stderr } = require('process')

function executeCommand(command){
    cp.exec(command,(err,stdout,stderr)=>{
        if(err){
            console.error(err);
            return;
        }if(stderr){
            console.error(stderr);
            return;
        }
        console.log(`output: ${stdout}`);
    });
}
executeCommand('dir')
executeCommand('echo "Hello, Node.js!')