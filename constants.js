module.exports = {
    MODIFIERS: [
        "SUPER", "HYPER", "META", "ALT", "CONTROL", "CTRL",
        "SHIFT", "MODE_SWITCH", "LOCK", "MOD1", "MOD2",
        "MOD3", "MOD4", "MOD5", "ANY"
    ],

    KEYBOARD_KEYS: [
        ["ESCAPE", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "HOME", "END", "INSERT", "DELETE", "PRINT"],
        ["GRAVE", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "MINUS", "EQUAL", "BACKSPACE"],
        ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "BRACKETLEFT", "BRACKETRIGHT", "BACKSLASH"],
        ["CAPS_LOCK", "A", "S", "D", "F", "G", "H", "J", "K", "L", "SEMICOLON", "APOSTROPHE", "RETURN"],
        ["SHIFT", "Z", "X", "C", "V", "B", "N", "M", "COMMA", "PERIOD", "SLASH", "SHIFT", "UP"],
        ["CTRL", "SUPER", "ALT", "SPACE", "ALT", "SUPER", "CTRL", "LEFT", "DOWN", "RIGHT"]
    ],

    NAVIGATION_KEYS: [
        ["INSERT", "HOME", "PAGEUP"],
        ["DELETE", "END", "PAGEDOWN"]
    ],

    ARROW_KEYS: [
        ["UP"],
        ["LEFT", "DOWN", "RIGHT"]
    ],

    NUMPAD_KEYS: [
        ["NUM_LOCK", "KP_DIVIDE", "KP_MULTIPLY", "KP_SUBTRACT"],
        ["KP_7", "KP_8", "KP_9", "KP_ADD"],
        ["KP_4", "KP_5", "KP_6", "KP_ADD"],
        ["KP_1", "KP_2", "KP_3", "KP_ENTER"],
        ["KP_0", "KP_DECIMAL", "KP_ENTER"]
    ],

    FROW_KEYS: [
        ["ESCAPE", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "PRINT", "SCROLL_LOCK", "PAUSE"]
    ],

    MAIN_KEYS: [
        ["GRAVE", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "MINUS", "EQUAL", "BACKSPACE"],
        ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "BRACKETLEFT", "BRACKETRIGHT", "BACKSLASH"],
        ["CAPS_LOCK", "A", "S", "D", "F", "G", "H", "J", "K", "L", "SEMICOLON", "APOSTROPHE", "RETURN"],
        ["SHIFT", "Z", "X", "C", "V", "B", "N", "M", "COMMA", "PERIOD", "SLASH", "SHIFT", "UP"],
        ["CTRL", "SUPER", "ALT", "SPACE", "ALT", "SUPER", "CTRL", "LEFT", "DOWN", "RIGHT"]
    ],

    // Default, the keysym name is the display name
    DISPLAY_NAMES: {
        RETURN: 'Enter',
        APOSTROPHE: "'",
        SEMICOLON: ';',
        COLON: ':',
        ALT: 'Alt',
        CTRL: 'Ctrl',
        SPACE: 'Space',
        TAB: 'Tab',
        ESCAPE: 'Esc',
        HOME: 'Home',
        END: 'End',
        INSERT: 'Ins',
        DELETE: 'Del',
        BRACKETRIGHT: ']',
        BRACKETLEFT: '[',
        EQUAL: '=',
        MINUS: '-',
        GRAVE: '`',
        BACKSLASH: '\\',
        COMMA: ',',
        PERIOD: '.',
        SLASH: '/',
        SHIFT: 'Shift',
        CAPS_LOCK: 'Caps',
        SUPER: 'Super',
        BACKSPACE: 'Backspace',
        PRINT: 'Prt',
        UP: '↑',
        DOWN: '↓',
        LEFT: '←',
        RIGHT: '→'
    },

    // Width of each key in quarter units, default is 4qu
    KEY_WIDTH: {
        RETURN: 9,
        BACKSLASH: 6,
        ALT: 5,
        CTRL: 5,
        SUPER: 5,
        SPACE: 25,
        TAB: 6,
        SHIFT: 9, 
        CAPS_LOCK: 7,
        BACKSPACE: 8
    },
    tooltips: {
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
}
