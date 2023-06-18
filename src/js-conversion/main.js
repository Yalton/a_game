const Player = require('./player.js');
const { Event, Path } = require('./event.js');
const asciiArt = require('./ascii.js');
const Constants = require('./constants.js');

const constants = new Constants();


//const prompt = require('prompt-sync')({sigint: true});


// Random number function
function randnum(a, b) {
    let x = 0;
    for (let i = 0; i < 100500; i++) {
        x = Math.floor(Math.random() * b) + a;
    }
    if (x > b) {
        return randnum(a, b);
    } else {
        return x;
    }
}

// Asci island function: this would need to be rethought in a web environment
function ascisland() {
    // Retrieve island.txt content via AJAX or other web method
    // Then:

    asciiArt.asciisland()
    constants.output("\n\n\nYou wake up to find yourself alone on an island in the middle of the ocean. You can see a cruise ship on the horizon.\n\nAttached to the island are three paths all going in the direction of the ship. No one path seems better than any other, which path will you choose?");
}

// Score function
function score(obj, modifier) {
    let score
    constants.output("\n         ||Score||         ");
    constants.output("===========================");
    constants.output("Items Count: " + obj.size());
    constants.output("Batterry Count: " + obj.batt);
    constants.output("Enemies defeated: " + obj.enemfelled);
    constants.output("Distance Traveled: " + obj.delta);
    score = (obj.size() + obj.batt + obj.delta + obj.enemfelled) * modifier
    if (obj.secr != 1) {
        score = score * 2
        constants.output("*Found a Secret*");
    }
    constants.output("Total Score: " + score);
    constants.output("===========================");
    process.exit(1); // This is a Node.js function, won't work in a browser environment
}

// Death function
function death(obj) {
    asciiArt.ascideath()
    constants.output("\nYou crawl across the sand, no longer able to go on, your hands and feet bloodied from your journey; you feel the life slowly drain from your body as the sun beats down on you and the waves lap at the shore.");
    let modifier = 1
    score(obj, modifier);
}

// Victory function
function victory(obj) {
    asciiArt.asciwin()
    let modifier = 2
    score(obj, modifier);
}

async function main() {
    // ...


    // Get path choice from player
    ascisland();
    let you = new Player();
    let path = [];
    // Populate path with three new Events
    for (let i = 0; i < 3; i++) {
        path.push(new Path());
    }
    let numpath, loops = 0, updater = 0; // initialize loops here
    let unpath = [0, 0];
    you.dist = randnum(20, 32);

    numpath = parseInt(await constants.input("Path 1, 2, or 3?:"));
    while (![1, 2, 3].includes(numpath)) {
        numpath = parseInt(await constants.input("Path 1, 2, or 3?:"));
    }
    constants.output('\n');
    you.path = (numpath);

    // ...
    for (let i = 0; i < 3; i++) {
        path[i].buildPath(you);
    }

    // // Main game loop
    if (constants.DEBUG)
        constants.output("[Main]DEBUG:In main, path[you.path - 1].isEmpty() = " + path[you.path - 1].isEmpty() + ".")


    while (!path[you.path - 1].isEmpty() && loops < constants.MAX_LOOP) {
        // ...

        if (updater === 0) {
            // Stores the return value of eventable in updater, updater will tell main if there have been in changes in event.cpp
            if (constants.DEBUG)
                constants.output("[Main]DEBUG:In main, Entering eventable for path # " + you.path + ".")
            updater = await path[you.path - 1].events[you.delta].eventable(you);
            you.delta = you.delta + 1;
        }
        else if (updater === -1) {
            if (you.hp <= 0) {
                death(you);
            } else {
                console.error("[Main]ERROR: Event reported player as dead, main reported as alive. Cannot compute value in superposition.");
                return;
            }
        } else if (updater === 1) {
            victory(you);
        } else {
            console.error("[Main]ERROR: Improper value returned from eventable.");
            return;
        }

        // ...

        loops++;
    }

    if (loops === constants.MAX_LOOP) {
        console.error("ERROR: Loop in main exceeded constants.MAX_LOOP.");
        return;
    }

    console.error("[Main]ERROR: Pointer made it to the end of main");
}

main();