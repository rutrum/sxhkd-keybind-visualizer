let ejs = require('ejs')
let fs = require('fs')
let rows = [["Escape", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Home", "End", "Insert", "Delete"],
["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Return"],
["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
["Fn", "Ctrl", "Super", "Alt", "Space"]]

let tooltips = {
    '8': {
        'super': 'bspc desktop -f 8',
        'super + shift': 'bspc node -d 8',
        'super + ctrl': 'bspc node -o 0.8'
    },
    '9': {
        'super': 'bspc desktop -f 9',
        'super + shift': 'bspc node -d 9',
        'super + ctrl': 'bspc node -o 0.9'
    },
    'f': {
        'control + alt': '\~/dotfiles/screenlayouts/148.sh',
        'super': 'bspc node -t \~fullscreen'
    },
    'g': {
        'control + alt': '\~/dotfiles/screenlayouts/laptop.sh',
        'super': 'bspc node -s biggest'
    },
    't': {
        'control + alt': '\~/dotfiles/screenlayouts/homethree.sh',
        'super': 'bspc node -t tiled',
        'super + shift': 'bspc node -t pseudo_tiled'
    },
    M: { 'control + alt': '\~/dotfiles/screenlayouts/homemirror.sh' },
    'u': { 'control + alt': '\~/dotfiles/screenlayouts/tutor.sh' },
    'H': { 'control + alt': '\~/dotfiles/screenlayouts/homefour.sh' },
    Return: { 'super': 'st' }
}

ejs.renderFile('./myfile.ejs', { rows: rows, tooltips: tooltips }, function (err, html) {
    fs.writeFile('./myfile.html', html, (err) => { console.log(err) })
    console.log(err)
});
