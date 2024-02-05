const path = require('path')

function checkFileExtension(filePath, ExpectedExtension){
    const actual = path.extname(filePath)

    if(actual===ExpectedExtension)console.log(`file path has expected extension: ${ExpectedExtension}`)
    else console.log(`file does not have the expectrd extension,  expected: ${ExpectedExtension} actual: ${actual}`)
}
checkFileExtension('test.js', '.js')
checkFileExtension('img.png', '.jpg')