let ejs = require('ejs')
let fs = require('fs')
let rows = [["~","1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],
            ["Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\"],
            ["Caps","A","S","D","F","G","H","J","K","L",";","'","Enter"],
            ["Shift","Z","X","C","V","B","N","M",",",".","/"],
            ["Fn","Ctrl","Super","Alt","Space"]]

let tooltips = {"A":"Mute Discord","H":"Focus Left Window"}

ejs.renderFile('./myfile.ejs',  {rows: rows, tooltips:tooltips}, function(err, html){
    fs.writeFile('./myfile.html', html, (err) => {console.log(err)})
    console.log(err)
});
