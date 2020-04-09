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

    expanded = break_apart(keycommands)

    let final = {}
    for (let [key, command] of Object.entries(expanded)) {
        let modifier = "none"

        let plusindex = key.lastIndexOf("+");
        if (plusindex != -1) {
            modifier = key.substring(0, plusindex).trim()
            key = key.substring(plusindex + 1).trim()
        }
        if (!final[key]) {
            final[key] = {}
        }
        final[key][modifier] = command
    }
    return final
}

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
                    digits.push(i)
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
