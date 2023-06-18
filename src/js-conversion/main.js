
let menv = typeof window !== 'undefined' ? 'browser' : 'node';

// menv = typeof window !== 'undefined' ? 'browser' : 'node';
let Constants, Player, Event, Path, asciiArt;

if (menv === 'node') {
    Player = require('./player.js');
    const eventModule = require('./event.js');
    Event = eventModule.Event;
    Path = eventModule.Path;
    asciiArt = require('./ascii.js');
    Constants = require('./constants.js');
} else if (menv === 'browser') {
    Event = window.Event
    Path = window.Path
    Constants = window.Constants;
    Player = window.Player;
    asciiArt = window.asciiArt;
}

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

// Asci island function: this would need to be rethought in a web menvironment
async function ascisland() {

    await asciiArt.asciisland()
    constants.output("\n\n\nYou wake up to find yourself alone on an island in the middle of the ocean. You can see a cruise ship on the horizon.\n\nAttached to the island are three paths all going in the direction of the ship. No one path seems better than any other, which path will you choose?");
}

// Score function
async function score(obj, modifier) {
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
    if (aenv === 'browser') 
        constants.output("Refresh the page to play again");

    if (menv === 'node') {
        // Exit the process in Node.js environment
        process.exit(1);
    } else if (menv === 'browser') {
        // Create a modal div
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';

        // Create the restart button
        const restartButton = document.createElement('button');
        restartButton.innerText = 'Restart Game';
        restartButton.style.padding = '10px 20px';
        restartButton.style.fontSize = '20px';

        // Add click event to reload the page
        restartButton.onclick = function() {
            location.reload();
        };

        // Append the button to the modal
        modal.appendChild(restartButton);

        // Append the modal to the body of the HTML document
        document.body.appendChild(modal);
    }
}

// Death function
async function death(obj) {
    await asciiArt.ascideath()
    constants.output("\nYou crawl across the sand, no longer able to go on, your hands and feet bloodied from your journey; you feel the life slowly drain from your body as the sun beats down on you and the waves lap at the shore.");
    let modifier = 1
    score(obj, modifier);
}

// Victory function
async function victory(obj) {
    await asciiArt.ascivictory()
    constants.output("Finally.. you have made it; you scream at the top of your lungs to get the attention of anyone onbard; someone notices your desparation and throws a rope down to you");
    constants.output("Climbing up to rope you are greeted by the cruise ship staff, you begin to regale them with the tales of your journey, and they can scarcely believe what they are hearing");
    constants.output("You are led to a room on the ship where you can rest your weary body; you close your eyes and drift into much needed rest...");
    let modifier = 2
    score(obj, modifier);
}

async function main() {
    // ...


    // Get path choice from player
    await ascisland();
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

    // Test ending
    //you.delta = you.dist

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
                await death(you);
                loops = constants.MAX_LOOP
            } else {
                console.error("[Main]ERROR: Event reported player as dead, main reported as alive. Cannot compute value in superposition.");
                return;
            }
        } else if (updater === 1) {
            await victory(you);
            loops = constants.MAX_LOOP
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