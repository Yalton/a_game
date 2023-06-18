let eenv = typeof window !== 'undefined' ? 'browser' : 'node';
let Constants, Player, asciiArt;

if (eenv === 'node') {
    asciiArt = require('./ascii.js');
    Player = require('./player.js');
    Constants = require('./constants.js');
} else if (eenv === 'browser') {
    Constants = window.Constants;
    Player = window.Player;
    asciiArt = window.asciiArt; // Fixed this, it should be window.asciiArt
}

const player = new Player();
const constants = new Constants();


class Monster {
    constructor(name, hp = 0, dmg = 0) {
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
    }

    async enemyai(adv) {
        let chance = constants.randomNumber(1, 100);
        switch (adv) {
            case -1:
                if (chance > 65) {
                    return 1;
                } else if (chance <= 65 && chance > 30) {
                    return 4;
                } else if (chance <= 30 && chance > 15) {
                    return 2;
                } else {
                    return 3;
                }
                break;
            case 0:
                if (chance > 75) {
                    return 1;
                } else if (chance <= 75 && chance > 50) {
                    return 2;
                } else if (chance <= 50 && chance > 25) {
                    return 3;
                } else {
                    return 4;
                }
                break;
            case 1:
                if (chance > 65) {
                    return 2;
                } else if (chance <= 65 && chance > 30) {
                    return 3;
                } else if (chance <= 30 && chance > 15) {
                    return 1;
                } else {
                    return 4;
                }
                break;
            default:
                constants.output("ERROR: In enemy AI function. Adv value passed in invalid, ending program");
                throw new Error("Invalid value passed to enemyai");
        }
    }

}


class Event {
    constructor(dist = 0, evt = 0, weath = 0) {
        this.dist = dist;
        this.evt = evt;
        this.weath = weath;
        if (constants.DEBUG)
            constants.output("[Event]DEBUG: New event created with id = " + this.evt);

    }


    // Setters & Getters 
    set dist(x) {
        this._dist = x;
    }
    get dist() {
        return this._dist;
    }
    set evt(x) {
        this._evt = x;
    }
    get evt() {
        return this._evt;

    }
    set weath(x) {
        this._weath = x;
    }
    get weath() {
        return this._weath;
    }

    //######################
    //ITEM HELPER FUNCTIONS
    //######################

    async randitem() {
        let luck = constants.randomNumber(1, 100);
        if (luck > 75) {
            return 'H';
        } else if (luck <= 75 && luck > 50) {
            return 'O';
        } else if (luck <= 50 && luck > 25) {
            return 'D';
        } else {
            return 'S';
        }
    }

    async itemEffect(type, x, player) {
        x = Number(x);  // convert x to a number
        let batt = constants.randomNumber(1, 3);
        let dist = constants.randomNumber(1, 5);
        let enem = constants.randomNumber(1, 12);
        let hpup = constants.randomNumber(1, 3);

        if (constants.DEBUG) {
            constants.output(`[Event]DEBUG: Entering itemeffect function, type: ${type}, idx: ${x}`);
        }

        switch (type) {
            case 'O':
                switch (x) {
                    case 1:
                        await asciiArt.asciknife();
                        constants.output("You take out the knife, your base damage is now 2");
                        player.dmg = 2;
                        break;
                    case 2:
                        await asciiArt.ascisword();
                        constants.output("You equip the sword, your base damage is now 3");
                        player.dmg = 3;
                        break;
                    case 3:
                        await asciiArt.ascigun();
                        constants.output("You pull out the gun, your base damage is now 5");
                        player.dmg = 5;
                        break;
                }
                break;
            case 'D':
                switch (x) {
                    case 1:
                        await asciiArt.ascileather();
                        constants.output("You put on the leather shirt, and feel slightly protected (+10% Defence)");
                        player.dfc = .9;
                        break;
                    case 2:
                        await asciiArt.ascichainmail();
                        constants.output("You put on the chain mail, and feel much more protected. (+40% Defence)");
                        player.dfc = .6;
                        break;
                    case 3:
                        await asciiArt.asciknight();
                        constants.output("Taking your time to put on the knight armor piece by piece, and with each part of the whole you feel more and more untouchable. (80% Defense).");
                        player.dfc = .2;
                        break;
                }
                break;
            case 'H':
                switch (x) {
                    case 1:
                        await asciiArt.ascibandage();
                        constants.output(`You use the bandage on your wounds, and feel slightly better. (+${hpup}hp)`);
                        player.hp = (player.hp + hpup);
                        player.remove('H', 1);
                        break;
                    case 2:
                        await asciiArt.ascimedkit();
                        constants.output("The medkit has a plethora of healing items for you to choose from. Almost every wound you had can be mended now. (+5hp).");
                        player.remove('H', 2);
                        player.hp = (player.hp) + 5;
                        break;
                    case 3:
                        await asciiArt.ascistem();
                        constants.output("The Stem Cells ooze over your body, filling in your wounds and making you healthier than ever before. (hp x 2)");
                        player.remove('H', 3);
                        player.hp = player.hp * 2;
                        break;
                }
                break;
            case 'S':
                switch (x) {
                    case 1:
                        await asciiArt.ascibatterybox();
                        player.batt = (player.batt + batt);
                        constants.output(`You open up the Battery Box, and see it contains ${batt} batteries! Your total number of batteries is now ${player.batt}.`);
                        player.remove('S', 1);
                        break;

                    case 2:
                        constants.output("You open the mystery box, and inside of it ");
                        this.getItem(player);
                        player.remove('S', 2);
                        break;
                    case 3:
                        await asciiArt.asciwormholebox();
                        this.wormhole(dist, player);
                        constants.output(`You hesitate at first, and then open the Wormhole box. Instantly the box pulls you into itself, you think you will be crushed inside, however instead of hitting the bottom of the box, you came out of another box ${dist} kilometers closer to the ship!`);
                        player.remove('S', 3);
                        break;
                    case 4:
                        await asciiArt.ascibattlebox();
                        constants.output("You pry open the battle box, and within it you sense a sinister entity. The entity became aware of you, and clawed its way out of the box");
                        await this.battle(player, enem);
                        player.remove('S', 4);
                        break;
                    case 5:
                        let chance = constants.randomNumber(1, 50);
                        let newPath = 0;
                        switch (player.path) {
                            case 1:
                                newPath = chance > 25 ? 2 : 3;
                                break;
                            case 2:
                                newPath = chance > 25 ? 3 : 1;
                                break;
                            case 3:
                                newPath = chance > 25 ? 1 : 2;
                                break;
                        }
                        constants.output(`You open up the path switcher, and inside of you see a new destination very similar to your own. The switcher pulls you into itself, and rather than your body being crushed inside of the box, you find yourself on a new path, path # ${newPath}.`);
                        player.path = newPath;
                        player.remove('S', 5);
                        break;
                }
                break;
            default:
                constants.output(`ERROR: Trying to get an effect for a non-existent item. Values passed in || Type: ${type} || Id: ${x}.`);
                break;
        }
        if (constants.DEBUG) {
            constants.output(`[Event]DEBUG: Leaving itemeffect`);
        }
        return
    }

    async useItem(type, player) {
        if (constants.DEBUG) {
            constants.output(`[Event]DEBUG: Entering useitem function. Type: ${type}.`);
        }

        let num = type === 'S' ? 5 : 3;
        let itemNum = Array(6).fill(0);

        for (let i = 1; i <= num; i++) {
            if (player.doesHave(type, i)) {
                itemNum[i] = player.giveNum(type, i);
            }
        }

        for (let i = 1; i <= num; i++) {
            if (player.doesHave(type, i)) {
                constants.output(`You have ${itemNum[i]} : ${player.itemName(type, i)}.`);
            }
        }

        let choice;
        do {
            constants.output("Which item would you like to use?");
            for (let i = 1; i <= num; i++) {
                if (itemNum[i] > 0) {
                    constants.output(`${i}: ${player.itemName(type, i)}, `);
                }
            }

            constants.output("or 0: none.");
            choice = await constants.input("Enter your choice: ");

            for (let i = 0; i <= num; i++) {
                if (choice == i && itemNum[i] == 0) {
                    constants.output(`You do not have any ${player.itemName(type, i)}.`);
                    choice = -1;
                }
            }

        } while (![0, 1, 2, 3, 4, 5].includes(parseInt(choice)));

        if (constants.DEBUG) {
            constants.output(`[Event]DEBUG: Pre-Entrance to itemEffect: ${type}, ${choice},`);
        }

        await this.itemEffect(type, choice, player);
        return choice;
    }

    async getItem(player) {
        const luck = constants.randomNumber(1, 100);

        if (luck > 75) {
            const iD = constants.randomNumber(1, 3);
            constants.output(`you found a/an ${player.itemName('H', iD)}!`);
            player.insert('H', iD);
        } else if (luck < 75 && luck > 50) {
            const iD = constants.randomNumber(1, 3);
            constants.output(`you found a/an ${player.itemName('O', iD)}!`);
            player.insert('O', iD);
        } else if (luck < 50 && luck > 25) {
            const iD = constants.randomNumber(1, 3);
            constants.output(`you found a/an ${player.itemName('D', iD)}!`);
            player.insert('D', iD);
        } else {
            const iD = constants.randomNumber(1, 5);
            constants.output(`you found a/an ${player.itemName('S', iD)}!`);
            player.insert('S', iD);
        }
    }


    async promptItem(player, type) {
        if (constants.DEBUG)
            constants.output(`[Event]DEBUG: Entering Prompt item function for type ${type}.`);

        let response;

        if (player.typePresent(type) > 0) {
            do {
                constants.output("You have ");
                switch (type) {
                    case 'O':
                        constants.output("weapons");
                        break;
                    case 'D':
                        constants.output("armor");
                        break;
                    case 'S':
                        constants.output("special items");
                        break;
                    case 'H':
                        constants.output("healing items");
                        break;
                }
                constants.output(" available, View them? (y:yes || n: no)");

                response = await constants.input("Enter your choice: ");
            } while (response !== 'y' && response !== 'n');

            //Sends Player to useitem function, returns item they chose to calling function.
            if (response === 'y') {
                return this.useItem(type, player);
            } else if (response === 'n') {
                return 0;
            }
        }
        return -1;
    }

    //######################
    //MOSTER & BATTLE FUNCTIONS
    //######################

    async monstInfo(id) {
        if (constants.DEBUG)
            constants.output("[Event]DEBUG: Entering monsterinfo function.");
        let guy;

        switch (id) {
            case 1:
                await asciiArt.ascilobster();
                guy = new Monster("King Crab", 3, 2);
                break;
            case 2:
                await asciiArt.ascipirate();
                guy = new Monster("Pirate", 5, 3);
                break;
            case 3:
                await asciiArt.ascicastaway();
                guy = new Monster("Mad Castaway", 8, 2);
                break;
            case 4:
                await asciiArt.ascialligator();
                guy = new Monster("Alligator", 5, 6);
                break;
            case 5:
                await asciiArt.asciskeleton();
                guy = new Monster("Skeleton", 4, 4);
                break;
            case 6:
                await asciiArt.asciameoba();
                guy = new Monster("Giant Ameoba", 4, 6);
                break;
            case 7:
                await asciiArt.ascisiren();
                guy = new Monster("Siren", 7, 4);
                break;
            case 8:
                await asciiArt.ascisquid();
                guy = new Monster("Giant Squid", 6, 4);
                break;
            case 9:
                await asciiArt.ascizombie();
                guy = new Monster("Zombie", 8, 3);
                break;
            case 10:
                await asciiArt.asciwraith();
                guy = new Monster("Wraith", 6, 5);
                break;
            case 11:
                await asciiArt.asciskeletonN();
                guy = new Monster("Skeleton Knight", 10, 5);
                break;
            case 12:
                await asciiArt.ascicrabdragon();
                guy = new Monster("Crab Dragon", 15, 8);
                break;
            case 13:
                await asciiArt.ascikali();
                guy = new Monster("Kali: Hindu Goddess of Destruction.", 30, 10);
                break;
            case 14:
                await asciiArt.ascioldman();
                guy = new Monster("Old Man", 7, 3);
                break;
            case 20:
                await asciiArt.asciguardian();
                guy = new Monster("Endellos, Guardian of the ship", constants.randomNumber(16, 22), constants.randomNumber(4, 6));
                break;
            case 999:
                await asciiArt.ascicthulu();
                guy = new Monster("Cthulu, Great Old One, Dreamer of R'yleh", 100000, 1000);
                break;
            default:
                console.error("ERROR: In monstInfo, monster Id passed in does not exist");
                process.exit(1);
        }
        return guy;
    }

    /*Decider function, essentially rock paper scissors with two extra variables. */
    async decider(umove, enmove, adv, dmg, you, enem) {
        if (constants.DEBUG)
            constants.output(`[Event]DEBUG: Entering battle function. umove id: + umove +  enmove id: + enmove +  adv id: + adv +  dmg value: + dmg`)
        dmg = you.dmg;
        if (constants.DEBUG)
            constants.output(`[Event]DEBUG: Entering decider function`)

        let luck = constants.randomNumber(1, 100);
        switch (umove) {
            //Player chose attack
            case 1:
                switch (enmove) {
                    //Player chose attack || Enemy chose attack
                    case 1:
                        await asciiArt.asciattack();
                        switch (adv) {
                            case -1:
                                if (luck > 90) {
                                    constants.output(`As you struggle to regain your footing; The  ${enem.name}   comes at you with its full might, somehow at the last minute you manage to plant your feet and land a blow on the  ${enem.name}  dealing  ${dmg + 1} damage!`)
                                    enem.hp = enem.hp - (dmg + 1);
                                    return 0;
                                }
                                else {
                                    constants.output(`The  ${enem.name}   charges at your, and you attempt to match its fury with your own, but you cannot recover in time. The  ${enem.name} lands a crushing blow dealing  ${enem.dmg + 2} damage.`)
                                    you.damage(enem.dmg + 2);
                                    return -1;
                                }
                                break;
                            case 0:
                                if (luck > 50) {
                                    constants.output(`You and the  ${enem.name}   both go for the attack; luckily you are able to land yours and the  ${enem.name}   is not. You deal  ${dmg + 1}  damage!`)
                                    enem.hp = enem.hp - (dmg + 1);
                                    return 0;
                                }
                                else {
                                    constants.output(`You ready yourself for the attack, but so does your oppenent. The  ${enem.name}   shreds you on approach for ${enem.dmg + 1}  damage.`)
                                    you.damage(enem.dmg + 1);
                                    return -1;
                                }
                                break;
                            case 1:
                                if (luck > 20) {
                                    constants.output(`You attack the dazed  ${enem.name}. They attempt to return the blow, but it is a pitiful attempt at best and you land a crushing blow on the  ${enem.name} for  ${dmg + 2} damage!`)
                                    enem.hp = enem.hp - (dmg + 2);
                                    return 1;
                                }
                                else {
                                    constants.output(`You prepare to hit the stunned  ${enem.name}   with your full force, but by some unholy miracle they are able to deflect your attack and land a blow on you for  ${enem.dmg - 1}   damage.`)
                                    you.damage(enem.dmg - 1);
                                    return 0;
                                }
                                break;
                        }
                        break;
                    //Player chose attack || Enemy chose block
                    case 2:
                        await asciiArt.asciblock();
                        switch (adv) {
                            case -1:
                                if (luck > 90) {
                                    constants.output(`Even dazed, you steel your nerves for an attack on the  ${enem.name}  . They prepared with a block, but it did not matter, as your attack went straight through their defences, dealing  ${dmg + 1}  damage!`)
                                    enem.hp = enem.hp - (dmg + 1);
                                    return 0;
                                }
                                else {
                                    constants.output(`You can hardly see straight, but you still throw out an attack at the  ${enem.name}  . They were ready however and deflected your attack, knocking you back once again. `)
                                    return -1;
                                }
                                break;
                            case 0:
                                if (luck > 60) {
                                    constants.output(`The  ${enem.name}   knows your move, and raises it's defences, but they are not enough, and you are able to land an attack on the  ${enem.name}   for  ${dmg + 1}  damage!`)
                                    enem.hp = enem.hp - (dmg + 1);
                                    return 0;
                                }
                                else {
                                    constants.output(`You throw out an attack in an instant, but the  ${enem.name}   is able to react in time, blocking your attack`)
                                    return 0;
                                }
                                break;
                            case 1:
                                if (luck > 30) {
                                    constants.output(`The stumbling  ${enem.name}   tries to raise it's defenses, but it is too slow and you hit it for  ${dmg + 1}  damage!`)
                                    enem.hp = enem.hp - (dmg + 1);
                                    return 0;
                                }
                                else {
                                    constants.output(`You ready yourself for the attack, and charge at the  ${enem.name}  , but somehow it is able to raise it's defenses at the last possible second, deflecting your attack`)
                                    return 0;
                                }
                                break;
                        }

                        break;
                    ////Player chose attack || Enemy chose dodge
                    case 3:
                        await asciiArt.ascidodge();
                        switch (adv) {
                            case -1:
                                if (luck > 70) {
                                    constants.output(`Stunned, and unaware of your surroundings all you can make out is the outline of the  ${enem.name}   in front of you. Almost as a reflex you attack it; it attempts to dodge your attack but fails. You hit the  ${enem.name}   for  ${dmg + 1}  damage!`)
                                    enem.hp = enem.hp - (dmg + 1);
                                    return 0;
                                }
                                else {
                                    constants.output(`Unable to see anything but a blur, you still decide to attack the  ${enem.name}   it dodges your attack effortlessly, keeping you on the back foot`)
                                    return -1;
                                }
                                break;
                            case 0:
                                if (luck > 50) {
                                    constants.output(`You step towards the  ${enem.name}, and it seems wary of you. You throw out an attack at it, and it tries to dodge you but reacts too slowly. You hit the  ${enem.name}   for  ${dmg + 1}`)
                                    enem.hp = enem.hp - (dmg + 1);
                                    return 0;
                                }
                                else {
                                    constants.output(`You charge at the  ${enem.name}, but it is able to see through your moves, and dodges your every attack, leaving you stunned`)
                                    return -1;
                                }
                                break;
                            case 1:
                                if (luck > 15) {
                                    constants.output(`Ahead of you lie the ${enem.name} stumbling and unable to regain its footing. You move in for the attack, and before you do anything, it tries to dodge you. The  ${enem.name} is helpless; taking advantage of this you land a crushing blow dealing ${dmg + 2} damage!`)
                                    enem.hp = enem.hp - (dmg + 2);
                                    return 0;
                                }
                                else {
                                    constants.output(`You approach the fumbling  ${enem.name}   and attack it with everything you have. However it moves out of the way just in time leaving you stunned`)
                                    return -1;
                                }
                                break;
                        }
                    //Player chose attack || Enemy chose grab
                    case 4:
                        await asciiArt.ascigrab();
                        switch (adv) {
                            case -1:
                                if (luck > 60) {
                                    constants.output(`You stumble away from the  ${enem.name}   it approaches you, and grabs at you as you lose your footing. Reflexively you attack it, and by some miracle you're able to hit it for ${dmg} damage!`)
                                    enem.hp = enem.hp - dmg;
                                    return 0;
                                }
                                else {
                                    constants.output(`You try to regain your footing and attack the  ${enem.name}   as it approaches, but It grabs you before you can attack. You suffer  ${enem.dmg - 1}   damage.`)
                                    you.damage(enem.dmg - 1);
                                    return 0;
                                }
                                break;
                            case 0:
                                if (luck > 40) {
                                    constants.output(`You see the  ${enem.name}   approaching, and you know it's going for the grab, you time your attack perfectly and hit the  ${enem.name} for  ${dmg} damage!`)
                                    enem.hp = enem.hp - dmg;
                                    return 0;
                                }
                                else {
                                    constants.output(`You ready yourself for the attack, and as the  ${enem.name}   comes in you expect an attack, but it caught you off guard and went for the grab. You suffer  ${enem.dmg - 1}   damage.`)
                                    you.damage(enem.dmg - 1);
                                    return 0;
                                }
                                break;
                            case 1:
                                constants.output(`You approach the fumbling  ${enem.name}   and in it's stupor it tries to grab you. You respond to this by hitting it for  ${dmg + 2}  damage!`)
                                enem.hp = enem.hp - (dmg + 2);
                                break;
                        }

                        break;
                }
                break;
            //Player chose block || Enemy chose attack
            case 2:
                switch (enmove) {
                    case 1:
                        await asciiArt.asciattack();
                        switch (adv) {
                            case -1:
                                if (luck > 70) {
                                    constants.output(`Your vision blurred, you senses numbed, somehow you manage to block the  ${enem.name}  's attack.`)
                                    return 0;
                                }
                                else {
                                    constants.output(`You see the approach of the  ${enem.name}   but you are unable to put up your defenses in time, and they hit you for  ${enem.dmg}  damage!`)
                                    you.damage(enem.dmg);
                                    return 0;
                                }
                                break;
                            case 0:
                                if (luck > 40) {
                                    constants.output(`You see the  ${enem.name}   approaching, it's clearly ready to attack. You raise your defenses just in time delfecting the blow`)
                                    return 0;
                                }
                                else {
                                    constants.output(`The  ${enem.name}   moves on you faster than you imagined, you try to raise your defense but cannot block the attack in time. You suffer  ${enem.dmg}  damage!`)
                                    you.damage(enem.dmg);
                                    return 0;
                                }

                                break;
                            case 1:
                                if (luck > 20) {
                                    constants.output(`The  ${enem.name}   struggles to gain its balance, but you knew it would try a hasty attack, and you were able to block it in time.`)
                                    return 0;
                                }
                                else {
                                    constants.output(`The  ${enem.name}   cannot see straight and starts flailing about violently. Unfortunately you cannot block all of these attacks and suffer  ${enem.dmg - 1}   damage.`)
                                    return 0;
                                }
                                break;
                        }

                        break;
                    //Player chose block || Enemy chose block
                    case 2:
                        await asciiArt.asciblock();
                        switch (adv) {
                            case -1:
                                constants.output(`As you struggle to regain you balance, you decide the best course of action is to block. The  ${enem.name}   decided to do the same fearing an attack from you.`)
                                return 0;
                                break;
                            case 0:
                                constants.output(`You and the  ${enem.name}   both block at one and other, and you both feel a bit silly afterwards.`)
                                return 0;
                                break;
                            case 1:
                                constants.output(`You see the  ${enem.name}   stumbling about aimlessly, and still fear retaliation from it so you decide to block, and so does the  ${enem.name}  . You cant help but feel you missed an opportunity`)
                                return 0;
                                break;
                        }

                        break;
                    //Player chose block || Enemy chose dodge
                    case 3:
                        await asciiArt.ascidodge();
                        switch (adv) {
                            case -1:
                                constants.output(`In your confused state you decide to shield yourself against whatever the  ${enem.name}   might do. However when you regain focus you notice it feared an attack from you and chose to dodge`)
                                return 0;
                                break;
                            case 0:
                                constants.output(`Before you can even think about it, you block expecting an attack from the  ${enem.name}  , but it expected an attack from you aswell and dodged`)
                                return 0;
                                break;
                            case 1:
                                constants.output(`The  ${enem.name}   is still recovering from it's fumble, you approach it and fearing retalitation you block. The  ${enem.name}   just rolls away from you, and you feel as though you should have taken advantage of the state it was in`)
                                return 0;
                                break;
                        }

                        break;
                    //Player chose block || Enemy chose grab
                    case 4:
                        await asciiArt.ascigrab();
                        switch (adv) {
                            case -1:
                                if (luck > 90) {
                                    constants.output(`You stumble away from the  ${enem.name}   and try to block the oncoming grab, and by some miracle it works!`)
                                    return 0;
                                }
                                else {
                                    constants.output(`You fumble and try to regain your footing, fearing what the  ${enem.name}   you decide to block, but the  ${enem.name}   went for the grab and broke your guard. You suffer  ${enem.dmg}  damage.`)
                                    you.damage(enem.dmg);
                                    return 0;
                                }
                                break;
                            case 0:
                                if (luck > 80) {
                                    constants.output(`You block the  ${enem.name}  's grab, and by some miracle your guard hols up!`)
                                    return 0;
                                }
                                else {
                                    constants.output(`You attempt to block the  ${enem.name}  's grab, and the  ${enem.name}   is able to break your guard easily. You suffer  ${enem.dmg}  damage`)
                                    you.damage(enem.dmg);
                                    return 0;
                                }
                                break;
                            case 1:
                                constants.output(`You are able to block the  ${enem.name}  's grab as it fumbles away from you, but you wonder if maybe you wasted an opportunity to do some damage.`)
                                break;
                                break;
                        }
                        break;
                }
                break;
            //Player chose dodge || Enemy chose attack
            case 3:
                switch (enmove) {
                    case 1:
                        await asciiArt.asciattack();
                        switch (adv) {
                            case -1:
                                if (luck > 80) {
                                    constants.output(`You can see but an outline of the  ${enem.name}   as it approaches, but at the perfect time you dodge it's attack, leaving it stunned`)
                                    return 1;
                                }
                                else {
                                    constants.output(`You stumble around, trying to keep from falling over entirely, as the  ${enem.name}   approaches. When it attacks you try to dodge, but get hit with a crushing blow. You suffer  ${enem.dmg + 2} damage.`)
                                    you.damage(enem.dmg + 2);
                                    return 0;
                                }
                                break;
                            case 0:
                                if (luck > 50) {
                                    constants.output(`The  ${enem.name}   attacks you with all it has, and instead of trying to bear the brunt of it you dodge at the perfect time, leaving it stunned`)
                                    return 1;
                                }
                                else {
                                    constants.output(`The  ${enem.name}   approaches, ready to attack. When the attack comes you try to dodge, but it is too fast. You are left stunned and suffer  ${enem.dmg}  damage.`)
                                    you.damage(enem.dmg);
                                    return -1;
                                }
                                break;
                            case 1:
                                if (luck > 30) {
                                    constants.output(`You stand adjacent the confused  ${enem.name}   and it begins flailing about violently. You dodge just in time`)
                                    return 0;
                                }
                                else {
                                    constants.output(`You approach the  ${enem.name}  , as it stumbles about. However it begins flailing around randomly, and you are unable to dodge in time. You suffer  ${enem.dmg - 1}   damage`)
                                }
                                break;
                        }

                        break;
                    //Player chose dodge || Enemy chose block
                    case 2:
                        await asciiArt.asciblock();
                        switch (adv) {
                            case -1:
                                constants.output(`You cannot see straight, and you dont know where the  ${enem.name}   is coming from. Instinctively you dodge, and when you regain your senses you notice the  ${enem.name}   is blocking, clearly fearing an attack from you`)
                                return 0;
                                break;
                            case 0:
                                constants.output(`As you and the  ${enem.name}   stare eachother down, both unsure of the other's next move. you both play it safe. You deciding to dodge and the  ${enem.name}   deciding to block`)
                                return 0;
                                break;
                            case 1:
                                constants.output(`You see the  ${enem.name}   pitifully stumbling around, and still fear an attack, so you dodge, and notice that the  ${enem.name}   chose to block, you cant help but feel you missed you chance`)
                                return 0;
                                break;
                        }

                        break;
                    //Player chose dodge || Enemy chose dodge
                    case 3:
                        await asciiArt.ascidodge();
                        switch (adv) {
                            case -1:
                                constants.output(`You struggle to regain you balance and roll away, from where you know the  ${enem.name}   last was, they too rolled away from you.`)
                                return 0;
                                break;
                            case 0:
                                constants.output(`You lock eyes with the  ${enem.name}   you're sure it will attack so you dodge. It was sure you would attack aswell, and also chose to dodge`)
                                return 0;
                                break;
                            case 1:
                                constants.output(`The  ${enem.name}   struggles to regain it's balance, fear in its eyes. You still decide to dodge, and see that the  ${enem.name}   chose the same, you cant help but wonder if you missed your chance`)
                                return 0;
                                break;
                        }
                        break;
                    //Player chose dodge || Enemy chose grab
                    case 4:
                        await asciiArt.ascigrab();
                        switch (adv) {
                            case -1:
                                if (luck > 40) {
                                    constants.output(`You stumble away from the  ${enem.name}   you see it trying to grab you so you roll away at just the right time, leaving it stunned.`)
                                    return 1;
                                }
                                else {
                                    constants.output(`You stumble away from the  ${enem.name}   and try to dodge it's grab, but sadly you are too slow and suffer  ${enem.dmg - 1}   damage.`)
                                    you.damage(enem.dmg - 1);
                                    return 0;
                                }
                                break;
                            case 0:
                                if (luck > 25) {
                                    constants.output(`The  ${enem.name}   ran up to you and attempted to grab you, but you dodged at just the right time leaving it stunned.`)
                                    return 1;
                                }
                                else {
                                    constants.output(`You atttempted to dodge the  ${enem.name}  's grab, but were too slow and suffered  ${enem.dmg - 1}   damage.`)
                                    you.damage(enem.dmg - 1);
                                    return 0;
                                }

                                break;
                            case 1:
                                constants.output(`You saw the  ${enem.name}   and predicted it would grab, so you went for the dodge and evaded it, but you cant help but feel you should have taken advantage of it's fumbling`)
                                return 0;
                                break;
                        }
                    default:
                        console.error("ERROR: Passed in non-existent enemy move-Id")
                        process.exit(1);
                        break;
                }
                break;
            //Player chose grab
            case 4:
                switch (enmove) {
                    //Player chose grab|| Enemy chose attack
                    case 1:
                        await asciiArt.asciattack();
                        switch (adv) {
                            case -1:
                                if (luck > 80) {
                                    constants.output(`As you fumble about, you can barely make out the hazy outline of the approaching  ${enem.name}   but even as it goes for the attack you're able to grab it and deal  ${dmg}  damage!`)
                                    enem.hp = enem.hp - dmg;
                                    return 0;
                                }
                                else {
                                    constants.output(`As you struggle to regain your footing and grab, the  ${enem.name}   attacks you, and deals  ${enem.dmg}  damage.`)
                                    you.damage(enem.dmg);
                                    return 0;
                                }
                                break;
                            case 0:
                                if (luck > 60) {
                                    constants.output(`The  ${enem.name}   runs at you, ready to attack, but luckily your able to grab it on approach and the  ${enem.name}   takes  ${dmg}  damage!`)
                                    enem.hp = enem.hp - dmg;
                                    return 0;
                                }
                                else {
                                    constants.output(`You ready yourself for the  ${enem.name}  's move, but it caught you off guard and went for the attack. You suffer  ${enem.dmg}  damage.`)
                                    you.damage(enem.dmg);
                                    return 0;
                                }
                                break;
                            case 1:
                                if (luck > 40) {
                                    constants.output(`The  ${enem.name}   stumbles away from you aimlessly, hopeless to defend itself. You grab and beat it mercilessly for ${dmg + 2} damage!`)
                                    enem.hp = (enem.hp - (dmg + 2));
                                    return 0;
                                }
                                else {
                                    constants.output(`The  ${enem.name}   struggles to regain it's footing, so you go in for the grab and deal  ${dmg}  damage!`)
                                    enem.hp = enem.hp - dmg;
                                    return 0;
                                }

                                break;
                        }
                        break;
                    //Player chose grab || Enemy chose block
                    case 2:
                        await asciiArt.asciblock();
                        switch (adv) {
                            case -1:
                                if (luck > 50) {
                                    constants.output(`As you stumble and fall, you make the determination to take the  ${enem.name}   to the ground with you, you grab it through it's block and deal  ${dmg}  damage!`)
                                    enem.hp = enem.hp - dmg;
                                    return 0;
                                }
                                else {
                                    constants.output(`You fumble about, grabbing at the  ${enem.name}  , but sadly it's defenses hold up`)
                                    return 0;
                                }
                                break;
                            case 0:
                                constants.output(`You grab at the blocking  ${enem.name} it clearly was not expecting this. You deal ${dmg} damage!`)
                                enem.hp = enem.hp - dmg;
                                return 0;
                                break;
                            case 1:
                                constants.output(`You approach the stumbling  ${enem.name}   it tries to block you, so you go for the grab deal a whopping  ${dmg + 3} damage!`)
                                enem.hp = (enem.hp - (dmg + 3));
                                return 0;
                                break;
                        }
                        break;
                    //Player chose grab || Enemy chose dodge
                    case 3:
                        await asciiArt.ascidodge();
                        switch (adv) {
                            case -1:
                                if (luck > 90) {
                                    constants.output(`By some miracle, even while fumbling about you were able to grab the  ${enem.name} as it tried to dodge you. The  ${enem.name} takes  ${dmg}  damage!`)
                                    enem.hp = enem.hp - dmg;
                                    return 1;
                                }
                                else {
                                    constants.output(`You fumble about, grabbing at the  ${enem.name}   aimlessly, and it is able to dodge you effortlessly, keeping you stunned.`)
                                    return -1;
                                }
                                break;
                            case 0:
                                if (luck > 80) {
                                    constants.output(`The  ${enem.name}   was able to predict your grab, and dodges you, leaving you stunned`)
                                    return -1;
                                }
                                else {
                                    constants.output(`You grab at the  ${enem.name}   it tries to dodge you but is too slow, you deal  ${dmg}  damage!`)
                                    enem.hp = enem.hp - dmg;
                                    return 0;
                                }

                                break;
                            case 1:
                                constants.output(`You grab at the fumbling  ${enem.name}   it tries to dodge you hopelessly. You deal  ${dmg + 2}  damage!`)
                                enem.hp = enem.hp - (dmg + 2);
                                return 0;
                                break;
                        }
                        break;
                    //Player chose grab || Enemy chose grab
                    case 4:
                        await asciiArt.ascigrab();
                        switch (adv) {
                            case -1:
                                if (luck > 80) {
                                    constants.output(`The  ${enem.name}   approaches you as you stumble about, someohow you know it is going for a grab amd you are able to land one before it does! You deal  ${dmg}  damage!`)
                                    enem.hp = enem.hp - dmg;
                                    return 0;
                                }
                                else {
                                    constants.output(`You attempt to grab at the  ${enem.name}   in your stupor, but it is able to land its grab and you are not. You suffer  ${enem.dmg - 1}   damage.`)
                                    you.damage(enem.dmg - 1);
                                    return 0;
                                }
                                break;
                            case 0:
                                if (luck > 50) {
                                    constants.output(`You and the  ${enem.name}   both go for the grab, but you are the succesful one. You deal  ${dmg}  damage!`)
                                    enem.hp = enem.hp - dmg;
                                    return 0;
                                }
                                else {
                                    constants.output(`You and the  ${enem.name}   both go for the grab, but the  ${enem.name}   gets you first, you suffer  ${enem.dmg - 1}   damage.`)
                                    you.damage(enem.dmg - 1);
                                    return 0;
                                }
                                break;
                            case 1:
                                if (luck > 30) {
                                    constants.output(`You approach the fumbling  ${enem.name}   and even while it tries to grab you, you grab it and beat it senseless. You deal  ${dmg + 2} damage!`)
                                    enem.hp = (enem.hp - (dmg + 2));
                                    return 0;
                                }
                                else {
                                    constants.output(`You approach the fumbling  ${enem.name}   and somehow even while nearly collapses it is able to grab you first, and you suffer  ${enem.dmg - 1}   damage.`)
                                    you.damage(enem.dmg - 1);
                                    return 0;
                                }
                                break;
                        }
                        break;
                }
                break;
            default:
                console.error("ERROR: Passed in non-existent player move-Id, Id is:" + umove)
                break;
        }
        return 0;
    }


    async battle(player, Id) {
        let weathr = this.evt;
        let adv = 0;
        let enemove = 0;
        let buf;
        let Oitem, Ditem = 0;
        player.dmg = 1;
        player.dfc = 1;
        let guy;
        let monst;
        let c = "none";

        // Picks monster based on current weather type
        if (Id == 0) {
            if (weathr == 1) {
                guy = await this.monstInfo(constants.randomNumber(1, 4));
            } else if (weathr == 2) {
                guy = await this.monstInfo(constants.randomNumber(5, 8));
            } else {
                guy = await this.monstInfo(constants.randomNumber(9, 12));
            }
        } else {
            guy = await this.monstInfo(Id);
        }

        monst = guy;

        // Text to prompt item search
        constants.output(`A ${monst.name} jumps out at, there is no way they are letting you past.`);
        constants.output(`The ${monst.name} has ${monst.hp} health, and ${monst.dmg} damage`);
        constants.output(`You frantically search your pockets, trying to find something to help you fight the ${monst.name}.`);

        // Prompts the player to use either offensive or defensive items.
        Oitem = await this.promptItem(player, 'O');
        Ditem = await this.promptItem(player, 'D');

        // Actual battle loop
        do {
            c = "none";
            if (adv == 0) {
                enemove = await monst.enemyai(adv);
                constants.output(`You and the ${monst.name} stare each other down, no one is making a move yet.`);
            } else if (adv == 1) {
                enemove = await monst.enemyai(adv);
                constants.output(`The ${monst.name} stumbles backwards; now is the time to attack.`);
            } else {
                enemove = await monst.enemyai(adv);
                constants.output(`You stumble backwards, and the ${monst.name} moves in.`);
            }

            constants.output(`\n################`);
            constants.output(`Your HP: ${player.hp}`);
            constants.output(`################`);

            constants.output(`\n################`);
            constants.output(`${monst.name} HP: ${monst.hp}`);
            constants.output(`################`);

            constants.output(`\nWhat will you do; attack, grab, dodge, block, or use_item?`);

            do {
                c = await constants.input("");
            } while (c != "attack" && c != "dodge" && c != "block" && c != "grab" && c != "use_item");

            if (c == "attack") {
                adv = await this.decider(1, enemove, adv, player.dmg, player, monst);
            } else if (c == "block") {
                adv = await this.decider(2, enemove, adv, player.dmg, player, monst);
            } else if (c == "dodge") {
                adv = await this.decider(3, enemove, adv, player.dmg, player, monst);
            } else if (c == "grab") {
                adv = await this.decider(4, enemove, adv, player.dmg, player, monst);
            } else if (c == "use_item") {
                if (await this.promptItem(player, 'H') == -1) {
                    constants.output("You have no items you could use right now.");
                    await this.buffer('.');
                    buf = await constants.input("");
                }
            }

        } while (monst.hp > 0 && player.hp > 0);

        if (player.hp <= 0) {
            constants.output(`The ${monst.name} knocks you to the ground, you struggle to get up, but are too weak to do anything but lie there. They move in for the killing blow, and all you can do is close your eyes`);
            await this.buffer('.');
            buf = await constants.input("");
            return;
        }

        else if (monst.hp <= 0 && player.hp > 0) {
            await asciiArt.asciwin();
            player.enemfelled = player.enemfelled + 1
            let chance = constants.randomNumber(1, 50);
            constants.output(`\nThe ${monst.name} falls beaten to the ground, You have won this encounter.`);
            if (chance > 35) {
                let type;
                let id = 0;
                let item = await player.genranditem(type, id);
                constants.output(`You notice that the defeated ${monst.name} was carrying a/an ${player.itemName(item.type, item.id)}!`);
                player.insert(item.type, item.id);
            } else if (chance > 15 && chance < 35) {
                let batts = constants.randomNumber(1, 4);
                constants.output(`Much to your surprise, you also notice the ${monst.name} had ${batts} batteries, so you take them for yourself!`);
                player.batt = (player.batt + batts);
            }

            if (Oitem > 0) {
                let luck = constants.randomNumber(1, 100);
                if (luck < 20) {
                    constants.output(`You stand next to the fallen ${monst.name}. Your pride swells, but as you go to put your ${player.itemName('O', Oitem)} you notice to your dismay that it has broken.`);
                    await this.buffer('.');
                    if (player.remove('O', Oitem) == 0) {
                        console.error("ERROR: Attempting to remove a broken weapon; that does not exist.");
                    }
                }
                await this.buffer('.');
            }

            if (Ditem > 0) {
                let luck = constants.randomNumber(1, 100);
                if (luck < 20) {
                    constants.output(`As you walk away from the fallen ${monst.name} you notice your ${player.itemName('D', Ditem)} has been left in pieces, and it crumbles off your body.`);
                    await this.buffer('.');
                    buf = await constants.input("");
                    if (player.remove('D', Ditem) == 0) {
                        console.error("ERROR: Attempting to remove broken armor, that does not exist.");
                    }
                }
            }
        }
        return;
    }

    //######################
    //MISC FUNCTIONS
    //######################

    async buffer(exp) {
        switch (exp) {
            case '.':
                constants.output("Continue. (Any key)");
                await constants.input('');
                return;
            case '?':
                constants.output("Continue? (Any key)");
                await constants.input('');
                return;
            case '_':
                constants.output("Continue... (Any key)");
                await constants.input('');
                return;
        }
    }

    async next(player) {
        if (constants.DEBUG) {
            constants.output("Entering next function");
        }

        constants.output("\n\n");
        if (player.hp > 0) {
            constants.output("================================");
            constants.output(`Hp: ${player.hp}`);
            constants.output(`Distance Travelled: ${player.delta}`);
            constants.output(`Distance Remaining: ${player.dist - player.delta}`);
            constants.output(`Batteries: ${player.batt}`);
            constants.output(`# of Items: ${player.size()}`);
            constants.output("================================");

            await this.promptItem(player, 'H');
            await this.promptItem(player, 'S');
            await this.buffer('.');

            if (constants.DEBUG) {
                constants.output(`[Event]DEBUG: In next function. Current node has distance of ${this.dist} and event id of ${this.evt}`);
            }

            // let tmp = this.start;
            // this.start = this.start.next;
            // tmp = null;

            if (constants.DEBUG) {
                constants.output(`New node has a distance of ${this.dist}, and an event ID of ${this.evt}`);
            }

            return;
        } else {
            return;
        }
    }

    async wormhole(x, player) {
        // for (let i = 0; i < x; i++) {
        //     let tmp = this.start;
        //     this.start = this.start.next;
        //     tmp = null;  // In JavaScript, setting an playerect to null will allow the garbage collector to clean it up
        // }
        player.delta = (player.delta + x);
    }

    //############
    //JUICY EVENTS
    //############
    async start(player) {
        let choice;
        await asciiArt.ascibox();
        constants.output("As you start down your chosen path, a box appears in front of you. This box is like no other you have seen before, you feel an entity within it, and it's as if the box is asking you something");
        constants.output("It queries, health, defence, offence, or special?");

        do {
            choice = await constants.input("Enter your choice: ");
        } while (!["health", "defence", "offence", "special"].includes(choice));

        let val = 3;
        if (choice === "special")
            val = 5;

        let item = constants.randomNumber(1, val);
        if (choice === "health") {
            constants.output(`You hesitate at first and then respond. 'Health' you say, and without delay the box opens up to reveal a ${player.itemName('H', item)}. You reach leto the box and grab it. Upon obtaining your ${player.itemName('H', item)} the box vanished before your eyes.`);
            player.insert('H', item);
        }
        else if (choice === "defence") {
            constants.output(`You hesitate at first and then respond. 'Defence' you say, and without delay the box opens up to reveal a ${player.itemName('D', item)}. You reach leto the box and grab it. Upon obtaining your ${player.itemName('D', item)} the box vanished before your eyes.`);
            player.insert('D', item);
        }
        else if (choice === "offence") {
            constants.output(`You hesitate at first and then respond. 'Offence' you say, and without delay the box opens up to reveal a ${player.itemName('O', item)}. You reach leto the box and grab it. Upon obtaining your ${player.itemName('O', item)} the box vanished before your eyes.`);
            player.insert('O', item);
        }
        else if (choice === "special") {
            constants.output(`You hesitate at first and then respond. 'Special' you say, and without delay the box opens up to reveal a ${player.itemName('S', item)}. You reach leto the box and grab it. Upon obtaining your ${player.itemName('S', item)} the box vanished before your eyes.`);
            player.insert('S', item);
        }

        //await this.battle(player, 1);
        await this.next(player);
    }

    //NEEDS FIXING
    /* Cave event: Player enters a cave, and can use their flashlight to see better (give better chances), and then chooses twice between the path on the right, or the path on the left. Each path has a random chance of something happening inside that room */
    async cave(player) {
        await asciiArt.ascicave()
        constants.output("You find you path blocked by a cave, on all sides of the it are water, so the only way forward is through the cave.")
        constants.output("As you enter the cave, darkness envelops you, you can scarcely make out where the walls are. You realize your flashlight would come in very handy here, but that would mean using up a battery.")
        let c = 'm';
        let buf;
        let length
        //Block that runs if player has batteries
        if (player.batt > 0) {
            constants.output("Would you like to use a battery? (y:yes||n:no)")
            //Prompts player to use a battey
            // do {
            c = await constants.input("Enter your choice: ");
            // } while (c !== 'y' && c !== 'n');
        }
        //If player does not have batteries, treats it as if they chose not to use them.
        else {
            constants.output("Sadly you are all out of batteries.")
            c = 'n';
        }

        //Player chose to use a battery
        if (c == 'y' && player.hp > 0) {
            length = constants.randomNumber(3, 5);
            let roomluck = new Array(length);
            for (let i = 0; i <= length; i++)
                roomluck[i] = 0;

            let choice;
            for (let i = 0; i < length; i++) {

                constants.output("You enter room # " + i + 1 + " of the cave.")
                if (roomluck[i] == 0) {
                    if (constants.DEBUG)
                        constants.output("[Event]DEBUG:Cave event knows player is in first room, setting luck value to 100")
                    roomluck[i] = 100;
                }
                else {
                    if (constants.DEBUG)
                        constants.output("[Event]DEBUG:In room #" + i + 1 + " luck value is: " + roomluck[i])
                    //BLocks that run to determine events in each room, dependent on luck value.
                    if (roomluck[i] < 20) {
                        constants.output("This room is empty, there is nothing but cold stone here.")
                    }
                    else if (roomluck[i] > 20 && roomluck[i] < 40) {
                        constants.output("This room harbors something, alive. You can't be sure what, but you know it is coming right at you!")
                        await this.buffer('_');
                        await this.battle(player, 0);
                    }
                    else if (roomluck[i] > 40 && roomluck[i] < 70) {
                        constants.output("This room has something in the middle.You cannot tell what yet, but it glistens in the beam of your flashlight, ")
                        this.getItem(player);
                    }
                    else {
                        constants.output("This room is full of sharp stallagtites, and stallagmites. Without your flashlight to guide you, you would have surely been hurt")
                    }
                }
                if (i < length && player.hp > 0) {
                    constants.output("Ahead you see the cave diverges to the right and to the left, which path do you want to take?")
                    do {
                        choice = await constants.input("left or right: ");
                    } while (choice != "left" && choice != "right");
                    if (roomluck[i] > 50) {
                        //Sets luck for next room
                        if (choice == "left") {
                            roomluck[i + 1] = constants.randomNumber(1, 50);
                        }
                        else {
                            roomluck[i + 1] = constants.randomNumber(50, 100);
                        }
                    }
                    else {
                        //Sets luck for next room
                        if (choice == "left") {
                            roomluck[i + 1] = constants.randomNumber(50, 100);
                        }
                        else {
                            roomluck[i + 1] = constants.randomNumber(1, 50);
                        }
                    }
                }
                else if (player.hp > 0) {
                    constants.output("Finally, you see it; the light at the end of the tunnel! You've made it out of the cave with your life")
                    await this.next(player);
                    return;
                }
                else {
                    if (constants.DEBUG)
                        constants.output("[Event]DEBUG:In cave function, player has died.")
                    return;
                }
            }
            if (player.hp > 0) {
                constants.output("Finally, you see it; the light at the end of the tunnel! You've made it out of the cave with your life")
                await this.buffer('.');
                await this.next(player);
                return;
            }
            else {
                if (constants.DEBUG)
                    constants.output("[Event]DEBUG:In cave function, player has died.")
                return;
            }
        }
        else if (player.hp > 0) {
            length = constants.randomNumber(3, 5);
            let roomluck = new Array(length);
            for (let i = 0; i <= length; i++)
                roomluck[i] = 0;

            let choice;
            for (let i = 0; i < length; i++) {
                constants.output("\nYou enter room # " + i + 1 + " of the cave.")
                //If player is in the first toom, set their luck to 100
                if (roomluck[i] == 0) {
                    if (constants.DEBUG)
                        constants.output("[Event]DEBUG:Cave event knows player is in first room, setting luck value to 100")
                    roomluck[i] = 100;
                }
                else {
                    if (constants.DEBUG)
                        constants.output("[Event]DEBUG:In room #" + i + 1 + " luck value is: " + roomluck[i])
                    //Blocks that determine what happens in each of the rooms, based on luck value.
                    if (roomluck[i] < 25) {
                        constants.output("This room feels emptier than the others, you can hear your every footstep echoing against the cave walls.")
                    }
                    else if (roomluck[i] > 25 && roomluck[i] < 50) {
                        constants.output("This room harbors something, alive. You can't be sure what, but you know it is coming right at you!")
                        await this.buffer('_');
                        // buf = await constants.input("Enter your choice: ");
                        await this.battle(player, 0);
                    }
                    else if (roomluck[i] > 50 && roomluck[i] < 75) {
                        constants.output("You stumble through this room in the darkness, unable to see anything that might harm you, or help you.")
                    }
                    else {
                        let dmg = constants.randomNumber(1, 5);
                        constants.output("You enter this room, and get cut almost instantly. You cannot be sure what is hurting you so you just keep running frantically trying to find and exit. Your clothes are in tatters, and your body has been broken. (-" + dmg  + " Hp")
                        player.hp = (player.hp - dmg);
                        await this.buffer('.');
                    }
                }
                if (i < length && player.hp > 0) {
                    constants.output("Ahead you can barely make out that the cave diverges to the right and to the left, which path do you want to take?")
                    do {
                        choice = await constants.input("left or right: ");
                    } while (choice != "left" && choice != "right");
                    if (roomluck[i] > 50) {
                        //Assigns luck values to the next room
                        if (choice == "left") {
                            roomluck[i + 1] = constants.randomNumber(50, 100);
                        }
                        else {
                            roomluck[i + 1] = constants.randomNumber(1, 50);
                        }
                    }
                    else {
                        //Assigns luck values to the next room
                        if (choice == "left") {
                            roomluck[i + 1] = constants.randomNumber(1, 50);
                        }
                        else {
                            roomluck[i + 1] = constants.randomNumber(50, 100);
                        }
                    }
                }
                else if (player.hp > 0) {
                    constants.output("Finally, you see it; the light at the end of the tunnel! You've made it out of the cave with your life")
                    await this.buffer('.');
                    await this.next(player);
                    return;
                }
                else {
                    if (constants.DEBUG)
                        constants.output("[Event]DEBUG:In cave function, player has died.")
                    return;
                }
            }
            if (player.hp > 0) {
                constants.output("Finally, you see it; the light at the end of the tunnel! You've made it out of the cave with your life")
                await this.buffer('.');
                await this.next(player);
                return;
            }
            else {
                if (constants.DEBUG)
                    constants.output("[Event]DEBUG:In cave function, player has died.")
                return;
            }
        }
        //Prlets to the screen telling the player they have made it out of the cave.
        constants.output("\nFinally you see it, the light at the end of the tunnel. At first it blinds you, but when your eyes adjust you're shocked to discover you are actually relieved to be back on the path and out of that cave.")
        await this.buffer('.');
        await this.next(player);
        return;
    }

    /*Whale bone event, player is given three bones to chose from, only one bone is the right bone, and its randomly assigned. The other two do nothing, and damage the p;ayer respectively. */
    async whalebones(player) {
        let x = 0;
        let bones = [0, 1, 1, 1]; // JavaScript array indexes start at 0
        let out = false;
        let luck = constants.randomNumber(1, 99);

        constants.output("\nAs you continue onwards, You find your path blocked by a whale skeleton. The only way onwards, is through the whale skeleton.\n You enter pile of giant bones laid out head of you; the skeleton of this leviathan entraps you.\n You see no way to physically progress through the bones, but you notice there are three bones that seem to bear a large portion of the skeleton's weight.");
        constants.output("You infer that in order to progress you must pull out one of these bones, and hopefully collapse the skeleton in just the right way allowing you to escape.No one bone seems safer than any other; you must only decide which one to start with.");

        while (!out) {
            if (constants.DEBUG) {
                constants.output("[Event]DEBUG: Bone count");
                for (let i = 1; i < 4; i++)
                    constants.output("Bone #" + i + ":" + bones[i]);
            }
            constants.output("Which bone will you pull;");
            for (let i = 1; i < 4; i++) {
                if (bones[i] == 1) {
                    if (bones[i + 1] == 1) {
                        constants.output(i + ", ");
                    }
                    else {
                        constants.output(i + ".");
                    }
                }
            }

            do {
                x = parseInt(await constants.input("Enter a bone number (1, 2, or 3):"));
            } while (x != 1 && x != 2 && x != 3);
            switch (x) {
                case 1:
                    if (bones[1] == 1) {
                        if (luck < 33) {
                            constants.output("As you pull out the bone, to your utter joy you witness the skeleton perfectly collapsing in front of you, allowing you to exit the whale's bones.");
                            out = true;
                        }
                        else if (luck >= 33 && luck < 66) {
                            constants.output("You pull the bone out, at first there is a rumble in the skeleton, and then nothing. It appears this bone was the wrong one.");
                            bones[1] = 0;
                        }
                        else {
                            constants.output("As you yank the bone out, you are instantly filled with a deep regret. The entirety of the whale skeleton collapses on you, crushing you beneath its titanic weight. -4 HP");
                            player.hp = (player.hp - 4);
                            out = true;
                        }
                    }
                    else {
                        constants.output("You have already pulled this bone.");
                    }
                    break;
                case 2:
                    if (bones[2] == 1) {
                        if (luck < 33) {
                            constants.output("You pull the bone out, at first there is a rumble in the skeleton, and then nothing. It appears this bone was the wrong one.");
                            bones[2] = 0;
                        }
                        else if (luck >= 33 && luck < 66) {
                            constants.output("As you yank the bone out, you are instantly filled with a deep regret. The entirety of the whale skeleton collapses on you, crushing you beneath its titanic weight. -4 HP");
                            player.hp = (player.hp - 4);
                            out = true;
                        }
                        else {
                            constants.output("As you pull out the bone, to your utter joy you witness the skeleton perfectly collapsing in front of you, allowing you to exit the whale's bones.");
                            out = true;
                        }
                    }
                    else {
                        constants.output("You have already pulled this bone.");
                    }
                    break;
                case 3:
                    if (bones[3] == 1) {
                        if (luck < 33) {
                            constants.output("As you yank the bone out, you are instantly filled with a deep regret. The entirety of the whale skeleton collapses on you, crushing you beneath its titanic weight. -4 HP");
                            player.hp = (player.hp - 4);
                            out = true;
                        }
                        else if (luck >= 33 && luck < 66) {
                            constants.output("As you pull out the bone, to your utter joy you witness the skeleton perfectly collapsing in front of you, allowing you to exit the whale's bones.");
                            out = true;
                        }
                        else {
                            constants.output("You pull the bone out, at first there is a rumble in the skeleton, and then nothing. It appears this bone was the wrong one.");
                            bones[3] = 0;
                        }
                    }
                    else {
                        constants.output("You have already pulled this bone.");
                    }
                    break;
            }
        }

        await this.next(player);
    }

    async sharkordolphin(player) {
        let luck = constants.randomNumber(1, 100);

        constants.output("You come to a gap in your path, the gap is filled with water but large enough to jump over. You notice something swimming in the gap however, all you can make out is the fin on it's back.");
        constants.output("From this you conclude the swimming creature must be either a shark, or a dolphin. You know that if you jump in and hitch a ride on a dolphins back, it may take you anywhere from 3 to 6 kilometers closer to the ship. If it is a shark however, it would surely maul you for attempting to ride it.");
        constants.output("Do you wish to risk it? (y:yes||n:no)");

        let c = 'o';
        do {
            c = await constants.input("");
        } while (!['y', 'n'].includes(c));

        // Block that runs if a player decides to risk a shark attack
        if (c == 'y') {
            if (luck > 60) {
                await asciiArt.ascidolphin();
                let dolphdist = constants.randomNumber(3, 6);

                constants.output("Just your luck, it was a dolphin! The dolphin seems overjoyed to see you, and instantly takes off towards the ship with you on it's back.");
                constants.output("The dolphin swims into another gap very similar to the one which you first found it in, and you hop off. You judge it must have take you " + dolphdist + ": kilometers closer!");
                await this.wormhole(dolphdist, player);
                await this.next(player);
                return;
            } else {
                await asciiArt.ascishark();
                player.hp = (Math.floor(player.hp / 2));
                constants.output("As you jump in, you notice a set of jaws erupting from the water to catch you, and you know you have made a mistake. You fight with the beast for what feels like forever, and when you finally get away you're left with " + player.hp + " hp.");
                await this.next(player);
                return;
            }
        }
        // Block that runs if player decides NOT to risk a shark attack
        else {
            constants.output("You decide it would be safer to just jump over the gap, and continue on foot.");
            await this.next(player);
            return;
        }
    }

    async fog(player) {
        let c;
        let luck = constants.randomNumber(1, 50);
        await asciiArt.ascidodge();
        constants.output("You enter a thick fog, so thick you can hardly see you hands in front of you. You fear what dangers could be lurking in the fog, wholly hidden from view but apt to cause you harm.");
        constants.output("You know your flashlight could cut through this fog easily, but that would mean using a battery.");

        if (player.batt > 0) {
            do {
                c = await constants.input("\nDo you wish to use a battery? (y:yes || n:no)");
            } while (!['y', 'n'].includes(c));
        } else {
            constants.output("\nSadly, you are out of batteries");
            await this.buffer('.');
            c = 'n';
        }

        if (c == 'y') {
            player.batt = (player.batt - 1);
            await asciiArt.ascibulb();
            if (luck > 15) {
                constants.output("With your flashlight, you are able to see further into the fog. You see hazy outlines of what could be dangers, and stick to the path of least resistance. After what feels like an eternity, you make it through the fog.");
            } else {
                let item = constants.randomNumber(1, 3);
                constants.output("Using the beam of your flashlight you easily cut through the fog. You see your fear was almost entirely unfounded, as the fog is devoid of any danger. As you continue along you find a " + player.itemName('H', item) + " on the ground, you know this will be useful later and decide to take it with you.");
                player.insert('H', item);
            }
            await this.buffer('.');
        } else if (c == 'n') {
            if (luck > 40) {
                constants.output("You stumble through the fog blindly, terrified by every dark shape. You see things moving in the fog, and hear unholy sounds coming from the depths of it, but by some miracle you manage to make it through.");
                await this.buffer('.');
            } else if (luck < 40 && luck > 15) {
                constants.output("Even though you cannot see you way, you trudge forwards. You try to avoid any hazy shape you can make out in the fog, but your caution was not enough.");
                constants.output("Something or someone in the fog attacks you, and you fall unconscious. When you come to the fog has cleared, but you're in deep pain. Hp - 3");
                await this.buffer('.');
                player.hp = (player.hp - 3);
            } else {
                constants.output("You move through the fog, blind and unaware of your surroundings, and the whole time you feel as though you are being watched. You feel as though you can see the edge of the fog, when your paranoia proves to be justified.");
                await this.buffer('.');
                await this.battle(player, 0);
            }
        }

        await this.next(player);
    }

    /* Outcrop function. Player is informed there is an item at the top of an outcropping of varying height. Player can chose to climb it to retrieve item. If player falls they lose Hp proportional to the height they climbed. They can attempt the climb as many times as they want, their chances will change every time */
    async outcrop(player) {
        let height = constants.randomNumber(3, 6);
        //let itemtype = constants.randomNumber(1, 100);
        let iD = 0;
        let type = 'n';
        // if (itemtype > 75) {
        //     iD = constants.randomNumber(1, 3);
        //     type = 'H';
        // } else if (itemtype < 75 && itemtype > 50) {
        //     iD = constants.randomNumber(1, 3);
        //     type = 'O';
        // } else if (itemtype < 50 && itemtype > 25) {
        //     iD = constants.randomNumber(1, 3);
        //     type = 'D';
        // } else {
        //     iD = constants.randomNumber(1, 5);
        //     type = 'S';
        // }
        // iD = constants.randomNumber(1, 3);
        let item = await player.genranditem()
        iD = item.val
        type = item.type
        constants.output(`You come to a raised rocky outcropping, you judge it might be ${height * 3} meters  above sea level.`);
        constants.output(`You almost just kept on walking were it not for the ${player.itemName(item.type, item.id)} you spotted sitting atop the outcropping!`);
        constants.output(`You think you can climb up to it, but falling from ${height * 3} meters would certainly hurt`);
        constants.output(`Would you like to climb up to the ${player.itemName(item.type, item.id)}? (y:yes||n:no)`);
        let c = '';
        do {
            c = await constants.input("Enter your choice: ");
        } while (c != 'y' && c != 'n');
        if (c == 'y') {
            let fallen = false;
            let climbluck = new Array(height);
            for (let i = 0; i < height; i++) {
                climbluck[i] = constants.randomNumber(1, 100);
            }
            for (let i = 0; i < height; i++) {
                if (i == 0) {
                    constants.output(`You climb up the first three meters with little effort, but you notice the next ${height - (i + 1) * 3} meters might be more treacherous`);
                } else {
                    if (climbluck[i] < 20) {
                        constants.output(`You climb up, meter after meter, but this outcropping is far from forgiving. You feel your finger slip, and then you plummet ${i + 1 * 3} meters to the ground. (-${i + 1} Hp )`);
                        player.hp = player.hp - i;
                        fallen = true;
                    } else if (climbluck[i] > 20 && climbluck[i] < 60) {
                        constants.output(`You climb further up the outcropping, you guess you are now ${i * 3} meters off the ground...`);
                    } else {
                        constants.output(`Your hands find their placement perfectly, and you climb up the rock with ease, and before you realize it you are ${i * 3} meters high...`);
                    }
                    if (!fallen && player.hp > 0) {
                        constants.output("Continue climbing? (y:yes || n:no)");
                        let climbvar = '';
                        do {
                            climbvar = await constants.input("Enter your choice: ");
                        } while (climbvar != 'y' && climbvar != 'n');
                        if (climbvar == 'n') {
                            fallen = true;
                        }
                    } else if (player.hp <= 0) {
                        return;
                    }
                    if (fallen) {
                        constants.output(`You sit defeated at the bottom of the outcropping, your mind still on the ${player.itemName(item.type, item.id)} at the top.`);
                        constants.output(`You could try for it again, your Hp is at ${player.hp}, so it might be a risky move.`);
                        constants.output("Would you like to try again? (y:yes||n:no)");
                        let redo = '';
                        do {
                            redo = await constants.input("Enter your choice: ");
                        } while (redo != 'y' && redo != 'n');
                        if (redo == 'y') {
                            constants.output("You wont be beaten that easily, not by a rock that's for sure");
                            for (let i = 0; i < height; i++) {
                                climbluck[i] = constants.randomNumber(1, 100);
                            }
                            i = 0;
                            fallen = false;
                        } else {
                            constants.output("You decide against giving it another go, you've still got a long ways ahead and cant afford to lose any more health.");
                            break;
                        }
                    }
                }

            }
            if (!fallen) {
                constants.output(`You made it to the top! You can scarcely believe you were able to make it, but now that you're here you are able to claim the ${player.itemName(item.type, item.id)} for yourself.`);
                player.insert(item.type, item.id);
            }
        }
        else {
            constants.output(`You decide it would be best to reserve what Hp you have left, you've got a long road ahead of you and a/an ${player.itemName(item.type, item.id)} is not worth the potential injury`);
        }
        await this.next(player);
        return;
    }

    /*Old man event, an old man will ask the player for an item. If they have one, they can chose to give it to him or not. If not he may attack them, if they give it to him he may give them a better one. */
    async oldman(player) {
        await asciiArt.ascioldmanevent();
        let luck = constants.randomNumber(1, 100);
        constants.output("As you continue along your path, you find an old man sitting along the shore. As you approach you find it hard to discern if he is even alive or dead, but when the old man notices you he gestures weakly for you to approach him closer");
        constants.output("The old man is not able to speak, but you can tell from his weak gestures that he wants an item");

        if (player.empty() == 0) {
            let c = 'm';
            constants.output("You do have something you could offer the man; will you give him an item? (y:yes||n:no)");
            do {
                c = await constants.input("Enter your choice: ");
            } while (c != 'y' && c != 'n');
            if (c == 'y') {
                let gift = 'N';
                //Checks if player have any health items, if so gives the first in the list to the old man
                if (player.typepresent('H') > 0) {
                    let id;
                    for (let i = 1; i < 3; i++) {
                        if (player.doeshave('H', i)) {
                            id = i;
                            i = 3;
                        }
                    }
                    player.remove('H', id);
                    constants.output("You gave the old man a/an " + player.itemName('H', id) + " he seems overjoyed with the gift!");
                    gift = 'H';
                }
                //Checks if player have any defence items, if so gives the first in the list to the old man
                else if (player.typepresent('D') > 0) {
                    let id;
                    for (let i = 1; i < 3; i++) {
                        if (player.doeshave('D', i)) {
                            id = i;
                            i = 3;
                        }
                    }
                    player.remove('D', id);
                    constants.output("You gave the old man a/an " + player.itemName('D', id) + " he seems overjoyed with the gift!");
                    gift = 'D';
                }
                //Checks if player have any offence items, if so gives the first in the list to the old man
                else if (player.typepresent('O') > 0) {
                    let id;
                    for (let i = 1; i < 3; i++) {
                        if (player.doeshave('O', i)) {
                            id = i;
                            i = 3;
                        }
                    }
                    player.remove('O', id);
                    constants.output("You gave the old man a/an " + player.itemName('O', id) + " he seems overjoyed with the gift!");
                    gift = 'O';
                }
                //Checks if player has any special items, if so gives the first in the list to the old man
                else if (player.typepresent('S') > 0) {
                    let id;
                    for (let i = 1; i < 5; i++) {
                        if (player.doeshave('S', i)) {
                            id = i;
                            i = 5;
                        }
                    }
                    player.remove('S', id);
                    constants.output("You gave the old man a/an " + player.itemName('S', id) + " he seems overjoyed with the gift!");
                    gift = 'S';
                }

                //Block that will sometimes run if player gave the old man an item, he will heal the player and give them the best item of whatever type they gave him.
                if (luck > 65) {
                    constants.output("The man was so pleased with his gift, he decided to heal you for 5 hp points, and he gave you a/an " + player.itemName(gift, 3) + "!");
                    player.hp = player.hp + 5;
                    player.insert(gift, 3);
                }
            }
            //Runs if player has items to give, but decided not to share
            else {
                if (constants.DEBUG)
                    constants.output("[Event]DEBUG:Did not give old man an item");
                if (luck > 30) {
                    constants.output("Before you can even tell the old man you do not want to give him an item, he gets up abruptly and attacks you");
                    await this.buffer('.')
                    await this.battle(player, 14);
                }
                else {
                    constants.output("You tell the man you cannot bear to part with any of your items, as you may need them along the way, he seems disappointed but understanding.");
                }
            }
        }
        //Block that runs if player have no items to give the old man (rare)
        else {
            constants.output("You explain to the man that your pockets are as empty as his; he gives you a pained but understanding gesture, and looks back over the sea. You continue along your way");
        }
        await this.buffer('.')
        await this.next(player);
        return;
    }

    /*Tree event; Player can reach into a hole in a tree, and there is a random chance they will either get an item, get the secret key, or enter a battle event. */
    async tree(player) {
        // generates luck value
        await asciiArt.ascitree
        let luck = constants.randomNumber(1, 50);
        constants.output("You come upon a dead tree in the middle of your path. This tree has a large hole in the center of it, and you think there might be something inside.");
        constants.output("Do you want to reach inside? (y:yes || n: no)");

        // Loop to get correct player input
        let c = 'm';
        do {
            c = await constants.input("Enter your choice: ");
        } while (c != 'y' && c != 'n');

        if (c == 'y') {
            // Determines outcome based on luck variable
            if (luck > 40) {
                constants.output("You reach into the tree, and to your suprise you feel something inside. When you pull it out you discover you have found a Mysterious Key");
                await asciiArt.ascikey(); // this is assuming that ascikey() is a function defined somewhere in your code
                constants.output("\nYou dont know how, but somehow you understand that this key is very important.");
                player.insert('S', -1);
            }
            else if (luck < 40 && luck > 25) {
                let id = constants.randomNumber(1, 3);
                constants.output("You reach into the tree, and fumble around for a while until you feel something. When you pull that something out you notice its a/an " + player.itemName('O', id) + "!");
                player.insert('O', id);
            }
            else {
                constants.output("As you reach into the tree, you fee the hole closing faster and faster around your arm. You try to pull it out in time but to no avail, this tree was clearly a trap and you walked right into it");
                constants.output("You hear someone or something approaching, but cannot make out what it is yet...");
                await this.battle(player, 0); // this is assuming that battle(player, 0) is a function defined somewhere in your code
            }
        }
        else {
            constants.output("You decide against reaching into the tree, anything could be in there and you dont want to risk it");
        }
        await this.next(player);
        return;
    }

    /*Shop function: Player can purchase three random items for batteries*/
    async shop(player) {
        await asciiArt.ascishop();
        let type = [];
        let id = [];
        let prices = [];

        for (let i = 0; i < 3; i++) {
            type[i] = await this.randitem();
            if (type[i] === 'S') {
                id[i] = constants.randomNumber(1, 5);
                prices[i] = i + constants.randomNumber(1, 3);
            } else {
                id[i] = constants.randomNumber(1, 3);
                prices[i] = i + constants.randomNumber(1, 2);
            }
        }

        if (constants.DEBUG)
            constants.output("[Main]DEBUG:In shop, first item in the has a type of: "+ type[0] +", and an id of: "+ id[0] +".")

        constants.output("\nYou approach what seems to be a small shack along the shore.");
        constants.output("When you near the shack you see there is a man inside. He is trying to say something to you, but you cant quite make out what");
        constants.output("'Hello!' says the man. 'Welcome to my store traveler!");
        constants.output("The store has 3 items for sale, all items appear to be purchased using batteries.");

        let c = 'm';
        do {
            for (let i = 0; i < 3; i++) {
                if (id[i] > 0) {
                    constants.output(`Item#${i + 1} is a/an ${player.itemName(type[i], id[i])} for ${prices[i]} batteries.`);
                }
            }
            constants.output("\nDo you want to make a purchase? (1:Item#1 || 2:Item#2 || 3: Item#3 || 0: None)");

            let choice;
            do {
                choice = await constants.input("Enter your choice: ");
            } while (choice != 1 && choice != 2 && choice != 3 && choice != 0);

            if (choice == 1) {
                if (player.batt < prices[0]) {
                    constants.output("Sadly, you do not have enough batteries to purchase this item");
                } else if (id[0] == 0) {
                    constants.output("You already purchased this item");
                } else {
                    player.batt = (player.batt - prices[0]);
                    player.insert(type[0], id[0]);
                    constants.output(`You got a/an ${player.itemName(type[0], id[0])}! You have ${player.batt} batteries remaining.`);
                    id[0] = 0;
                }
            } else if (choice == 2) {
                if (player.batt < prices[1]) {
                    constants.output("Sadly, you do not have enough batteries to purchase this item");
                } else if (id[1] == 0) {
                    constants.output("You already purchased this item");
                } else {
                    player.batt = (player.batt - prices[1]);
                    player.insert(type[1], id[1]);
                    constants.output(`You got a/an ${player.itemName(type[1], id[1])}! You have ${player.batt} batteries remaining.`);
                    id[1] = 0;
                }
            } else if (choice == 3) {
                if (player.batt < prices[2]) {
                    constants.output("Sadly, you do not have enough batteries to purchase this item");
                } else if (id[2] == 0) {
                    constants.output("You already purchased this item");
                } else {
                    player.batt = (player.batt - prices[2]);
                    player.insert(type[2], id[2]);
                    constants.output(`You got a/an ${player.itemName(type[2], id[2])}! You have ${player.batt} batteries remaining.`);
                    id[2] = 0;
                }
            } else {
                constants.output("You choose not to purchase anything, and continue on your way.");
                c = 'n';
            }

            if (c != 'n') {
                constants.output("Continue shopping? (y:yes || n:no)");
                do {
                    c = await constants.input("Enter your choice: ");
                } while (c != 'y' && c != 'n');
            }

        } while (c != 'n');
        await this.next(player);
    }

    /*Lighthouse Function: Player explores a lighthouse of random floor height, each floor has 5 different events that can occur within.  */
    async lighthouse(player) {
        let abom = false;
        let done = false;
        let floors = constants.randomNumber(4, 8);
        let c = 'm';
        let choice = 'm';
        let luck = 0;
        await asciiArt.ascilighthouse();
        constants.output("\nYou approach what seems to be an abandoned lighthouse. It is at least " + floors + " floors and  " + floors * 10 + " meters tall, and it appears to be in a horrid state of disrepair. Despite all of this, you get the sense that you could find something very useful inside.");
        constants.output("Would you like to enter the lighthouse? (y:yes || n:no)");

        do {
            c = await constants.input("");
        } while (c != 'y' && c != 'n');

        if (c == 'y') {
            let i = 0;

            do {
                if (i == 0) {
                    constants.output("You decide to enter the lighthouse; the bottom floor of the lighthouse seemed to infer the whole thing may be dillapidated, and permeated with an overwhelming scent of rot");
                } else if (i == floors) {
                    let buf = ' ';
                    let type;
                    let id = 0;

                    let item = await player.genranditem(type, id);
                    constants.output("\nYou made it to the top of the lighthouse, the view from up here is astounding!");
                    constants.output("You stare at the ocean around you, so entranced you don't even notice the " + player.itemName(item.type, item.id) + " on the ground right next to you!");

                    player.insert(item.type, item.id);
                    await this.buffer('.');
                    done = true;
                    await this.next(player);
                    return
                } else {
                    constants.output("You ascend to floor #" + i + "...");
                    //The 5 options for what could happen on any given floor.
                    if (luck < 20) {
                        constants.output("This room is empty, long since abandoned by any living soul. Cockroaches scurry at your feet as you walk through the room, and you know there cant possibly be anything of value to you here.");
                        luck = constants.randomNumber(1, 100);
                    } else if (luck > 20 && luck < 40) {
                        luck = constants.randomNumber(1, 100);
                        let chance = constants.randomNumber(1, 99);
                        let book = 0;
                        constants.output("This room is almost empty, with the exception of an oddly pristine bookcase laid up against one of the walls of the room.")
                        constants.output("Every other surface in the room is filthy and rotten, but the bookcase looks almost untouched, freshly cleaned even.")
                        constants.output("Three books are ajar from the other, and something tells you you need to pull out one of those books, but you are not sure which.")
                        constants.output("Which book do you take? (1: Book #1 || 2:Book #2 || 3:Book #3)")
                        do {
                            book = parseInt(await constants.input(""));
                        } while (book != 1 && book != 2 && book != 3);
                        //Book chances
                        switch (book) {
                            case 1:
                                if (chance < 33) {
                                    let bat = constants.randomNumber(1, 3);
                                    player.batt = (player.batt + bat);
                                    constants.output("You pull the book from the shelf, and open it up. Inside you find that the pages have been carved out and someone has stashed " + bat + " batteries) inside!")
                                    constants.output("You now have " + player.batt + "batteries.")
                                    constants.output("You attempt to place the book back in the bookshelf, and to your suprise you notice the entire thing has vanished.")
                                }
                                else if (chance > 33 && chance < 66) {
                                    constants.output("You pull the book from the shelf, and open it up. It's an old horror novel, something about strange colors in a well and infected agriculture. You feel a sense of dread wash over you, something horrible is waiting for you here.")
                                    abom = 1;
                                }
                                else {
                                    constants.output("You pull the book from the shelf, and open it to find all the pages in the book empty, but at the very end of the book someone left a bandage. Only slightly used, so you decide to patch yourself up.(Hp +1)")
                                    player.hp = (player.hp + 1);
                                }
                                await this.buffer('.');
                                break;
                            case 2:
                                if (chance < 33) {
                                    let type = await player.randitem();
                                    let id = constants.randomNumber(1, 3);
                                    constants.output("You pull the book from it's shelf, and behind it you find a/an " + player.itemName(type, id) + "!")
                                    player.insert(type, id);
                                }
                                else if (chance > 33 && chance < 66) {
                                    constants.output("You pull the book from the shelf, and open it to find all the pages in the book empty, but at the very end of the book someone left a bandage. Only slightly used, so you decide to patch yourself up.(Hp +1)")
                                    player.hp = (player.hp + 1);
                                }
                                else {
                                    let dmg = constants.randomNumber(3, 5);
                                    constants.output("You pull the book from the shelf, but upon doing so the entire shelf collapses on top of you,and you fall unconcious. When you come to the bookshelf is no where to be found, but your body aches and you struggle to get up. (Hp -" + dmg + ")")
                                    player.hp = (player.hp - dmg);
                                }
                                await this.buffer('.');
                                break;
                            case 3:
                                if (chance < 33) {
                                    constants.output("You pull the book from the shelf, and open it up. It's an old horror novel, something about strange colors in a well and infected agriculture. You feel a sense of dread wash over you, something horrible is waiting for you here.")
                                    abom = 1;
                                }
                                else if (chance > 33 && chance < 66) {
                                    constants.output("You pull the book from the shelf, and open it up. The book appears the be a cooking book of some kind, but none of the recipies make any sense. Calling for things like, Pride in one self, and Zest for Life.")
                                }
                                else {
                                    let bat = constants.randomNumber(1, 3);
                                    player.batt = (player.batt + bat);
                                    constants.output("You pull the book from the shelf, and open it up. Inside you find that the pages have been carved out and someone has stashed " + bat + " batteries) inside!")
                                    constants.output("You now have " + player.batt + "batteries.")
                                    constants.output("You attempt to place the book back in the bookshelf, and to your suprise you notice the entire thing has vanished.")
                                }
                                await this.buffer('.');
                                break;
                            default:
                                console.error("ERROR: Book # non-existant, ending game!")
                                process.exit(1);
                                break;
                        };
                    }
                    else if (luck > 40 && luck < 60) {
                        luck = constants.randomNumber(1, 100);
                        if (abom) {
                            constants.output("An unearthly chill comes over you, unlike anything you have ever felt before. You feel eyes on you, but these eyes see more than any other, you know you have walked into your doom.")


                            constants.output("¥̷̹̩̟̘̩̠̥̞͔̫̫͆̉̒̀̊̽͌̏͒͘͝ð̴͇̥͇̖͍͓͎̩̥̂̈́̏̂̉̂̓̿̚͜͝µ̸̨̡͍͈̲̠̫͙̻̗̈́͌̈́̾̇͗̆̿̎̒̕ͅŕ̴̨̢̨̢̘̺͕̳̯̪̙͌́̇̀̍̉̋͗́͠ ̷̧̛͙͖͍̤̘̙̭̪̳͇̐̍̒̉̽́͌͂̔͝ļ̸̲̦̭̪̫͔̳̗̟͍͂̈̈́̃̎̒̌͒͠͠͠ị̸̡̧̢̥͍͍͈̤̲̦̈̈́̒̈́̒̎̄̑̍̓͠£̵̧͓̬̭̥̟͍͎̫̗̩̍́̾̃͑͛͆̋̀͝͝ê̸̢̧̛͓̬̮̗̼̗͙͚̄́̇̔̂̔̽̈́̐̕͜ ̵̛͓̘̲̺͙̼̗̥̘̱̍̄̀̔͋̉̄͝͠ͅï̶̡̝̱͈̬̞͎̼̘̯̟̏̊̃̽͆͐̆̀̈́̅͠§̷̡͍̤̻̼̖͎͈̦̻̟̃͑̀͒̊͐̎̀̊̚͠ ̸̳̫͈̖͙͎̲̖͂͊̈̎̀̄̈́̓͋̃̓͜ͅͅå̶̧̰͖̳͇̜̥̙̬̲͐̅͊̈́͐̇̉̈́̈́͘͘†̶̢͎͓̲̮͉̜͎̳͙̩̈́̉̑̾́̎͊̅͆̃͌ ̶̨̡͇̮͙̗͉̥͈̲̋̔́͗̌̿̉̄̍̕̚͜å̵̡̧͉̭̺̙̖̜̯͚̦̈̃̈́̑̿̄́̀̕͠ñ̶̞̙̯̙͙͈̗̲͓͈̻̒͋̋͛͆̋̊̊̿͝ ̸̰̹̙̖̥̼̲̜̼̲̠̊̔͂́̾͛͌̂̿̑͋ê̵̡̝͔͙͈̣̯̼̘̺͛̃̋͑̌̾͐̋̈͋́ͅñ̸̛̛͔͈̳̭͎̦̫̲̩̬̃̏̈́̅̎͂͑͝ͅÐ̸̧̛̪̠̬̹͖̞̱̱̹͕̥̯͇̳̄̀̾̅̈́͑̈́͑͗̄̉̚͘͝)")


                            player.secr = (player.secr * -1);
                            await this.buffer('.');
                            await this.battle(player, 999);
                        }
                        else {
                            constants.output("You cannot be sure what, but something is in this room, and its coming right at you!")
                            await this.buffer('.');
                            await this.battle(player, 0);
                        }
                    }
                    else if (luck > 60 && luck < 80) {
                        luck = constants.randomNumber(1, 100);
                        let type = await player.randitem();
                        let id = 0;
                        if (type == 'S') {
                            id = constants.randomNumber(1, 5);
                        }
                        else {
                            id = constants.randomNumber(1, 3);
                        }
                        constants.output("You enter the room, and it is largely in disrepair much like all the others. In the center of the room however there is a " + player.itemName(type, id) + " sitting on a nearly collapsed table.")
                        player.insert(type, id);
                    }
                    else {
                        luck = constants.randomNumber(1, 100);
                        let chance = constants.randomNumber(1, 100);
                        let d = 'm';
                        constants.output("You enter the room, and the first thing you notice is the smell. The entire lighthouse has a foul odor, but in this room its was inescapable. The stench was so overpowering you almost failed to notice a chest in the center of the room. There is something ominous about this chest, but you cant help but feel there might be something useful inside")
                        constants.output("Open the chest? (y:yes || n:no)")
                        do {
                            d = await constants.input("");
                        } while (d != 'y' && d != 'n');
                        if (d == 'y') {
                            if (chance > 70) {
                                let type = await player.randitem();
                                let id = 0;
                                if (type == 'S') {
                                    id = constants.randomNumber(1, 5);
                                }
                                else {
                                    id = constants.randomNumber(1, 3);
                                }
                                constants.output("You open up the chest, and inside you find a/an" + player.itemName(type, id) + "!")
                                player.insert(type, id);
                            }
                            else if (chance < 70 && chance > 40) {
                                constants.output("You open up the chest, and find nothing but cobwebs")
                            }
                            else {
                                constants.output("You open up the chest....")
                                await this.battle(player, 0);
                            }
                            await this.buffer('.');
                        }
                        else {
                            constants.output("You chose not to open it, this lighthouse is full of dangers and that chest could just have well been another trap.")
                        }
                    }
                }

                i++;
                if (i < floors - 1 && done == false && player.hp > 0) {
                    constants.output("Keep ascending the lighthouse? (y:yes || n:no)");
                    do {
                        choice = await constants.input("");
                    } while (choice != 'y' && choice != 'n');
                    if (choice == 'n') {
                        constants.output("You exit the lighthouse. You cannot afford to take any more risks.");
                        i = i + floors;
                        done = true;
                    }
                }
            } while (i <= floors && choice != 'n' && done != true && player.hp > 0);
        } else {
            constants.output("You decide against entering the lighthouse. There could have been something valuable in there, but the dangers within could prove fatal.");
            await this.next(player);
        }
        return;
    }

    async pirateship(player) {
        await asciiArt.ascipirateship();
        let x = 0;
        let buf = ' ';
        let out = false;
        let type = 'n';
        let id = 0;
        let roomluck = Array(5).fill(0).map(() => constants.randomNumber(1, 100));
        let room = "lowdeck";

        //Block of text
        constants.output("As you continue on your way, you find your path blocked by a crashed ship. The ship appears very old, it's made of wood and the planks have clearly been rotting off of it for some time now. Its sails have been tattered and bleached beyond recognition, so this leaves you with very little indication of whose ship this was, or what it was used for.");
        constants.output("All that is abundantly clear is this ship will not be sailing, and you will have to go through it's wreckage to continue on your journey.");
        buf = await constants.input("Enter Ship (Any key)");
        constants.output("\nYou enter the ship through a hole in it's lower deck, and you notice the ship is mostly rotten or destroyed. You can't seem to find an obvious way out, it seems you will have to search for one.");

        do {

            //Player is on the lower deck
            if (room == "lowdeck") {
                if (roomluck[0] == 0 && roomluck[1] == 0 && roomluck[2] == 0 && roomluck[3] == 0) {
                    constants.output("You notice something on the lower deck that you had not seen before, a way out!")
                    constants.output("Exit ship (Any key)")
                    out = 1;
                    room = "none";
                }
                else {
                    constants.output("The lower deck has been ravaged by the forces of decay; mold and barnacles own this ship now. ")
                    constants.output("Three rooms however, the ktchen, a bedroom,and the storage room, still appear to be accessible. You could also go upstairs to the upper deck. ")
                    constants.output("Where would you like to go? (kitchen || bedroom || storage_room ||upstairs)")
                    do {
                        room = await constants.input("");
                    } while (room != "kitchen" && room != "bedroom" && room != "upstairs" && room != "storage_room");
                }
            }
            //Player is on the upper deck
            else if (room == "updeck") {
                if (roomluck[0] == 0 && roomluck[1] == 0 && roomluck[2] == 0 && roomluck[3] == 0) {
                    constants.output("You notice something on the upper deck that you had not before, somehow there is a way out of this ship where before there was not.")
                    constants.output("Exit ship (Any key)")
                    out = 1;
                    room = "none";
                }
                else {
                    constants.output("The upper deck is collapsing into the lower deck; It does not seem safe to be up here")
                    constants.output("However you notice you could gain access to the captain's quarters from up here, or you could go back to the lower deck. ")
                    constants.output("Where would you like to go? (downstairs || captain's_quarters)")
                    do {
                        room = await constants.input("");
                    } while (room != "downstairs" && room != "captain's_quarters");
                }
            }
            //Player chose to go upstairs
            else if (room == "upstairs") {
                constants.output("You walk up the stairs to the upper deck the old rotten planks nearly breaking underneath your weight")
                room = "updeck";
                await this.buffer('.');
            }
            //Player chose to go downstairs
            else if (room == "downstairs") {
                constants.output("You walk back downstairs to the lower deck, the scent of must overpowering you as you descend")
                room = "lowdeck";
                await this.buffer('.');
            }
            //Bedroom  choice
            else if (room == "bedroom") {
                if (roomluck[0] == 0) {
                    constants.output("You already searched this room")
                }
                else if (roomluck[0] > 85) {
                    let item = await player.genranditem(type, id);
                    constants.output("In the " + room + " you found a/an " + player.itemName(item.type, item.id))
                    player.insert(item.type, item.id);
                    roomluck[0] = 0;
                }
                else if (roomluck[0] < 85 && roomluck[0] > 55) {
                    let batt = constants.randomNumber(1, 3);
                    constants.output("In the " + room + " you found " + batt + " batteries!")
                    player.batt = (player.batt + batt);
                    roomluck[0] = 0;
                }
                else if (roomluck[0] < 55 && roomluck[0] > 25 && out == 0) {
                    constants.output("In the " + room + " you found the way out of the ship!")
                    roomluck[0] = 0;
                    out = 1;
                }
                else {
                    constants.output("In the " + room + " you find nothing.")
                    roomluck[0] = 0;
                }
                room = "lowdeck";
                await this.buffer('.');
            }
            else if (room == "kitchen") {

                if (roomluck[1] == 0) {
                    constants.output("You already searched this room")
                    buf = await constants.input("Enter your choice: ");
                }
                else if (roomluck[1] > 75) {
                    let item = await player.genranditem(type, id);
                    constants.output("In the " + room + " you found a/an " + player.itemName(item.type, item.id))
                    player.insert(item.type, item.id);
                    roomluck[1] = 0;
                }
                else if (roomluck[1] < 75 && roomluck[1] > 45) {
                    let batt = constants.randomNumber(1, 3);
                    constants.output("In the " + room + " you found " + batt + " batteries!")
                    player.batt = (player.batt + batt);
                    roomluck[1] = 0;
                }
                else if (roomluck[1] < 45 && roomluck[1] > 15 && out == 0) {
                    constants.output("In the " + room + " you found the way out of the ship!")
                    roomluck[0] = 0;
                    out = 1;
                }
                else {
                    constants.output("In the " + room + " you find nothing.")
                    roomluck[1] = 0;
                }
                room = "lowdeck";
                await this.buffer('.');
            }
            else if (room == "storage_room") {

                if (roomluck[2] == 0) {
                    constants.output("You already searched this room")

                }
                else if (roomluck[2] > 85) {
                    let item = await player.genranditem(type, id);
                    constants.output("In the " + room + " you found a/an " + player.itemName(item.type, item.id))
                    player.insert(item.type, item.id);
                    roomluck[2] = 0;
                }
                else if (roomluck[2] < 85 && roomluck[2] > 55) {
                    await this.battle(player, 0);
                    roomluck[2] = 0;
                }
                else if (roomluck[2] < 55 && roomluck[2] > 25 && out == 0) {
                    constants.output("In the " + room + " you found the way out of the ship!")
                    roomluck[0] = 0;
                    out = 1;
                }
                else {
                    constants.output("In the " + room + " you find nothing.")
                    await this.buffer('.');
                    roomluck[2] = 0;
                }
                await this.buffer('.');
                room = "lowdeck";
            }
            else if (room == "captain's_quarters") {

                if (roomluck[3] == 0) {
                    constants.output("You already searched this room")
                    await this.buffer('.');
                }
                else if (roomluck[3] > 85) {
                    player.genranditem(type, id);
                    constants.output("In the " + room + " you found a/an " + player.itemName(type, id))
                    player.insert(item.type, item.id);
                    roomluck[3] = 0;
                }
                else if (roomluck[3] < 85 && roomluck[3] > 55) {
                    await this.battle(player, 0);
                    roomluck[3] = 0;
                }
                else if (roomluck[3] < 55 && roomluck[3] > 25 && out == 0) {
                    constants.output("In the " + room + " you found the way out of the ship!")
                    roomluck[3] = 0;
                    out = 1;
                }
                else {
                    constants.output("In the " + room + " you find nothing.")
                    roomluck[3] = 0;
                }
                await this.buffer('.');
                room = "updeck";
            }
            if (constants.DEBUG)
                constants.output("[Event]DEBUG:In pirate ship event: Loops so far " + x + " Room is " + room + ".")
            x++;
        } while (!out && player.hp > 0 && x < constants.MAX_LOOP);

        if (x >= constants.MAX_LOOP) {
            console.error("ERROR: In pirate ship function, MAX_LOOP has been reached. Killing program");
            process.exit(1);
        }

        await this.next(player);
        return;
    }

    /* Fishing event, player can choose to go the end of the dock and fish for either a bonus to Hp, an item, or an enemy encounter */
    async fishing(player) {
        let type = ' ';
        let id = 0;
        let luck = 0;
        let c;
        let buf;
        let d = 'y';
        constants.output("You find an abandoned dock on your journey. The dock has started rotting entirely; planks fallen into the sea.");
        constants.output("Strange enough however you notice at the end of the dock someone has left a fishing rod and bait");
        constants.output("Would you like to go fishing? (y:yes || n:no)");
        do {
            c = await constants.input("Enter your choice: ");
        } while (c != 'n' && c != 'y');
        //Player chose to fish
        if (c == 'y') {
            //Variables
            let i = 1;
            let bait = constants.randomNumber(3, 6);
            //Block of text to give info to player
            constants.output("You walk to the end to the dock; taking care to avoid stepping on any rotten planks and falling into the sea below.");
            constants.output("Whoever left the fishing pole here also left " + bait + " bait items, which means you can reel something in " + bait + " times.");
            await this.buffer('_')
            //buf = await constants.input("Enter your choice: ");
            do {
                luck = constants.randomNumber(1, 99);
                constants.output("You cast line #" + i + "...");
                await this.buffer('_')
                //Events that can occur during fishing, 1/3 chance for each event
                if (luck < 33) {
                    let HPup = constants.randomNumber(1, 4);
                    constants.output("You reel in the line, and at the end of it you find a hearty fish!");
                    constants.output("You take the time to cook and prepare the fish, and after eating it your Hp goes up by " + HPup + " points! (Hp +" + HPup + ")");
                    player.hp += HPup;
                }
                else if (luck > 33 && luck < 66) {
                    let item = await player.genranditem(type, id);
                    constants.output("You reel in the line, and at the end of it you find a/an " + player.itemName(item.type, item.id) + "!");
                    player.insert(item.type, item.id);
                }
                else {
                    constants.output("You reel in the line, and you find nothing at the end of it, but you sense something sneaking up behind you...");
                    await this.buffer('_')
                    await this.battle(player, 0);
                }
                //If you have bait remaining, this block will run
                i++;
                bait--;
                if (bait > 0 && player.hp > 0) {
                    constants.output("You have " + bait + " bait items left");
                    constants.output("Continue fishing? (y:yes || n:no)");
                    do {
                        d = await constants.input("Enter your choice: ");
                    } while (d != 'n' && d != 'y');
                    //If player decided to quit, this block will run.
                    if (d == 'n') {
                        constants.output("You decide to quit fishing, you reeled in the line " + i + " times already, and you don't want to risk it again.");
                    }
                }
                else {
                    constants.output("You have run out of bait");
                    await this.buffer('_')
                    d = 'n';
                }
            } while (d == 'y' && bait > 0 && player.hp > 0);

        }
        else {
            constants.output("You decide against fishing; the activity is more than time consuming and you need to catch up to the ship before it leaves.")

        }
        await this.next(player);
    }

    async mansion(player) {
        //Variables
        let enter = ' ';
        let x = 0;
        let type = 'n';
        let id = 0;
        let buf;
        let room = "hall";
        let searchluck = Array(20).fill(0).map(() => constants.randomNumber(1, 100));

        //Block of text and asci function to give info to player
        await asciiArt.ascimansion();
        constants.output("Along your journey you come across a massive mansion sitting on the shore. It appears abandoned, and parts of it have already begun to decay and fall into the sea below")
        constants.output("You walk up to the front door of the mansion, the eerieness of the place not eluding you for a second.")
        constants.output("The door is unlocked, would you like to enter (y:yes || n:no)")
        //Determines whether player will enter mansion or not
        do {
            enter = await constants.input("Enter your choice:");
        } while (enter != 'y' && enter != 'n');

        //Player chose to enter mansion
        if (enter == 'y') {
            do {
                //Create a random item
                let item = await player.genranditem(type, id);
                //If there has been no loop yet, this block will run.
                if (x == 0) {
                    constants.output("You enter the mansion, you find yourself in the great hall of the building. The smell is overwhelming, and the decay and rot is everywhere.")
                }
                //If player is on the first floor, this block will run.
                if (room == "hall") {
                    constants.output("From The Great Hall there are the entrances to the kitchen, and the dining room on your left; guest bedroom, and living room on your right; or you could go upstairs.")
                    constants.output("Where would you like to go? (kitchen || dining_room || guest_bedroom || living_room || upstairs || leave)")
                    do {
                        room = await constants.input("Enter your choice:");
                    } while (room != "kitchen" && room != "dining_room" && room != "guest_bedroom" && room != "living_room" && room != "upstairs" && room != "leave");
                }
                //If player is on the second floor, this block will run.
                else if (room == "floor2") {
                    constants.output("From upstairs there are entrances to the bathroom, and the study on your left; master bedroom, and bedroom on your right; or you could go back downstairs to The Great Hall.")
                    constants.output("Where would you like to go? (bathroom || study || master_bedroom || bedroom || downstairs || leave)")
                    do {
                        room = await constants.input("Enter your choice:");
                    } while (room != "bathroom" && room != "study" && room != "master_bedroom" && room != "bedroom" && room != "downstairs" && room != "leave");
                }
                //Downstairs condition.
                else if (room == "downstairs") {
                    constants.output("You head back down the stairs to The Great Hall, the ancient steps creaking under your weight")
                    room = "hall";
                }
                //Upstairs Conditon.
                else if (room == "upstairs") {
                    constants.output("You walk up the stairs of the mansion, noticing some wallpaper peeling off to reveal the mold growing underneath.")
                    room = "floor2";
                }
                //Leave condition.
                else if (room == "leave") {
                    constants.output("You decide to get out of this mansion. You havent felt safe for a single moment you've been inside, and whatever else you could have found is not worth your life")
                }
                //Kitchen condition
                else if (room == "kitchen") {
                    let search;
                    let y = 0;
                    do {
                        //Text block to prlet when player first enters room.
                        if (y == 0) {
                            constants.output("\nYou enter the kitchen; what was once clearly an amazing kitchen capable of producing fine dishes is now nothing but a putrid pile or rot.")
                        }
                        constants.output("It remains difficult to determine if you would find anything in here. Inside the kitchen there remains a fridge, a pantry, an oven, and a dishwasher.")
                        constants.output("Would you like to search something? (fridge || pantry || oven || dishwasher || leave)")
                        do {
                            search = await constants.input("Enter your choice:");
                        } while (search != "fridge" && search != "pantry" && search != "oven" && search != "dishwasher" && search != "leave");

                        if (constants.DEBUG)
                            constants.output("[Event]DEBG:Player is in kitchen, loops so far " + y + " search variable is " + search + ".")

                        //Player searches fridge
                        if (search == "fridge") {
                            if (searchluck[0] == 0) {
                                constants.output("You have already searched this.")
                            }
                            else if (searchluck[0] > 65) {
                                let item = await player.genranditem(type, id);
                                constants.output("You reach inside of the fridge and found a/an " + player.itemName(item.type, item.id) + "!")
                                player.insert(item.type, item.id)
                                searchluck[0] = 0;
                            }
                            else {
                                constants.output("You reach into the fridge, and found nothing but old rotten food.")
                                searchluck[0] = 0;
                            }
                            await this.buffer('.');
                        }
                        //Player searches pantry
                        else if (search == "pantry") {
                            if (searchluck[1] == 0) {
                                constants.output("You have already searched this.")
                            }
                            else if (searchluck[1] > 85) {
                                let item = await player.genranditem(type, id);
                                constants.output("You search inside the pantry and find a/an " + player.itemName(item.type, item.id) + "!")
                                player.insert(item.type, item.id)
                                searchluck[1] = 0;
                            }
                            else if (searchluck[1] < 85 && searchluck[1] > 55) {
                                let HPup = constants.randomNumber(1, 3);
                                constants.output("You search inside the pantry, and much to your suprise you find a pastry that is not rotten!")
                                constants.output("You eat the pastry and it gives you (Hp +" + HPup + ")")
                                player.hp = (player.hp + HPup);
                                searchluck[1] = 0;
                            }
                            else {
                                constants.output("You reach into the pantry, and found nothing but old rotten food")
                                searchluck[1] = 0;
                            }
                            await this.buffer('.');
                        }
                        //Player searches oven
                        else if (search == "oven") {
                            if (searchluck[2] == 0) {
                                constants.output("You have already searched this.")
                            }
                            else if (searchluck[2] > 75) {
                                let item = await player.genranditem(type, id);
                                constants.output("You open up the oven, and found a/an " + player.itemName(item.type, item.id) + "!")
                                player.insert(item.type, item.id)
                                searchluck[2] = 0;
                            }

                            else if (searchluck[2] < 75 && searchluck[2] > 40) {
                                let dmg = constants.randomNumber(1, 4);
                                constants.output("You grab the oven handle to open it up, but for some reason it is scorching hot.")
                                constants.output("You pull your hand away as fast you can, but it still managed to burn you (Hp -" + dmg + ")")
                                player.hp = (player.hp - dmg);
                                searchluck[2] = 0;
                            }
                            else {
                                constants.output("You open up the oven, and find nothing")
                                searchluck[2] = 0;
                            }
                            await this.buffer('.');
                        }
                        //Player searches dishwasher
                        else if (search == "dishwasher") {
                            if (searchluck[3] == 0) {
                                constants.output("You have already searched this.")
                                await this.buffer('.');

                            }
                            else if (searchluck[3] > 85) {
                                let item = await player.genranditem(type, id);
                                constants.output("You search inside the dishwasher and find a/an " + player.itemName(item.type, item.id) + "!")
                                player.insert(item.type, item.id)
                                searchluck[3] = 0;
                            }
                            else if (searchluck[1] < 85 && searchluck[1] > 55) {
                                let batt = constants.randomNumber(1, 3);
                                constants.output("You search inside of the dishwasher, and to your ruprise you find " + batt + "batteries!")
                                player.batt = (player.batt + batt);
                                searchluck[3] = 0;
                            }
                            else {
                                constants.output("You open up the dishwasher and find nothing but old broken plates.")
                                searchluck[3] = 0;
                            }
                            await this.buffer('.');
                        }
                        else if (search == "leave") {
                            constants.output("You exit the kitchen, and return to The Great Hall")
                            room = "hall";
                        }
                        //Variable to track "time" in kitchen
                        y++;
                    } while (search != "leave" && y < constants.MAX_LOOP);
                    if (y >= constants.MAX_LOOP) {
                        console.error("ERROR:In mansion function, Kitchen loop exceeded max alllowed loops. Killing program.")
                        process.exit(1);
                    }
                }
                //Dining room condition
                else if (room == "dining_room") {
                    //Player has already been in here
                    if (searchluck[4] == 0) {
                        constants.output("You've already searched this room")
                        room = "hall";
                    }
                    //Player gets battle
                    else if (searchluck[4] > 50) {
                        constants.output("As soon as you enter this room, you feel a sense of doom wash over you")
                        await this.buffer('_')
                        await this.battle(player, 0);
                        searchluck[4] = 0;
                        room = "hall";
                    }
                    //Player gets nothing
                    else {
                        constants.output("You walk into the dining room. It is just as decayed as the rest of the manor, furniture strewn about and rotting, and an overhwlming feeling of dread no matter where you look")
                        constants.output("There is clearly nothing for you here, so you decide to make your way back to The Great Hall")
                        searchluck[4] = 0;
                        room = "hall";
                    }
                    await this.buffer('_');
                }
                //Guest bedroom conditiion
                else if (room == "guest_bedroom") {
                    let search;
                    let y = 0;
                    do {
                        //Starting text block
                        if (y == 0) {
                            constants.output("\nThe guest bedroom is littered with clothing, both women's and men's. Every article of clothing is in tatters")
                            constants.output("The rest of the bedroom is falling apart, there are holes in the walls you can see the ocean through, and there is an overwhelming sense that the whole thing may just collapse in on itself at any moment")
                            constants.output("Inside of the bedroom there are some things more intact than others. A nightstand, a closet, and a dresser.")
                        }
                        constants.output("Would you like to search something? (nightstand || closet || dresser || leave)")
                        do {
                            search = await constants.input("Enter your choice:");
                        } while (search != "nightstand" && search != "closet" && search != "dresser" && search != "leave");

                        if (constants.DEBUG)
                            constants.output("[Event]DEBUG:Player is in guest bedroom, loops so far " + y + " search variable is " + search + ".")

                        //Player chose to search nightstand
                        if (search == "nightstand") {
                            //Player has already searched
                            if (searchluck[5] == 0) {
                                constants.output("You've already searched this")

                            }
                            //Player gets item
                            else if (searchluck[5] > 85) {
                                let item = await player.genranditem(type, id);
                                constants.output("You pull open the drawer on the nightstand, and inside of it you find a/an " + player.itemName(item.type, item.id) + "!")
                                player.insert(item.type, item.id);
                                searchluck[5] = 0;
                            }
                            //Player gets batteries
                            else if (searchluck[5] < 85 && searchluck[5] > 45) {
                                let batt = constants.randomNumber(1, 3);
                                constants.output("You open up the drawer on the nightstand, and inside ypu find " + batt + " batteries!")
                                player.batt = (player.batt + batt);
                                searchluck[5] = 0;
                            }
                            //Player gets nothing
                            else {
                                constants.output("You open up the drawer on the nightstand and found, nothing.")
                                searchluck[5] = 0;
                            }
                            await this.buffer('_');
                        }
                        //Player chose to search closet
                        else if (search == "closet") {
                            //Player has already searched closet
                            if (searchluck[6] == 0) {
                                constants.output("You've already searched this")
                            }
                            //Player gets item
                            else if (searchluck[6] > 75) {
                                let item = await player.genranditem(type, id);
                                constants.output("You walk into the closet, and inside of it you find a/an " + player.itemName(item.type, item.id) + "!")
                                player.insert(item.type, item.id);
                                searchluck[6] = 0;
                            }
                            //Player enters battle
                            else if (searchluck[6] < 75 && searchluck[6] > 45) {
                                constants.output("You open up the closet, and instantly you regret it.")
                                await this.buffer('_');
                                await this.battle(player, 0);
                                searchluck[6] = 0;
                            }
                            //Player gets nothing
                            else {
                                constants.output("You walk into the closet, and inside you find nothing.")
                                searchluck[6] = 0;
                            }
                            await this.buffer('_');
                        }
                        //Player searches dresser
                        else if (search == "dresser") {
                            //Player has already searched dresser
                            if (searchluck[7] == 0) {
                                constants.output("You've already searched this")

                            }
                            //Player gets +Hp
                            else if (searchluck[7] > 75) {
                                let HPup = constants.randomNumber(1, 3);
                                constants.output("You open up the dresser, and inside of it you find a partially used bandage (Hp +" + HPup + ")")
                                player.hp = (player.hp + HPup);
                                searchluck[7] = 0;
                            }
                            //Player gets nothing
                            else {
                                constants.output("You open up the dresser, and inside you find nothing.")
                                searchluck[7] = 0;
                            }
                            await this.buffer('_');
                        }
                        //Leave condition
                        else if (search == "leave") {
                            constants.output("You exit the guest bedroom, and return to The Great Hall")
                            room = "hall";
                        }
                        //Variable to track "time" in kitchen
                        y++;
                    } while (search != "leave" && y < constants.MAX_LOOP);
                    if (y >= constants.MAX_LOOP) {
                        console.error("ERROR:In mansion function, Kitchen loop exceeded max alllowed loops. Killing program.")
                        process.exit(1);
                    }
                }
                //Living room condition
                else if (room == "living_room") {
                    //Player has already searched
                    if (searchluck[8] == 0) {
                        constants.output("You've already searched this room")
                        room = "hall";
                    }
                    //Player gets battle
                    else if (searchluck[8] > 65) {
                        constants.output("Upon entering the living room, you begin to fear death.")
                        await this.buffer('_');
                        await this.battle(player, 0);
                        searchluck[8] = 0;
                        room = "hall";
                    }
                    //Player gets item
                    else if (searchluck[8] < 65 && searchluck[8] > 35) {
                        let item = await player.genranditem(type, id);
                        constants.output("You enter the living room, it's entirely rotten and disgusting like everything else, but out of the corner of your eye you see something glistening")
                        constants.output("Its a/an " + player.itemName(item.type, item.id) + "!")
                        player.insert(item.type, item.id);
                        searchluck[8] = 0;
                        room = "hall";
                    }
                    //Player gets nothing
                    else {
                        constants.output("The living room is just as disgusting as the rest of the house, nobody is or could be able live in this room")
                        constants.output("There is clearly nothing for you here, so you decide to make your way back to The Great Hall")
                        searchluck[8] = 0;
                        room = "hall";
                    }
                    await this.buffer('_');
                }

                //Upstairs conditions

                //Master bedroom contion
                else if (room == "master_bedroom") {
                    let search;
                    let buf;
                    let y = 0;
                    constants.output("You enter the master bedroom, what was once a very luxurious space for the owner of the mansion, was now so far gone it was impossible to imagine anyone living here")
                    constants.output("Despite all of this rot, there are a few areas of the room that catch your eye. Those being the bed, the closet, the dresser, the wardrobe, and the desk.")
                    do {
                        constants.output("What would you like to search? (bed || closet || dresser || wardrobe || desk || leave)")
                        do {
                            search = await constants.input("Enter your choice:");
                        } while (search != "bed" && search != "closet" && search != "dresser" && search != "wardrobe" && search != "desk" && search != "leave");
                        //Player chose to search bed
                        if (search == "bed") {
                            //Player has already searched
                            if (searchluck[14] == 0) {
                                constants.output("You already searched this")

                            }
                            //Player gets item
                            else if (searchluck[14] > 75) {
                                let item = await player.genranditem(type, id);
                                constants.output("You search the bed, it is largely molding and you're sure it would be disgustingly squishy if you tried to lay on it; despite all of this under the sheets you find a/an" + player.itemName(item.type, item.id) + "!")
                                player.insert(item.type, item.id);
                                searchluck[14] = 0;
                            }
                            //Player gets batteries
                            else if (searchluck[14] < 75 && searchluck[14] > 35) {
                                let batt = constants.randomNumber(1, 3);
                                constants.output("As you pull back the sheets on the bed you find many indescribably horrible things, however you also manage to find " + batt + " batteries!")
                                player.batt = (player.batt + batt);
                                searchluck[14] = 0;
                            }
                            //Player gets nothing
                            else {
                                constants.output("You found nothing")
                                await this.buffer('.');
                                searchluck[14] = 0;
                            }
                            await this.buffer('_');
                        }
                        //Player chose to search closet
                        else if (search == "closet") {
                            //Player has already searched
                            if (searchluck[15] == 0) {
                                constants.output("You already searched this")

                            }
                            //Player gets item
                            else if (searchluck[15] > 65) {
                                let item = await player.genranditem(type, id);
                                constants.output("You swing open the door to the closet, and inside you find a/an" + player.itemName(item.type, item.id) + "!")
                                player.insert(item.type, item.id);
                                searchluck[15] = 0;
                            }
                            //Player gets battle
                            else if (searchluck[15] < 65 && searchluck[14] > 25) {
                                constants.output("You open the closet door, and before you even have time to react something jumps out at you!")
                                await this.buffer('_');
                                await this.battle(player, 0);
                                searchluck[15] = 0;
                            }
                            //Player gets nothing
                            else {
                                constants.output("You found nothing")
                                await this.buffer('.');
                                searchluck[15] = 0;
                            }
                            await this.buffer('_');
                        }
                        //Player chose to search dresser
                        else if (search == "dresser") {
                            //Player has already searched
                            if (searchluck[16] == 0) {
                                constants.output("You already searched this")
                            }
                            //Player gets item
                            else if (searchluck[16] > 85) {
                                let item = await player.genranditem(type, id);
                                constants.output("You start opening drawers on the dresser, most of them are empty, or just full of useless thing. However in the last drawer you find a/an " + player.itemName(item.type, item.id) + "!")
                                player.insert(item.type, item.id);
                                searchluck[16] = 0;
                            }
                            //Player gets hp
                            else if (searchluck[16] < 85 && searchluck[16] > 55) {
                                let HPup = constants.randomNumber(1, 3);
                                constants.output("You start opening drawers in the dresser, not many items are of use to you, but you do manage to find a mostly used bandage! (Hp +" + HPup + ").")
                                player.hp = (player.hp + HPup);
                                searchluck[16] = 0;
                            }
                            //Player gets nothing
                            else {
                                constants.output("You found nothing")
                                searchluck[16] = 0;
                            }
                            await this.buffer('_');
                        }
                        //Player chose to search wardrobe
                        else if (search == "wardrobe") {
                            //Player has already searched
                            if (searchluck[17] == 0) {
                                constants.output("You already searched this")

                            }
                            //Player gets item
                            else if (searchluck[17] > 85) {
                                let item = await player.genranditem(type, id);
                                constants.output("You search the wardrobe, at first it seems empty and then you find a/an " + player.itemName(item.type, item.id) + "!")
                                player.insert(item.type, item.id);
                                searchluck[17] = 0;
                            }
                            //Player gets nothing
                            else {
                                constants.output("You found nothing")
                                searchluck[17] = 0;
                            }
                            await this.buffer('_');
                        }
                        //Player chose to search desk
                        else if (search == "desk") {
                            //Player has already searched
                            if (searchluck[18] == 0) {
                                constants.output("You already searched this")

                            }
                            //Player gets item
                            else if (searchluck[18] > 85) {
                                let item = await player.genranditem(type, id);
                                constants.output("You search the desk, and you find a/an" + player.itemName(item.type, item.id) + "!")
                                player.insert(item.type, item.id);
                                searchluck[18] = 0;
                            }
                            //Player gets batteries
                            else if (searchluck[18] < 85 && searchluck[18] > 55) {
                                let batt = constants.randomNumber(1, 3);
                                constants.output("You search the desk, and find " + batt + " batteries! ")
                                player.batt = (player.batt + batt);
                                searchluck[18] = 0;
                            }
                            //Player gets hp
                            else if (searchluck[18] < 55 && searchluck[18] > 25) {
                                let HPup = constants.randomNumber(1, 3);
                                constants.output("You start opening drawers in the desk, not many items are of use to you, but you do manage to find a mostly used bandage! (Hp +" + HPup + ").")
                                player.hp = (player.hp + HPup);
                                searchluck[18] = 0;
                            }
                            //Player gets nothing
                            else {
                                constants.output("You found nothing")
                                searchluck[18] = 0;
                            }
                            await this.buffer('_');
                        }
                        //Player chose to leave
                        else if (search == "leave") {
                            constants.output("You exit the master bedroom, and return to the upstairs hall")
                            room = "floor2";
                        }
                        y++;

                    } while (search != "leave" && player.hp > 0 && y < constants.MAX_LOOP);
                }

                //Bathroom condition
                else if (room == "bathroom") {
                    //Player has already searched
                    if (searchluck[13] == 0) {
                        constants.output("You've already searched this room")

                        room = "floor2";
                    }
                    //Player gets battle
                    else if (searchluck[13] > 75) {
                        constants.output("You enter the bathroom, and you know you are not alone.")
                        await this.buffer('_');

                        await this.battle(player, 0);
                        searchluck[13] = 0;
                        room = "floor2";
                    }
                    //Player gets item
                    else if (searchluck[13] < 75 && searchluck[13] > 45) {
                        let item = await player.genranditem(type, id);
                        constants.output("The bathroom is horrid, but you're eyes land on something not sp horrid in the bathtub")
                        constants.output("Its a/an " + player.itemName(item.type, item.id) + "!")

                        player.insert(item.type, item.id);
                        searchluck[13] = 0;
                        room = "floor2";
                    }
                    //Player gets nothing
                    else {
                        constants.output("The bathroom is covered in black mold, and rot. The smell is unberable and the stains on the walls are unthinkable")
                        constants.output("There is clearly nothing for you here, so you decide to make your way back to the upstairs hall")
                        searchluck[13] = 0;
                        room = "floor2";
                    }
                    await this.buffer('.');

                }

                //Bedroom condtion
                else if (room == "bedroom") {
                    //Player has already searched
                    if (searchluck[12] == 0) {
                        constants.output("You've already searched this room")
                        room = "floor2";
                    }
                    //Player gets battle
                    else if (searchluck[12] > 55) {
                        constants.output("You enter the bedroom, and you know you are not alone.")
                        await this.buffer('_');

                        await this.battle(player, 0);
                        searchluck[12] = 0;
                        room = "floor2";
                    }
                    //Player gets item
                    else if (searchluck[12] < 55 && searchluck[12] > 25) {
                        let item = await player.genranditem(type, id);
                        constants.output("The bedroom is so bland you hardly even notice it, as your attention is drawn away from the room and towards the shiny thing on the bed.")
                        constants.output("Its a/an " + player.itemName(item.type, item.id) + "!")
                        player.insert(item.type, item.id);
                        searchluck[12] = 0;
                        room = "floor2";
                    }
                    //Player gets nothing
                    else {
                        constants.output("The bedroom is dillipidated, molding, and somehow has a worse smell than any other room in the house")
                        constants.output("There is clearly nothing for you here, so you decide to make your way back to the upstairs hall")
                        await this.buffer('.');

                        searchluck[12] = 0;
                        room = "floor2";
                    }
                    await this.buffer('.');

                }
                //Study condition
                else if (room == "study") {
                    let search;
                    let y = 0;
                    constants.output("You enter the study, and it is miraculously well kept. The walls are still rotten like the rest of the house, but it seems as though the furniture inside of the room has been made immune to the ravages of entropy.")
                    //Player has mysterious key
                    if (player.doesHave('S', -1)) {
                        let open = 'm';
                        constants.output("You are drawn to a door in the room you did not see at first. It appears ancient in origin, and covered in writing in a language you do not understand.")
                        constants.output("The key you found earlier is getting lighter somehow; almost as if the door is pulling it out of your pocket.")
                        constants.output("You arent sure how you know, but you're certain this door can be opened with the Mysterious Key")
                        constants.output("Open the door? (y:yes||n:no)")
                        do {
                            open = await constants.input("");
                        } while (open != 'y' && open != 'n');
                        //Player has chosen to fight Kali
                        if (open == 'y') {
                            constants.output("You take the key out of your pocket and bring it to the lock. You insert the key into the lock and turn it")
                            constants.output("Upon turning the lock, the room fills with thousands of screams, the writing on the door begins to glow, and in your mind all you can see is the cosmos itself gasping it's last breath before being snuffed out by whatever is in that room")
                            constants.output("(C̶͕̥̗̿̽̈́̾͊̌͒̈́͋ͅǫ̵̼̺̟̣͉̫̖̇͂̈́͂̀͝ņ̶̖͚̮͍͕̭̼͉͂̓̐̑́̽͋̇̚ẗ̴̯̙̤̥́̀̓i̸̮̘̿n̶̪̥̓̒̒̑͋̄̋̃̉̕ű̴̢̲̜̟̻̤͙̓ḙ̸͉̮̣̟̥̐͊͘.̶̙̺̣̌̾̽͊͝.̶̧̤̲͖̗̞͚̤͖̲͐̈́̎͐͌̀͝.̷̳͔̦͇̜̜̰͚͔̿́ͅ.̴̢̻̳͈͊(̷̡̘̼͙̹̯̟̰̻̔̋͐͑A̴̧̡͉͕͈̖̻̜̒͋n̵̰̫͌̅͋̈͗͑̒͠ỳ̷̫͍̬͎̼̝̞͚́ͅ ̸̻͕̳͓͔̫̒ͅḵ̶́̇è̵͙̜̺̺͖̄̌̾͌̀͝y̸̜̟̪̱͇̬̼͎̅̄́̈́)̴̥̯͇̳͑͗̄̉)")

                            player.secr = (player.secr * 2);
                            await this.buffer('.');
                            await this.battle(player, 13);
                        }
                        //Player avoided kali at all kallosts
                        else {
                            constants.output("You decide against opening the door, anything could be beyond that and you dont have a good feeling about it.")
                        }
                    }
                    constants.output("Inside this room you find your attenton drawn to a few key things.Those being The desk, the bookshelf, and the cabinet")
                    do {
                        constants.output("What would you like to search? (desk || bookshelf || cabinet || leave)")
                        do {
                            search = await constants.input("Enter your choice:");
                        } while (search != "desk" && search != "bookshelf" && search != "cabinet" && search != "leave");
                        if (search == "desk") {
                            //Player already searched this
                            if (searchluck[9] == 0) {
                                constants.output("You've already searched this")

                            }
                            //Player gets an item
                            else if (searchluck[9] > 75) {
                                let item = await player.genranditem(type, id);
                                constants.output("You rifle through the drawers in the desk, until you find a/an " + player.itemName(item.type, item.id) + "!")
                                player.insert(item.type, item.id);
                                searchluck[9] = 0;
                            }
                            //Player gets nothing
                            else {
                                constants.output("You found nothing")
                                searchluck[9] = 0;
                            }
                            await this.buffer('.');
                        }
                        else if (search == "bookshelf") {
                            if (searchluck[10] == 0) {
                                constants.output("You've already searched this")
                                await this.buffer('.');

                            }
                            //Player gets an item
                            else if (searchluck[10] > 65) {
                                let item = await player.genranditem(type, id);
                                constants.output("You search every row of the bookshelf, until you find a/an " + player.itemName(item.type, item.id) + "!")
                                player.insert(item.type, item.id);
                                searchluck[10] = 0;
                            }
                            //Player gets damaged
                            else if (searchluck[10] < 65 && searchluck[10] > 25) {
                                let dmg = constants.randomNumber(1, 4);
                                constants.output("You search every inch of the bookshelf, but it was not as sturdy as you thought it was, and the whole bookshelf collapses on top of you. (Hp -" + dmg + ")")
                                player.hp = (player.hp - dmg);
                                searchluck[10] = 0;
                            }
                            //Player gets nothing
                            else {
                                constants.output("You found nothing")
                                searchluck[10] = 0;
                            }
                            await this.buffer('.');
                        }
                        else if (search == "cabinet") {
                            //Player has already searched this
                            if (searchluck[11] == 0) {
                                constants.output("You've already searched this")
                            }
                            //Player gets an item
                            else if (searchluck[11] > 85) {
                                let item = await player.genranditem(type, id);
                                constants.output("You search every inch of the cabinet, until you find a/an " + player.itemName(item.type, item.id) + "!")
                                player.insert(item.type, item.id);
                                searchluck[11] = 0;
                            }
                            else if (searchluck[11] < 85 && searchluck[11] > 55) {
                                let batt = constants.randomNumber(1, 3);
                                constants.output("You search every inch of the cabinet and manage to find " + batt + " batteries!")
                                player.batt = (player.batt + batt);
                                searchluck[11] = 0;
                            }
                            //Player gets nothing
                            else {
                                constants.output("You found nothing")
                                searchluck[11] = 0;
                            }
                            await this.buffer('.');
                        }
                        else if (search == "leave") {
                            constants.output("You decide to leave the study, and return to the upstairs hall")
                            room = "floor2";
                        }
                        y++;
                    } while (search != "leave" && y < constants.MAX_LOOP);
                    if (y >= constants.MAX_LOOP) {
                        console.error("ERROR: In study condition, constants.MAX_LOOP has been reached. Killing program.")
                        process.exit(1);
                    }
                    await this.buffer('.');

                }

                if (constants.DEBUG)
                    constants.output("[Event]DEBUG:In mansion function, loops so far: " + x + " room is " + room + ".")
                //x keeps track of # of loops.
                x++;
            } while (room != "leave" && player.hp > 0 && x < constants.MAX_LOOP);

            //if x exceedes a given maximum, end the program; Prevents infinite loops.
            if (x >= constants.MAX_LOOP) {
                console.error("ERROR: Mansion function exceeded maximum loop allowance, killing program")
                process.exit(1);
            }
        }

        //Player chose not to enter mansion
        else {
            constants.output("For a moment you hesitate, and then come to your senses. You need to be getting to the ship, the last thing you need is to waste your time with creepy mansions.")
        }

        await this.buffer('.');


        //Move to next playerext in list
        await this.next(player);
        return;
    }

    async end(player) {
        // player.insert('H', 3);
        // player.insert('O', 3);
        // player.insert('D', 3);

        await asciiArt.ascicruise()
        constants.output("You've finally made it, the cruise ship is within a kilometer of you! You run towards the dock, screaming and flailing about hoping to get someone's attention.");
        constants.output("Then suddenly, the sky blackens, a thick fog rolls in, and you are filled with an immense dread. From the ground in front of you erupts a terrible nightmare, lying in wait for you.");

        constants.output("¥̸̡̛̛͈̩̥̦̲̲̞͇͍͌̅̏͛̿͐̀̍͠ͅð̵̢̯̞͇̠͙͍̟̞̹͐͋̐̿͌̊̚̕͜͝͝µ̸̡̩͈̘͈̝̭̬̘͕̽͂̔̉̉̅̔̈́̉̋͜ ̸̢̢̯̲͔̬͕̖̪̭̟̅̾̓̇̀͆̓͒̎͊̕§̴̧̧͖͚̣̳͕̗̳̻͐͂̏̉̈́̄͒́̉̚͠ͅh̸̡̠̞̝̮͙̤̜̤̪̲̃͒͂̀͊̍̇̉̔̑͘å̵̛̮̻̯̥̼̯̗͖̪̤̲̊̽̓͛̾̃̽̔̿̿l̵͙͍̬̠͚̪̬̪̦̬̬̏̂́͆͗̓̓̔́̋l̵̤͕͈̪̖̘̲̻͇̼̻̓̏̌̒̓̔̽͂̆̈́̕ ̷͈̜̙̙̙͙̗̪̗̰͗͗̄̂̒̓̆̄́͠͝g̴̢̢̱̠͔̯̰̜̪̟͕̿͗͊̽̍̈́͂̓̓͘͘ð̶̧̥̞͙̘̯̗̳̙̹̪̉̃̅̐́͂̽̿̈̌͘ ̷͔̠̗̗̘͇͓͔̹͐͛́͆̃̓̅͊͜͜͝͝͝ñ̵̨̺͉̩̲͈̝͔̰̹̹̋̌̆̃͌̆͑̑̅̚͝ð̶̧̭̹͓̥̤̺͖̭̦́̃͑̃̌̈́̀̃͂͑͜͝ ̷̧̨̲̮̞̝̥͔͇̘͗́̈́̉̂͊̊́̇̍̕͜£̶̨̛̬̫̲̟̙̹͈͎̗̬͛́̅̓̇́͆̈́̀̐µ̴̡̛͈̗̫̖̳̬̭̟̊̽̾͑̏̆͗̕̚͝ͅͅr̸̡̟͖̼̫̭̱̠̳̮̃̔́͒̅͋̃̌̒͗͝†̶̛̯͕͕̹̦̠̘̥͈̻̞̈́͊͗̈́͋͑͋͌̕͝h̴̢̛̗͇̲̹̫̗̞̣̣͉̋͗̐͆̋̀̒̐͝ê̸̡̫̠͙͉̳̫͖͒̉̃̀̀͋̽̌̇͜͝͝ͅͅr̸̛̘̙͉̹̣̰̳̣̖͎̒̊̈̈́͑̃̈́̊͊͝ͅ")

        constants.output('_');
        await this.buffer('.')
        await this.battle(player, 20);
        if (player.hp > 0) {
            constants.output("As the beast falls, the sky clears around you; it took everything you had, but at long last you may be rid of this nightmare...");
            await this.buffer('.')
        }
        return;
    }


    //#####################
    //EVENT ORCHESTRATORS
    //######################

    async unevent(player) {
        if (constants.DEBUG)
            constants.output("\n[Event]DEBUG: Entered Unevent function.");

        let chance = constants.randomNumber(1, 50);
        if (player.hp > 6) {
            if (chance < 25) {
                constants.output(`You continue towards the ship, you judge it must be ${player.dist - player.delta} kilometers away now. You feel confident about making it to the ship. You take some time to check you pockets.`);
            } else {
                constants.output(`As you continue your trek towards the ship, you feel hopeful. You've already travelled  ${player.delta}  kilometers, and you know you can keep going`);
            }
        } else {
            if (chance < 25) {
                constants.output(`Your body aches, your journey thus far has not been an easy one, and you still have  ${player.dist - player.delta} kilometers to go. Your Hp has fallen to ${player.hp}, and you have ${player.batt} batteries for your flashlight left. You hope to muster the strength to continue onwards.`);
            } else {
                constants.output(`You walk along the path, slower now as the obstacles have taken a toll on you. You've walked ${player.delta} kilometers already, and felt every single one. Your health has fallen to ${player.hp}, and you have ${player.batt} batteries remaining. You hope to find something that can lift some of this burden.`);
            }
        }
        if (constants.DEBUG)
            constants.output("\n[Event]DEBUG: Health items: " + player.typePresent('H') + ".");
        if (constants.DEBUG)
            constants.output("\n[Event]DEBUG: Special items: " + player.typePresent('S') + ".");
        await this.next(player);
    }

    async eventable(player) {
        let luck = Math.floor(Math.random() * 99) + 1;
        if (constants.DEBUG)
            constants.output("[Event]DEBUG: Called eventable for event Number:" + this._evt);

        //If the player is detected as "dead", return -1 to main.
        if (player.hp <= 0) {
            if (constants.DEBUG)
                constants.output("[Event]DEBUG: Eventable detected player hp has fallen to or below 0; informing main");
            return -1;
        }

        //Switch statement to reroute player to events based on ID
        switch (this._evt) {
            case -2:
                await this.end(player);
                if (player.hp > 0) {
                    return 1;
                } else {
                    return -1;
                }
            case -1:
                await this.start(player);
                break;
            case 1:
                await this.unevent(player);
                break;
            case 2:
                await this.cave(player);
                break;
            case 3:
                await this.whalebones(player);
                break;
            case 5:
                await this.sharkordolphin(player);
                break;
            case 6:
                await this.outcrop(player);
                break;
            case 7:
                await this.oldman(player);
                break;
            case 9:
                await this.tree(player);
                break;
            case 11:
                await this.shop(player);
                break;
            case 12:
                if (luck > 66) {
                    await this.cave(player);
                } else if (luck < 66 && luck > 33) {
                    await this.whalebones(player);
                } else {
                    await this.outcrop(player);
                }
                break;
            case 13:
                await this.lighthouse(player);
                break;
            case 14:
                if (luck > 66) {
                    await this.pirateship(player);
                } else if (luck < 66 && luck > 33) {
                    await this.tree(player);
                } else {
                    await this.oldman(player);
                }
                break;
            case 15:
                await this.fishing(player);
                break;
            case 17:
                await this.pirateship(player);
                break;
            case 19:
                await this.mansion(player);
                break;
            case 20:
                if (luck > 66) {
                    await this.mansion(player);
                } else if (luck < 66 && luck > 33) {
                    await this.lighthouse(player);
                } else {
                    await this.shop(player);
                }
                break;
            default:
                await this.fog(player);
                break;
        }
        //Default return value if nothing is amiss.
        return 0;
    }

}

class Path {
    constructor() {
        this.events = [];
    }

    addEvent(name, hp, dmg) {
        const newEvent = new Event(dist, evt, weath);
        this.events.push(newEvent);
    }

    buildPath(player) {
        let dest = 0;
        let weath = 1;
        let avgweath = constants.randomNumber(3, 5);
        let avg = constants.randomNumber(1, 3);
        let end = player.dist;

        if (constants.DEBUG)
            constants.output(`[Event]DEBUG: Building Path; avg val:${avg}`);

        // Adds first playerect to the list with event value for start()
        this.events.push(new Event(end, -1, weath));

        dest = 1;

        while (dest < player.dist) {
            if (avgweath === 0) {
                if (dest > player.dist / 2) {
                    weath = constants.randomNumber(1, 2);
                } else {
                    weath = constants.randomNumber(1, 3);
                }
                avgweath = constants.randomNumber(3, 5);
            }

            if (avg === 0) {
                if (constants.DEBUG)
                    constants.output(`[Event]DEBUG: Adding Node WITH an event. Distance is:${dest}`);

                if (dest > player.dist / 2) {
                    this.events.push(new Event(dest, constants.randomNumber(2, 20), weath));
                } else {
                    this.events.push(new Event(dest, constants.randomNumber(2, 10), weath));
                }

                avg = constants.randomNumber(1, 3);
            } else {
                if (constants.DEBUG)
                    constants.output(`[Event]DEBUG: Adding node, Distance is:${dest}`);
                this.events.push(new Event(dest, 1, weath));

            }

            dest += 1;
            avg -= 1;
            avgweath -= 1;
        }

        // After the while loop, add the last event with an evt value of -2
        this.events.push(new Event(player.dist, -2, weath));


        if (constants.DEBUG)
            constants.output(`[Event]DEBUG: Path built:${this.events[this.events.length - 1].dist}`);
    }

    print() {
        constants.output("==========================");
        constants.output("       Printing path      ");
        constants.output("==========================");
        if (this.events.length === 0) {
            console.error("ERROR: List is empty");
        } else {
            this.events.forEach(event => {
                constants.output(`Distance: ${event.dist} Event: ${event.evt} Weather: ${event.weath}`);
            });
        }
        constants.output("==========================");
        constants.output("        Path Printed      ");
        constants.output("==========================");
    }


    isEmpty() {
        if (this.events.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    get events() {
        return this._events;
    }

    set events(x) {
        this._events = x;
    }

}

if (eenv === 'node') {
    // module.exports = { Event, Path };
    exports.Event = Event;
    exports.Path = Path;
}
else if (eenv === 'browser') {
    window.Event = Event;
    window.Path = Path;
}