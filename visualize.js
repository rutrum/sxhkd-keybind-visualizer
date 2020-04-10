var fs = require('fs')
var ejs = require('ejs')

var constants = require('./constants')

function main() {
    let filename = process.env.HOME + "/.config/sxhkd/sxhkdrc"
    if (process.argv.length > 2) {
        filename = process.argv[2]
    }

    fs.readFile(filename, "utf-8", (err, data) => {
        if (err) {
            console.log("Error opening file at " + file)
            exit(1)
        }
        keybinds = parse_contents(data)

        ejs.renderFile('./templates/template.ejs', { 
            rows: constants.KEYBOARD_KEYS, 
            tooltips: constants.tooltips,
            displaynames: constants.DISPLAY_NAMES,
            keywidths: constants.KEY_WIDTH
        }, function (err, html) {
            if (err) { console.log(err) }
            fs.writeFile('./myfile.html', html, (err) => { if (err) console.log(err) })
        });
    })
}

function parse_contents(data) {
    let sources = into_keybindsources(data)
    let keybinds = sources.map(s => s.into_keybinds()).flat()

    let keyfinal = {}
    keybinds.forEach(keybind => {
        if (!(keybind.keysym in keyfinal)) {
            keyfinal[keybind.keysym] = {}
        }
        keyfinal[keybind.keysym][keybind.modifier] = {
            command: keybind.command,
            source: keybind.source
        }
    })
    return JSON.stringify(keyfinal)
}

// Reads the raw data file and generates a list
// of KeyBindSource objects
function into_keybindsources(raw) {
    let sources = []

    let last_keybind = ""
    let last_keybind_index = 0
    let last_command = ""

    for (const [index, line] of raw.split("\n").entries()) {
        if (line.length == 0) continue
        
        let start = line[0]

        // "If it is empty or starts with #, it is ignored.
        // If it starts with a space, it is read as a command.
        // Otherwise, it is read as a hotkey."

        if (start == " " || start == "\t") {
            // Check if multiline
            if (line.trim().charAt(line.trim().length - 1) == '\\') {
                last_command += line + "\n"
            } else {
                let source = new KeyBindSource(
                    last_keybind, last_command + line, last_keybind_index, index
                )
                sources.push(source)
                last_command = ""
            }

        } else if (start != "#") {
            last_keybind = line
            last_keybind_index = index
        }
    }

    return sources
}

// Stores information about the keybind in the config file
class KeyBindSource {

    constructor(hotkey, command, hotkey_linenum, command_linenum) {
        this.hotkey = hotkey
        this.command = command
        this.hotkey_linenum = hotkey_linenum
        this.command_linenum = command_linenum
    }

    // Return a list of keybinds from the source hotkey and command
    // This omits cartesian products, shouldn't
    into_keybinds() {
        let keybinds = []

        let hotkeys = this.expand_string(this.hotkey)
        let commands = this.expand_string(this.command.trim())

        if (hotkeys.length == commands.length) {
            for (let i = 0; i < hotkeys.length; i++) {
                let hotkey = hotkeys[i].toUpperCase()
                let command = commands[i]
                command = command.replace(/\\\s+/g, "")
                let keybind = new KeyBind(hotkey, command, this)
                keybinds.push(keybind)
            }
        }
        return keybinds 
    }

    expand_string(str) {
        let first = str.search("{")
        let second = str.search("}")
        if (first >= 0) {
            let before = str.substring(0, first)
            let after = str.substring(second + 1)
            let options = str.substring(first+1, second).split(",")
            options = options.map(x => {
                if (x.match(/\d-\d/)) {
                    let bounds = x.split("-")
                    let digits = []
                    for (let i = bounds[0]; i <= bounds[1]; i++) {
                        digits.push()
                    }
                    return digits
                } else {
                    return x
                }
            }).flat()

            let newcommands = options.map(x => {
                if (x == "_") {
                    return before + after
                } else {
                    return before + x + after
                }
            })
            return newcommands.map(this.expand_string.bind(this)).flat()
        } else {
            return [str]
        }
    }
}

class KeyBind {

    // Determines the keysym and modifiers from hotkey
    constructor(hotkey, command, source) {
        this.command = command
        this.source = source

        hotkey = hotkey.replace(/\s/g, "");
        
        let colonindex = hotkey.lastIndexOf(":")
        let plusindex = hotkey.lastIndexOf("+")
        let lastindex = colonindex > plusindex ? colonindex : plusindex;
        if (lastindex != -1) {
            let modifier = hotkey.substring(0, lastindex).trim()
            this.modifier = this.clean_modifier(modifier)
            this.keysym = hotkey.substring(lastindex + 1).trim()
        } else {
            this.modifier = "NONE" 
            this.keysym = hotkey
        }
    }

    // Alphabetizes the modifiers
    clean_modifier(modifier) {
        return modifier.split(":").map(chord => {
            let mods = chord.split("+")
            if (mods[mods.length - 1] in constants.MODIFIERS) {
                return mods.sort().join("+")
            } else {
                let last = mods.pop()
                let sorted = mods.sort()
                sorted.push(last)
                return sorted.join("+")
            }
        }).join(":")
    }
}

main()
