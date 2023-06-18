
let aenv = typeof window !== 'undefined' ? 'browser' : 'node';
let Constants;
if (aenv === 'node') {
    const fs = require('fs');
    path = require('path');
    Constants = require('./constants.js');
}
else if (aenv === 'browser') {
    Constants = window.Constants;
}
const constants = new Constants();

async function printAsciiArt(filepath) {
    if (aenv === 'node') {
        const fs = require('fs');
        try {
            const data = fs.readFileSync(filepath, 'utf8');
            constants.output(data);
        } catch (err) {
            console.error(err);
        }
    } else if (aenv === 'browser') {
        // Assuming the ASCII art files are served at the /ascii-art directory
        const url = `/ASCI/${filepath}`;
        try {
            const response = await fetch(url);
            const data = await response.text();
            constants.output(data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
}

if (aenv === 'node') {
    exports.asciisland = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'island.txt'));
    };

    exports.ascicruise = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'cruise.txt'));
    };

    exports.ascideath = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'death.txt'));
    };

    exports.asciwin = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'win.txt'));
    };

    exports.ascivictory = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'victory.txt'));
    };

    exports.asciguardian = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'guardian.txt'));
    };

    exports.asciattack = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'attack.txt'));
    };

    exports.ascidodge = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'dodge.txt'));
    }

    exports.asciblock = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'block.txt'));
    };

    exports.ascigrab = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'grab.txt'));
    };

    exports.ascitree = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'tree.txt'));
    };

    exports.asciwell = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'well.txt'));
    };

    exports.ascimansion = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'mansion.txt'));
    };

    exports.ascicave = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'cave.txt'));
    };


    exports.ascicthulu = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'cthulu.txt'));
    };

    exports.ascilighthouse = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'lighthouse.txt'));
    };

    exports.ascibattlebox = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'Sbox3.txt'));
    };

    exports.asciwormholebox = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'Sbox2.txt'));
    };

    exports.ascibatterybox = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'Sbox1.txt'));
    };

    exports.ascistem = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'ameoba.txt'));
    }
    exports.ascimedkit = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'medkit.txt'));
    }
    exports.ascibandage = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'bandage.txt'));
    }
    exports.ascileather = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'leather.txt'));
    }
    exports.ascichainmail = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'chainmail.txt'));
    }
    exports.asciknight = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'knight.txt'));
    }
    exports.ascibulb = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'bulb.txt'));
    }
    exports.asciknife = async function () {
        await printAsciiArt(path.join(__dirname, 'ASCI', 'knife.txt'));
    }
    exports.ascisword = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'sword.txt'));
    }
    exports.ascigun = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'gun.txt'));
    }
    exports.ascishop = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'shop.txt'));
    }
    exports.ascipirateship = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'pirateship.txt'));
    }
    exports.ascikey = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'key.txt'));
    }
    exports.ascisiren = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'siren.txt'));
    }
    exports.asciameoba = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'ameoba.txt'));
    }
    exports.ascialligator = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'alligator.txt'));
    }
    exports.ascioldman = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'oldman.txt'));
    }
    exports.ascioldmanevent = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'oldmanevent.txt'));
    }
    exports.ascikali = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'kali.txt'));
    }
    exports.ascicrabdragon = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'crabdragon.txt'));
    }
    exports.asciskeletonN = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'Askeleton.txt'));
    }
    exports.ascisquid = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'squid.txt'));
    }
    exports.ascipirate = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'pirate.txt'));
    }
    exports.ascicastaway = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'castaway.txt'));
    }
    exports.ascizombie = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'zombie.txt'));
    }
    exports.ascidolphin = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'dolphin.txt'));
    }
    exports.ascishark = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'shark.txt'));
    }
    exports.ascibox = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'box.txt'));
    }
    exports.ascilobster = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'lobster.txt'));
    }
    exports.asciskeleton = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'skeleton.txt'));
    }
    exports.asciwraith = async function () {

        await printAsciiArt(path.join(__dirname, 'ASCI', 'wraith.txt'));
    }
}

else if (aenv === 'browser') {
    window.asciiArt = {
        asciisland: async function () {
            await printAsciiArt('island.txt');
        },

        ascicruise: async function () {
            await printAsciiArt('cruise.txt');
        },

        ascideath: async function () {
            await printAsciiArt('death.txt');
        },

        asciwin: async function () {
            await printAsciiArt('win.txt');
        },

        ascivictory: async function () {
            await printAsciiArt('victory.txt');
        },

        asciguardian: async function () {
            await printAsciiArt('guardian.txt');
        },

        asciattack: async function () {
            await printAsciiArt('attack.txt');
        },

        ascidodge: async function () {
            await printAsciiArt('dodge.txt');
        },

        asciblock: async function () {
            await printAsciiArt('block.txt');
        },

        ascigrab: async function () {
            await printAsciiArt('grab.txt');
        },

        ascitree: async function () {
            await printAsciiArt('tree.txt');
        },

        asciwell: async function () {
            await printAsciiArt('well.txt');
        },

        ascimansion: async function () {
            await printAsciiArt('mansion.txt');
        },

        ascicave: async function () {
            await printAsciiArt('cave.txt');
        },


        ascicthulu: async function () {
            await printAsciiArt('cthulu.txt');
        },

        ascilighthouse: async function () {
            await printAsciiArt('lighthouse.txt');
        },

        ascibattlebox: async function () {
            await printAsciiArt('Sbox3.txt');
        },

        asciwormholebox: async function () {
            await printAsciiArt('Sbox2.txt');
        },

        ascibatterybox: async function () {
            await printAsciiArt('Sbox1.txt');
        },

        ascistem: async function () {

            await printAsciiArt('ameoba.txt');
        },
        ascimedkit: async function () {

            await printAsciiArt('medkit.txt');
        },
        ascibandage: async function () {

            await printAsciiArt('bandage.txt');
        },
        ascileather: async function () {

            await printAsciiArt('leather.txt');
        },
        ascichainmail: async function () {

            await printAsciiArt('chainmail.txt');
        },
        asciknight: async function () {

            await printAsciiArt('knight.txt');
        },
        ascibulb: async function () {

            await printAsciiArt('bulb.txt');
        },
        asciknife: async function () {
            await printAsciiArt('knife.txt');
        },
        ascisword: async function () {

            await printAsciiArt('sword.txt');
        },
        ascigun: async function () {

            await printAsciiArt('gun.txt');
        },
        ascishop: async function () {

            await printAsciiArt('shop.txt');
        },
        ascipirateship: async function () {

            await printAsciiArt('pirateship.txt');
        },
        ascikey: async function () {

            await printAsciiArt('key.txt');
        },
        ascisiren: async function () {

            await printAsciiArt('siren.txt');
        },
        asciameoba: async function () {

            await printAsciiArt('ameoba.txt');
        },
        ascialligator: async function () {

            await printAsciiArt('alligator.txt');
        },
        ascioldman: async function () {

            await printAsciiArt('oldman.txt');
        },
        ascioldmanevent: async function () {

            await printAsciiArt('oldmanevent.txt');
        },
        ascikali: async function () {

            await printAsciiArt('kali.txt');
        },
        ascicrabdragon: async function () {

            await printAsciiArt('crabdragon.txt');
        },
        asciskeletonN: async function () {

            await printAsciiArt('Askeleton.txt');
        },
        ascisquid: async function () {

            await printAsciiArt('squid.txt');
        },
        ascipirate: async function () {

            await printAsciiArt('pirate.txt');
        },
        ascicastaway: async function () {

            await printAsciiArt('castaway.txt');
        },
        ascizombie: async function () {

            await printAsciiArt('zombie.txt');
        },
        ascidolphin: async function () {

            await printAsciiArt('dolphin.txt');
        },
        ascishark: async function () {

            await printAsciiArt('shark.txt');
        },
        ascibox: async function () {

            await printAsciiArt('box.txt');
        },
        ascilobster: async function () {

            await printAsciiArt('lobster.txt');
        },
        asciskeleton: async function () {

            await printAsciiArt('skeleton.txt');
        },
        asciwraith: async function () {

            await printAsciiArt('wraith.txt');
        }
    };
}
