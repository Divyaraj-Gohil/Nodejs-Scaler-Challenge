const path = require('path')

function resolvePath(rel){
    console.log(path.resolve(rel));
}

resolvePath('../Day-4/ResolvePath.js')
resolvePath('../non/test.js')