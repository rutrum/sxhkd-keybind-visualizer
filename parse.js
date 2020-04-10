const fs = require('fs')

function main() {
    let filename = process.env.HOME + "/.config/sxhkd/sxhkdrc"
    if (process.argv.length > 2) {
        filename = process.argv[2]
    }
    parse_file(filename, console.log)
}

function parse_file(filename, callback) {
    fs.readFile(filename, "utf-8", (err, data) => {
        if (err) {
            console.log("Error opening file at " + file)
            exit(1)
        } else {
            callback(parse_contents(data))
        }
    })
}

function parse_contents(contents) {

    // First read and clean file
    let keycommands = {}
    let lines = contents.split("\n")
    lines = lines.filter(line => line.length > 0)
    let keybind = ""
    lines.forEach(line => {
        let start = line[0]
        if (start == " " || start == "\t") {
            let command = line.trim();
            keycommands[keybind] = command
        } else if (start != "#") {
            keybind = line;
        }
    })

    // Expand the {} blocks
    expanded = break_apart(keycommands)

    // Separate modifier from each command and create final data structure
    let final = {}
    let allmodifiers = new Set()
    for (let [key, command] of Object.entries(expanded)) {
        key = key.replace(/\s/g, "");
        let modifier = "none"
        
        let colonindex = key.lastIndexOf(":")
        let plusindex = key.lastIndexOf("+")
        let lastindex = colonindex > plusindex ? colonindex : plusindex;
        if (lastindex != -1) {
            modifier = key.substring(0, lastindex).trim()
            key = key.substring(lastindex + 1).trim()
        }
        allmodifiers.add(modifier)
        if (!final[key]) {
            final[key] = {}
        }
        final[key][modifier] = command
    }
    return { modifiers: allmodifiers, hotkeys: final }
}

// Given the source of the keybinds and commands, will create 
// object[keybind]=>command with keybinds in their simplest state
function break_apart(keycommands) {
    let expandedkeycommands = {}
    
    for (let [key, command] of Object.entries(keycommands)) {
        keyexpansion = expand_string(key)
        commandexpansion = expand_string(command)

        if (keyexpansion.length == commandexpansion.length) {
            for (let i = 0; i < keyexpansion.length; i++) {
                let key = keyexpansion[i].toUpperCase()
                let command = commandexpansion[i]
                expandedkeycommands[key] = command
            }
        }
    }
    return expandedkeycommands
}

// Takes either a key or command, expands the {} into
// multiple keys or commands without {}
function expand_string(str) {
    first = str.search("{")
    second = str.search("}")
    if (first >= 0) {
        before = str.substring(0, first)
        after = str.substring(second + 1)
        options = str.substring(first+1, second).split(",")
        options = options.map(x => {
            if (x.match(/\d-\d/)) {
                bounds = x.split("-")
                digits = []
                for (let i = bounds[0]; i <= bounds[1]; i++) {
                    digits.push()
                }
                return digits
            } else {
                return x
            }
        }).flat()

        newcommands = options.map(x => {
            if (x == "_") {
                return before + after
            } else {
                return before + x + after
            }
        })
        return newcommands.map(expand_string).flat()
    } else {
        return [str]
    }
}

main()
