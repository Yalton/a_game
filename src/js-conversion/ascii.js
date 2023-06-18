const fs = require('fs');
const path = require('path');

function printAsciiArt(filepath) {
    try {
        const data = fs.readFileSync(filepath, 'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

exports.asciisland = function () {
    printAsciiArt(path.join(__dirname, 'ASCI', 'island.txt'));
};

exports.ascideath = function () {
    printAsciiArt(path.join(__dirname, 'ASCI', 'death.txt'));
};

exports.asciwin = function () {
    printAsciiArt(path.join(__dirname, 'ASCI', 'win.txt'));
};

exports.asciguardian = function () {
    printAsciiArt(path.join(__dirname, 'ASCI', 'guardian.txt'));
};

exports.asciattack = function() {
    printAsciiArt(path.join(__dirname, 'ASCI', 'attack.txt'));
};

exports.ascidodge = function () {
    printAsciiArt(path.join(__dirname, 'ASCI', 'dodge.txt'));
}

exports.asciblock = function () {
    printAsciiArt(path.join(__dirname, 'ASCI', 'block.txt'));
};

exports.ascigrab = function () {
    printAsciiArt(path.join(__dirname, 'ASCI', 'grab.txt'));
};

exports.ascitree = function () {
    printAsciiArt(path.join(__dirname, 'ASCI', 'tree.txt'));
};

exports.asciwell = function () {
    printAsciiArt(path.join(__dirname, 'ASCI', 'well.txt'));
};

exports.ascimansion = function () {
    printAsciiArt(path.join(__dirname, 'ASCI', 'mansion.txt'));
};

exports.ascicave = function () {
    printAsciiArt(path.join(__dirname, 'ASCI', 'cave.txt'));
};


exports.ascicthulu = function () {
    printAsciiArt(path.join(__dirname, 'ASCI', 'cthulu.txt'));
};

exports.ascilighthouse = function () {
    printAsciiArt(path.join(__dirname, 'ASCI', 'lighthouse.txt'));
};

exports.ascibattlebox = function () {
    printAsciiArt(path.join(__dirname, 'ASCI', 'Sbox3.txt'));
};

exports.asciwormholebox = function () {
    printAsciiArt(path.join(__dirname, 'ASCI', 'Sbox2.txt'));
};

exports.ascibatterybox = function () {
    printAsciiArt(path.join(__dirname, 'ASCI', 'Sbox1.txt'));
};

exports.ascistem = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'ameoba.txt'));
}
exports.ascimedkit = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'medkit.txt'));
}
exports.ascibandage = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'bandage.txt'));
}
exports.ascileather = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'leather.txt'));
}
exports.ascichainmail = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'chainmail.txt'));
}
exports.asciknight = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'knight.txt'));
}
exports.ascibulb = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'bulb.txt'));
}
exports.asciknife = function () {
    printAsciiArt(path.join(__dirname, 'ASCI', 'knife.txt'));
}
exports.ascisword = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'sword.txt'));
}
exports.ascigun = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'gun.txt'));
}
exports.ascishop = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'shop.txt'));
}
exports.ascipirateship = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'pirateship.txt'));
}
exports.ascikey = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'key.txt'));
}
exports.ascisiren = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'siren.txt'));
}
exports.asciameoba = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'ameoba.txt'));
}
exports.ascialligator = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'alligator.txt'));
}
exports.ascioldman = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'oldman.txt'));
}
exports.ascioldmanevent = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'oldmanevent.txt'));
}
exports.ascikali = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'kali.txt'));
}
exports.ascicrabdragon = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'crabdragon.txt'));
}
exports.asciskeletonN = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'Askeleton.txt'));
}
exports.ascisquid = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'squid.txt'));
}
exports.ascipirate = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'pirate.txt'));
}
exports.ascicastaway = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'castaway.txt'));
}
exports.ascizombie = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'zombie.txt'));
}
exports.ascidolphin = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'dolphin.txt'));
}
exports.ascishark = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'shark.txt'));
}
exports.ascibox = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'box.txt'));
}
exports.ascilobster = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'lobster.txt'));
}
exports.asciskeleton = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'skeleton.txt'));
}
exports.asciwraith = function () {

    printAsciiArt(path.join(__dirname, 'ASCI', 'wraith.txt'));
}


