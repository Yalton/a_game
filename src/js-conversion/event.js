const asciiArt = require('./ascii.js');
const player = require('./player.js');
const Constants = require('./constants.js');

const constants = new Constants();

// const prompt = require('prompt-sync')({ siglet: true });
// const readlineSync = require('readline-sync');


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

    asyncobj.randitem() {
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

    async itemEffect(type, x, obj) {
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
                        asciiArt.asciknife();
                        constants.output("You take out the knife, your base damage is now 2");
                        obj.dmg = 2;
                        break;
                    case 2:
                        asciiArt.ascisword();
                        constants.output("You equip the sword, your base damage is now 3");
                        obj.dmg = 3;
                        break;
                    case 3:
                        asciiArt.ascigun();
                        constants.output("You pull out the gun, your base damage is now 5");
                        obj.dmg = 5;
                        break;
                }
                break;
            case 'D':
                switch (x) {
                    case 1:
                        asciiArt.ascileather();
                        constants.output("You put on the leather shirt, and feel slightly protected (+10% Defence)");
                        obj.dfc = .9;
                        break;
                    case 2:
                        asciiArt.ascichainmail();
                        constants.output("You put on the chain mail, and feel much more protected. (+40% Defence)");
                        obj.dfc = .6;
                        break;
                    case 3:
                        asciiArt.asciknight();
                        constants.output("Taking your time to put on the knight armor piece by piece, and with each part of the whole you feel more and more untouchable. (80% Defense).");
                        obj.dfc = .2;
                        break;
                }
                break;
            case 'H':
                switch (x) {
                    case 1:
                        asciiArt.ascibandage();
                        constants.output(`You use the bandage on your wounds, and feel slightly better. (+${hpup}hp)`);
                        obj.hp = (obj.hp + hpup);
                        obj.remove('H', 1);
                        break;
                    case 2:
                        asciiArt.ascimedkit();
                        constants.output("The medkit has a plethora of healing items for you to choose from. Almost every wound you had can be mended now. (+5hp).");
                        obj.remove('H', 2);
                        obj.hp = (obj.hp) + 5;
                        break;
                    case 3:
                        asciiArt.ascistem();
                        constants.output("The Stem Cells ooze over your body, filling in your wounds and making you healthier than ever before. (hp x 2)");
                        obj.remove('H', 3);
                        obj.hp = obj.hp * 2;
                        break;
                }
                break;
            case 'S':
                switch (x) {
                    case 1:
                        asciiArt.ascibatterybox();
                        obj.batt = (obj.batt + batt);
                        constants.output(`You open up the Battery Box, and see it contains ${batt} batteries! Your total number of batteries is now ${obj.batt}.`);
                        obj.remove('S', 1);
                        break;

                    case 2:
                        constants.output("You open the mystery box, and inside of it ");
                        this.getItem(obj);
                        obj.remove('S', 2);
                        break;
                    case 3:
                        asciiArt.asciwormholebox();
                        this.wormhole(dist, obj);
                        constants.output(`You hesitate at first, and then open the Wormhole box. Instantly the box pulls you into itself, you think you will be crushed inside, however instead of hitting the bottom of the box, you came out of another box ${dist} kilometers closer to the ship!`);
                        obj.remove('S', 3);
                        break;
                    case 4:
                        asciiArt.ascibattlebox();
                        constants.output("You pry open the battle box, and within it you sense a sinister entity. The entity became aware of you, and clawed its way out of the box");
                        await this.battle(obj, enem);
                        obj.remove('S', 4);
                        break;
                    case 5:
                        let chance = constants.randomNumber(1, 50);
                        let newPath = 0;
                        switch (obj.path) {
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
                        obj.path = newPath;
                        obj.remove('S', 5);
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

    async useItem(type, obj) {
        if (constants.DEBUG) {
            constants.output(`[Event]DEBUG: Entering useitem function. Type: ${type}.`);
        }

        let num = type === 'S' ? 5 : 3;
        let itemNum = Array(6).fill(0);

        for (let i = 1; i <= num; i++) {
            if (obj.doesHave(type, i)) {
                itemNum[i] = obj.giveNum(type, i);
            }
        }

        for (let i = 1; i <= num; i++) {
            if (obj.doesHave(type, i)) {
                constants.output(`You have ${itemNum[i]} : ${obj.itemName(type, i)}.`);
            }
        }

        let choice;
        do {
            constants.output("Which item would you like to use?");
            for (let i = 1; i <= num; i++) {
                if (itemNum[i] > 0) {
                    constants.output(`${i}: ${obj.itemName(type, i)}, `);
                }
            }

            constants.output("or 0: none.");
            choice = await constants.input("Enter your choice: ");

            for (let i = 0; i <= num; i++) {
                if (choice == i && itemNum[i] == 0) {
                    constants.output(`You do not have any ${obj.itemName(type, i)}.`);
                    choice = -1;
                }
            }

        } while (![0, 1, 2, 3, 4, 5].includes(parseInt(choice)));

        if (constants.DEBUG) {
            constants.output(`[Event]DEBUG: Pre-Entrance to itemEffect: ${type}, ${choice},`);
        }

        await this.itemEffect(type, choice, obj);
        return choice;
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
                asciiArt.ascilobster();
                guy = new Monster("King Crab", 3, 2);
                break;
            case 2:
                asciiArt.ascipirate();
                guy = new Monster("Pirate", 5, 3);
                break;
            case 3:
                asciiArt.ascicastaway();
                guy = new Monster("Mad Castaway", 8, 2);
                break;
            case 4:
                asciiArt.ascialligator();
                guy = new Monster("Alligator", 5, 6);
                break;
            case 5:
                asciiArt.asciskeleton();
                guy = new Monster("Skeleton", 4, 4);
                break;
            case 6:
                asciiArt.asciameoba();
                guy = new Monster("Giant Ameoba", 4, 6);
                break;
            case 7:
                asciiArt.ascisiren();
                guy = new Monster("Siren", 7, 4);
                break;
            case 8:
                asciiArt.ascisquid();
                guy = new Monster("Giant Squid", 6, 4);
                break;
            case 9:
                asciiArt.ascizombie();
                guy = new Monster("Zombie", 8, 3);
                break;
            case 10:
                asciiArt.asciwraith();
                guy = new Monster("Wraith", 6, 5);
                break;
            case 11:
                asciiArt.asciskeletonN();
                guy = new Monster("Skeleton Knight", 10, 5);
                break;
            case 12:
                asciiArt.ascicrabdragon();
                guy = new Monster("Crab Dragon", 15, 8);
                break;
            case 13:
                asciiArt.ascikali();
                guy = new Monster("Kali: Hindu Goddess of Destruction.", 30, 10);
                break;
            case 14:
                asciiArt.ascioldman();
                guy = new Monster("Old Man", 7, 3);
                break;
            case 20:
                asciiArt.asciguardian();
                guy = new Monster("Endellos, Guardian of the ship", constants.randomNumber(16, 22), constants.randomNumber(4, 6));
                break;
            case 999:
                asciiArt.ascicthulu();
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
                        asciiArt.asciattack();
                        switch (adv) {
                            case -1:
                                if (luck > 90) {
                                    constants.output(`As you struggle to regain your footing; The  ${enem.name}   comes at you with its full might, somehow at the last minute you manage to plant your feet and land a blow on the  ${enem.name}  dealing  ${dmg + 1} damage!`)
                                    enem.hp = enem.hp - (dmg + 1);
                                    return 0;
                                }
                                else {
                                    constants.output(`The  ${enem.name}   charges at your, and you attempt to match its fury with your own, but you cannot recover in time. The  ${enem.name}   lands a crushing blow dealing  ${enem.dmg} 2 +  damage.`)
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
                                    constants.output(`You ready yourself for the attack, but so does your oppenent. The  ${enem.name}   shreds you on approach for  + enem.${dmg + 1}  damage.`)
                                    you.damage(enem.dmg + 1);
                                    return -1;
                                }
                                break;
                            case 1:
                                if (luck > 20) {
                                    constants.output(`You attack the dazed  ${enem.name}  . They attempt to return the blow, but it is a pitiful attempt at best and you land a crushing blow on the  ${enem.name}   for  + dmg + 2 +  damage!`)
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
                        asciiArt.asciblock();
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
                        asciiArt.ascidodge();
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
                                    constants.output(`You step towards the  ${enem.name}  , and it seems wary of you. You throw out an attack at it, and it tries to dodge you but reacts too slowly. You hit the  ${enem.name}   for  ${dmg + 1}`)
                                    enem.hp = enem.hp - (dmg + 1);
                                    return 0;
                                }
                                else {
                                    constants.output(`You charge at the  ${enem.name}  , but it is able to see through your moves, and dodges your every attack, leaving you stunned`)
                                    return -1;
                                }
                                break;
                            case 1:
                                if (luck > 15) {
                                    constants.output(`Ahead of you lie the  ${enem.name}   stumbling and unable to regain its footing. You move in for the attack, and before you do anything, it tries to dodge you. The  ${enem.name}   is helpless; taking advantage of this you land a crushing blow dealing  + dmg + 2 +  damage!`)
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
                        asciiArt.ascigrab();
                        switch (adv) {
                            case -1:
                                if (luck > 60) {
                                    constants.output(`You stumble away from the  ${enem.name}   it approaches you, and grabs at you as you lose your footing. Reflexively you attack it, and by some miracle youre able to hit it for  + dmg +  damage!`)
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
                        asciiArt.asciattack();
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
                        asciiArt.asciblock();
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
                        asciiArt.ascidodge();
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
                        asciiArt.ascigrab();
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
                        asciiArt.asciattack();
                        switch (adv) {
                            case -1:
                                if (luck > 80) {
                                    constants.output(`You can see but an outline of the  ${enem.name}   as it approaches, but at the perfect time you dodge it's attack, leaving it stunned`)
                                    return 1;
                                }
                                else {
                                    constants.output(`You stumble around, trying to keep from falling over entirely, as the  ${enem.name}   approaches. When it attacks you try to dodge, but get hit with a crushing blow. You suffer  ${enem.dmg} 2 +  damage.`)
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
                        asciiArt.asciblock();
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
                        asciiArt.ascidodge();
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
                        asciiArt.ascigrab();
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
                                constants.output(`You saw the  ${enem.name}   and predicted it would grab, so you went for the dodge and evaded it, but you cant help but feel you should have taken advantage of it'f fumbling`)
                                return 0;
                                break;
                        }
                    default:
                        console.error("ERROR: Passed in non-existent enemy move-Id")
                        exit(1);
                        break;
                }
                break;
            //Player chose grab
            case 4:
                switch (enmove) {
                    //Player chose grab|| Enemy chose attack
                    case 1:
                        asciiArt.asciattack();
                        switch (adv) {
                            case -1:
                                if (luck > 80) {
                                    constants.output(`As you fumble about, you can barely make out the hazy outline of the approaching  ${enem.name}   but even as it goes for the attack you're able to grab it and deal  + dmg +  damage!`)
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
                                    constants.output(`The  ${enem.name}   runs at you, ready to attack, but luckily your able to grab it on approach and the  ${enem.name}   takes  + dmg +  damage!`)
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
                                    constants.output(`The  ${enem.name}   stumbles away from you aimlessly, hopeless to defend itself. You grab and beat it mercilessly for  + dmg + 2 +  damage!`)
                                    enem.hp = enem.hp - (dmg + 2);
                                    return 0;
                                }
                                else {
                                    constants.output(`The  ${enem.name}   struggles to regain it's footing, so you go in for the grab and deal  + dmg +  damage!`)
                                    enem.hp = enem.hp - dmg;
                                    return 0;
                                }

                                break;
                        }
                        break;
                    //Player chose grab || Enemy chose block
                    case 2:
                        asciiArt.asciblock();
                        switch (adv) {
                            case -1:
                                if (luck > 50) {
                                    constants.output(`As you stumble and fall, you make the determination to take the  ${enem.name}   to the ground with you, you grab it through it's block and deal  + dmg +  damage!`)
                                    enem.hp = enem.hp - dmg;
                                    return 0;
                                }
                                else {
                                    constants.output(`You fumble about, grabbing at the  ${enem.name}  , but sadly it's defenses hold up`)
                                    return 0;
                                }
                                break;
                            case 0:
                                constants.output(`You grab at the blocking  ${enem.name}   it clearly was not expecting this. You deal  + dmg +  damage!`)
                                enem.hp = enem.hp - dmg;
                                return 0;
                                break;
                            case 1:
                                constants.output(`You approach the stumbling  ${enem.name}   it tries to block you, so you go for the grab deal a whopping  + dmg + 3 +  damage!`)
                                enem.hp = enem.hp - (dmg + 3);
                                return 0;
                                break;
                        }
                        break;
                    //Player chose grab || Enemy chose dodge
                    case 3:
                        asciiArt.ascidodge();
                        switch (adv) {
                            case -1:
                                if (luck > 90) {
                                    constants.output(`By some miracle, even while fumbling about you were able to grab the  ${enem.name}   as it tried to dodge you. The  ${enem.name}   takes  + dmg +  damage!`)
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
                                    constants.output(`You grab at the  ${enem.name}   it tries to dodge you but is too slow, you deal  + dmg +  damage!`)
                                    enem.hp = enem.hp - dmg;
                                    return 0;
                                }

                                break;
                            case 1:
                                constants.output(`You grab at the fumbling  ${enem.name}   it tries to dodge you hopelessly. You deal  + dmg + 2 +  damage!`)
                                enem.hp = enem.hp - (dmg + 2);
                                return 0;
                                break;
                        }
                        break;
                    //Player chose grab || Enemy chose grab
                    case 4:
                        asciiArt.ascigrab();
                        switch (adv) {
                            case -1:
                                if (luck > 80) {
                                    constants.output(`The  ${enem.name}   approaches you as you stumble about, someohow you know it is going for a grab amd you are able to land one before it does! You deal  + dmg +  damage!`)
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
                                    constants.output(`You and the  ${enem.name}   both go for the grab, but you are the succesful one. You deal  + dmg +  damage!`)
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
                                    constants.output(`You approach the fumbling  ${enem.name}   and even while it tries to grab you, you grab it and beat it senseless. You deal  + dmg + 2 +  damage!`)
                                    enem.hp = enem.hp - dmg + 2;
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


    async battle(obj, Id) {
        let weathr = this.evt;
        let adv = 0;
        let enemove = 0;
        let buf;
        let Oitem, Ditem = 0;
        obj.dmg = 1;
        obj.dfc = 1;
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
        Oitem = await this.promptItem(obj, 'O');
        Ditem = await this.promptItem(obj, 'D');

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
            constants.output(`Your HP: ${obj.hp}`);
            constants.output(`################`);

            constants.output(`\n################`);
            constants.output(`${monst.name} HP: ${monst.hp}`);
            constants.output(`################`);

            constants.output(`\nWhat will you do; attack, grab, dodge, block, or use_item?`);

            do {
                c = await constants.input("");
            } while (c != "attack" && c != "dodge" && c != "block" && c != "grab" && c != "use_item");

            if (c == "attack") {
                adv = await this.decider(1, enemove, adv, obj.dmg, obj, monst);
            } else if (c == "block") {
                adv = await this.decider(2, enemove, adv, obj.dmg, obj, monst);
            } else if (c == "dodge") {
                adv = await this.decider(3, enemove, adv, obj.dmg, obj, monst);
            } else if (c == "grab") {
                adv = await this.decider(4, enemove, adv, obj.dmg, obj, monst);
            } else if (c == "use_item") {
                if (await promptItem(obj, 'H') == -1) {
                    constants.output("You have no items you could use right now.");
                    await this.buffer('.');
                    buf = await constants.input("");
                }
            }

        } while (monst.hp > 0 && obj.hp > 0);

        if (obj.hp <= 0) {
            constants.output(`The ${monst.name} knocks you to the ground, you struggle to get up, but are too weak to do anything but lie there. They move in for the killing blow, and all you can do is close your eyes`);
            await this.buffer('.');
            buf = await constants.input("");
            return;
        }

        if (monst.hp < 0 && obj.hp > 0) {
            asciiArt.asciwin();
            let chance = constants.randomNumber(1, 50);
            constants.output(`\nThe ${monst.name} falls beaten to the ground, You have won this encounter.`);
            if (chance > 35) {
                let type;
                let id = 0;
                let item = await obj.genranditem(type, id);
                constants.output(`You notice that the defeated ${monst.name} was carrying a/an ${obj.itemname(item.type, item.id)}!`);
                obj.insert(item.type, item.id);
            } else if (chance > 15 && chance < 35) {
                let batts = constants.randomNumber(1, 4);
                constants.output(`Much to your surprise, you also notice the ${monst.name} had ${batts} batteries, so you take them for yourself!`);
                obj.batt = (obj.batt + batts);
                await this.buffer('.');
                buf = await constants.input("");
            }

            if (Oitem > 0) {
                let luck = constants.randomNumber(1, 100);
                if (luck < 20) {
                    constants.output(`You stand next to the fallen ${monst.name}. Your pride swells, but as you go to put your ${obj.itemname('O', Oitem)} you notice to your dismay that it has broken.`);
                    await this.buffer('.');
                    buf = await constants.input("");
                    if (obj.remove('O', Oitem) == 0) {
                        console.error("ERROR: Attempting to remove a broken weapon; that does not exist.");
                    }
                }
            }

            if (Ditem > 0) {
                let luck = constants.randomNumber(1, 100);
                if (luck < 20) {
                    constants.output(`As you walk away from the fallen ${monst.name} you notice your ${obj.itemname('D', Ditem)} has been left in pieces, and it crumbles off your body.`);
                    await this.buffer('.');
                    buf = await constants.input("");
                    if (obj.remove('D', Ditem) == 0) {
                        console.error("ERROR: Attempting to remove broken armor, that does not exist.");
                    }
                }
            }
        }
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

        if (player.hp > 0) {
            constants.output("================================");
            constants.output(`Hp: ${player.hp}`);
            constants.output(`Distance: ${player.delta}`);
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
        //     tmp = null;  // In JavaScript, setting an object to null will allow the garbage collector to clean it up
        // }
        player.delta = (player.delta + x);
    }


    //############
    //JUICY EVENTS
    //############
    async start(player) {
        let choice;
        asciiArt.ascibox();
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
            constants.output("You hesitate at first and then respond. 'Special' you say, and without delay the box opens up to reveal a ${player.itemName('S', item)}. You reach leto the box and grab it. Upon obtaining your ${player.itemName('S', item)} the box vanished before your eyes.");
            player.insert('S', item);
        }

        await this.battle(player, 1);
        await this.next(player);
    }

    async cave(player) {
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
                        buf = await constants.input("Enter your choice: ");
                        await this.battle(player, 0);
                    }
                    else if (roomluck[i] > 40 && roomluck[i] < 70) {
                        constants.output("This room has something in the middle.You cannot tell what yet, but it glistens in the beam of your flashlight, ")
                        getitem(player);
                    }
                    else {
                        constants.output("This room is full of sharp stallagtites, and stallagmites. Without your flashlight to guide you, you would have surely been hurt")
                    }
                }
                if (i < length && player.hp > 0) {
                    constants.output("Ahead you see the cave diverges to the right and to the left, which path do you want to take?")
                    do {
                        choice = await constants.input("Enter your choice: ");
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
                buf = await constants.input("Enter your choice: ");
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
                        buf = await constants.input("Enter your choice: ");
                        await this.battle(player, 0);
                    }
                    else if (roomluck[i] > 50 && roomluck[i] < 75) {
                        constants.output("You stumble through this room in the darkness, unable to see anything that might harm you, or help you.")
                    }
                    else {
                        let dmg = constants.randomNumber(1, 5);
                        constants.output("You enter this room, and get cut almost instantly. You cannot be sure what is hurting you so you just keep running frantically trying to find and exit. Your clothes are in tatters, and your body has been broken. (-" + dmg + " Hp)")
                        player.hp = (player.hp - dmg);
                        await this.buffer('.');
                        buf = await constants.input("Enter your choice: ");
                    }
                }
                if (i < length && player.hp > 0) {
                    constants.output("Ahead you can barely make out that the cave diverges to the right and to the left, which path do you want to take?")
                    do {
                        choice = await constants.input("Enter your choice: ");
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
                    buf = await constants.input("Enter your choice: ");
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
                buf = await constants.input("Enter your choice: ");
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
        await this.next(player);
        await this.buffer('.');
        return;
    }

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
                asciiArt.ascidolphin();
                let dolphdist = constants.randomNumber(3, 6);

                constants.output("Just your luck, it was a dolphin! The dolphin seems overjoyed to see you, and instantly takes off towards the ship with you on it's back.");
                constants.output("The dolphin swims into another gap very similar to the one which you first found it in, and you hop off. You judge it must have take you " + dolphdist + ": kilometers closer!");
                await this.wormhole(dolphdist, player);
                return;
            } else {
                asciiArt.ascishark();
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

        constants.output("You enter a thick fog, so thick you can hardly see you hands in front of you. You fear what dangers could be lurking in the fog, wholly hidden from view but apt to cause you harm.");
        constants.output("You know your flashlight could cut through this fog easily, but that would mean using a battery.");

        if (player.batt > 0) {
            do {
                c = await constants.input("\nDo you wish to use a battery? (y:yes || n:no)");
            } while (!['y', 'n'].includes(c));
        } else {
            constants.output("\nSadly, you are out of batteries");
            c = 'n';
        }

        if (c == 'y') {
            player.batt = (player.batt - 1);
            asciiArt.ascibulb();
            if (luck > 15) {
                constants.output("With your flashlight, you are able to see further into the fog. You see hazy outlines of what could be dangers, and stick to the path of least resistance. After what feels like an eternity, you make it through the fog.");
            } else {
                let item = constants.randomNumber(1, 3);
                constants.output("Using the beam of your flashlight you easily cut through the fog. You see your fear was almost entirely unfounded, as the fog is devoid of any danger. As you continue along you find a " + player.itemName('H', item) + " on the ground, you know this will be useful later and decide to take it with you.");
                player.insert('H', item);
            }
        } else if (c == 'n') {
            if (luck > 40) {
                constants.output("You stumble through the fog blindly, terrified by every dark shape. You see things moving in the fog, and hear unholy sounds coming from the depths of it, but by some miracle you manage to make it through.");
            } else if (luck < 40 && luck > 15) {
                constants.output("Even though you cannot see you way, you trudge forwards. You try to avoid any hazy shape you can make out in the fog, but your caution was not enough.");
                constants.output("Something or someone in the fog attacks you, and you fall unconscious. When you come to the fog has cleared, but you're in deep pain. Hp - 3");
                player.hp = (player.hp - 3);
            } else {
                constants.output("You move through the fog, blind and unaware of your surroundings, and the whole time you feel as though you are being watched. You feel as though you can see the edge of the fog, when your paranoia proves to be justified.");
                await this.battle(player, 0);
            }
        }

        await this.next(player);
    }

    async outcrop(obj) {
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
        item = await obj.genranditem()
        iD = item.val
        type = item.type
        constants.output(`You come to a raised rocky outcropping, you judge it might be ${height * 3} meters  above sea level.`);
        constants.output(`You almost just kept on walking were it not for the ${obj.itemName(type, iD)} you spotted sitting atop the outcropping!`);
        constants.output(`You think you can climb up to it, but falling from ${height * 3} meters would certainly hurt`);
        constants.output(`Would you like to climb up to the ${obj.itemName(type, iD)}? (y:yes||n:no)`);
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
                        obj.hp = obj.hp - i;
                        fallen = true;
                    } else if (climbluck[i] > 20 && climbluck[i] < 60) {
                        constants.output(`You climb further up the outcropping, you guess you are now ${i * 3} meters off the ground...`);
                    } else {
                        constants.output(`Your hands find their placement perfectly, and you climb up the rock with ease, and before you realize it you are ${i * 3} meters high...`);
                    }
                    if (!fallen && obj.hp > 0) {
                        constants.output("Continue climbing? (y:yes || n:no)");
                        let climbvar = '';
                        do {
                            climbvar = await constants.input("Enter your choice: ");
                        } while (climbvar != 'y' && climbvar != 'n');
                        if (climbvar == 'n') {
                            fallen = true;
                        }
                    } else if (obj.hp <= 0) {
                        return;
                    }
                    if (fallen) {
                        constants.output(`You sit defeated at the bottom of the outcropping, your mind still on the ${obj.itemName(type, iD)} at the top.`);
                        constants.output(`You could try for it again, your Hp is at ${obj.hp}, so it might be a risky move.`);
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
                constants.output(`You made it to the top! You can scarcely believe you were able to make it, but now that you're here you are able to claim the ${obj.itemName(type, iD)} for yourself.`);
                obj.insert(type, iD);
            }
        }
        else {
            constants.output(`You decide it would be best to reserve what Hp you have left, you've got a long road ahead of you and a/an ${obj.itemName(type, iD)} is not worth the potential injury`);
        }
        await this.next(obj);
        return;
    }

    async oldman(obj) {
        let luck = constants.randomNumber(1, 100);
        constants.output("As you continue along your path, you find an old man sitting along the shore. As you approach you find it hard to discern if he is even alive or dead, but when the old man notices you he gestures weakly for you to approach him closer");
        constants.output("The old man is not able to speak, but you can tell from his weak gestures that he wants an item");

        if (obj.empty() == 0) {
            let c = 'm';
            constants.output("You do have something you could offer the man; will you give him an item? (y:yes||n:no)");
            do {
                c = await constants.input("Enter your choice: ");
            } while (c != 'y' && c != 'n');
            if (c == 'y') {
                let gift = 'N';
                //Checks if player have any health items, if so gives the first in the list to the old man
                if (obj.typepresent('H') > 0) {
                    let id;
                    for (let i = 1; i < 3; i++) {
                        if (obj.doeshave('H', i)) {
                            id = i;
                            i = 3;
                        }
                    }
                    obj.remove('H', id);
                    constants.output("You gave the old man a/an " + obj.itemName('H', id) + " he seems overjoyed with the gift!");
                    gift = 'H';
                }
                //Checks if player have any defence items, if so gives the first in the list to the old man
                else if (obj.typepresent('D') > 0) {
                    let id;
                    for (let i = 1; i < 3; i++) {
                        if (obj.doeshave('D', i)) {
                            id = i;
                            i = 3;
                        }
                    }
                    obj.remove('D', id);
                    constants.output("You gave the old man a/an " + obj.itemName('D', id) + " he seems overjoyed with the gift!");
                    gift = 'D';
                }
                //Checks if player have any offence items, if so gives the first in the list to the old man
                else if (obj.typepresent('O') > 0) {
                    let id;
                    for (let i = 1; i < 3; i++) {
                        if (obj.doeshave('O', i)) {
                            id = i;
                            i = 3;
                        }
                    }
                    obj.remove('O', id);
                    constants.output("You gave the old man a/an " + obj.itemName('O', id) + " he seems overjoyed with the gift!");
                    gift = 'O';
                }
                //Checks if player has any special items, if so gives the first in the list to the old man
                else if (obj.typepresent('S') > 0) {
                    let id;
                    for (let i = 1; i < 5; i++) {
                        if (obj.doeshave('S', i)) {
                            id = i;
                            i = 5;
                        }
                    }
                    obj.remove('S', id);
                    constants.output("You gave the old man a/an " + obj.itemName('S', id) + " he seems overjoyed with the gift!");
                    gift = 'S';
                }

                //Block that will sometimes run if player gave the old manan item, he will heal the player and give them the best item of whatever type they gave him.
                if (luck > 65) {
                    constants.output("The man was so pleased with his gift, he decided to heal you for 5 hp points, and he gave you a/an " + obj.itemName(gift, 3) + "!");
                    obj.hp = obj.hp + 5;
                    obj.insert(gift, 3);
                }
            }
            //Runs if player has items to give, but decided not to share
            else {
                if (constants.DEBUG)
                    constants.output("[Event]DEBUG:Did not give old man an item");
                if (luck > 30) {
                    constants.output("Before you can even tell the old man you do not want to give him an item, he gets up abruptly and attacks you");
                    await this.battle(obj, 14);
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
        this.next(obj);
        return;
    }

    async tree(obj) {
        // generates luck value
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
                asciiArt.ascikey(); // this is assuming that ascikey() is a function defined somewhere in your code
                constants.output("\nYou dont know how, but somehow you understand that this key is very important.");
                obj.insert('S', -1);
            }
            else if (luck < 40 && luck > 25) {
                let id = constants.randomNumber(1, 3);
                constants.output("You reach into the tree, and fumble around for a while until you feel something. When you pull that something out you notice its a/an " + obj.itemName('O', id) + "!");
                obj.insert('O', id);
            }
            else {
                constants.output("As you reach into the tree, you fee the hole closing faster and faster around your arm. You try to pull it out in time but to no avail, this tree was clearly a trap and you walked right into it");
                constants.output("You hear someone or something approaching, but cannot make out what it is yet...");
                await this.battle(obj, 0); // this is assuming that battle(obj, 0) is a function defined somewhere in your code
            }
        }
        else {
            constants.output("You decide against reaching into the tree, anything could be in there and you dont want to risk it");
        }
        await this.next(obj);
        return;
    }

    async shop(obj) {
        let type = [];
        let id = [];
        let prices = [];

        for (let i = 0; i < 3; i++) {
            type[i] = this.randitem();
            if (type[i] === 'S') {
                id[i] = constants.randomNumber(1, 5);
                prices[i] = i + constants.randomNumber(1, 3);
            } else {
                id[i] = constants.randomNumber(1, 3);
                prices[i] = i + constants.randomNumber(1, 2);
            }
        }

        constants.output("\nYou approach what seems to be a small shack along the shore.");
        constants.output("When you near the shack you see there is a man inside. He is trying to say something to you, but you cant quite make out what");
        constants.output("'Hello!' says the man. 'Welcome to my store traveler!");
        constants.output("The store has 3 items for sale, all items appear to be purchased using batteries.");

        let c = 'm';
        do {
            for (let i = 0; i < 3; i++) {
                if (id[i] > 0) {
                    constants.output(`Item#${i + 1} is a/an ${obj.itemname(type[i], id[i])} for ${prices[i]} batteries.`);
                }
            }
            constants.output("\nDo you want to make a purchase? (1:Item#1 || 2:Item#2 || 3: Item#3 || 0: None)");

            let choice;
            do {
                choice = await constants.input("Enter your choice: ");
            } while (choice != 1 && choice != 2 && choice != 3 && choice != 0);

            if (choice == 1) {
                if (obj.batt < prices[0]) {
                    constants.output("Sadly, you do not have enough batteries to purchase this item");
                } else if (id[0] == 0) {
                    constants.output("You already purchased this item");
                } else {
                    obj.batt = (obj.batt - prices[0]);
                    obj.insert(type[0], id[0]);
                    constants.output(`You got a/an ${obj.itemname(type[0], id[0])}! You have ${obj.batt} batteries remaining.`);
                    id[0] = 0;
                }
            } else if (choice == 2) {
                if (obj.batt < prices[1]) {
                    constants.output("Sadly, you do not have enough batteries to purchase this item");
                } else if (id[1] == 0) {
                    constants.output("You already purchased this item");
                } else {
                    obj.batt = (obj.batt - prices[1]);
                    obj.insert(type[1], id[1]);
                    constants.output(`You got a/an ${obj.itemname(type[1], id[1])}! You have ${obj.batt} batteries remaining.`);
                    id[1] = 0;
                }
            } else if (choice == 3) {
                if (obj.batt < prices[2]) {
                    constants.output("Sadly, you do not have enough batteries to purchase this item");
                } else if (id[2] == 0) {
                    constants.output("You already purchased this item");
                } else {
                    obj.batt = (obj.batt - prices[2]);
                    obj.insert(type[2], id[2]);
                    constants.output(`You got a/an ${obj.itemname(type[2], id[2])}! You have ${obj.batt} batteries remaining.`);
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
        await this.next(obj);
    }

    async lighthouse(player) {
        let abom = false;
        let done = false;
        let floors = constants.randomNumber(4, 8);
        let c = 'm';
        let choice = 'm';
        let luck = 0;
        asciiArt.ascilighthouse();
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

                    let item = genranditem(type, id);
                    constants.output("\nYou made it to the top of the lighthouse, the view from up here is astounding!");
                    constants.output("You stare at the ocean around you, so entranced you don't even notice the " + player.itemname(type, id) + " on the ground right next to you!");
                    await this.buffer('.');
                    buf = await constants.input("");
                    player.insert(item.type, item.id);
                    done = true;
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
                            cin >> book;
                        } while (book != 1 && book != 2 && book != 3);
                        //Book chances
                        switch (book) {
                            case 1:
                                if (chance < 33) {
                                    let bat = constants.randomNumber(1, 3);
                                    obj.batt = (obj.batt + bat);
                                    constants.output("You pull the book from the shelf, and open it up. Inside you find that the pages have been carved out and someone has stashed " + bat + " batteries) inside!")
                                    constants.output("You now have " + obj.batt + bat + "batteries.")
                                    constants.output("You attempt to place the book back in the bookshelf, and to your suprise you notice the entire thing has vanished.")
                                }
                                else if (chance > 33 && chance < 66) {
                                    constants.output("You pull the book from the shelf, and open it up. It's an old horror novel, something about strange colors in a well and infected agriculture. You feel a sense of dread wash over you, something horrible is waiting for you here.")
                                    abom = 1;
                                }
                                else {
                                    constants.output("You pull the book from the shelf, and open it to find all the pages in the book empty, but at the very end of the book someone left a bandage. Only slightly used, so you decide to patch yourself up.(Hp +1)")
                                    obj.hp = (obj.hp + 1);
                                }
                                break;
                            case 2:
                                if (chance < 33) {
                                    let type = obj.randitem();
                                    let id = constants.randomNumber(1, 3);
                                    constants.output("You pull the book from it's shelf, and behind it you find a/an " + obj.itemname(type, id) + "!")
                                    obj.insert(type, id);
                                }
                                else if (chance > 33 && chance < 66) {
                                    constants.output("You pull the book from the shelf, and open it to find all the pages in the book empty, but at the very end of the book someone left a bandage. Only slightly used, so you decide to patch yourself up.(Hp +1)")
                                    obj.hp = (obj.hp + 1);
                                }
                                else {
                                    let dmg = constants.randomNumber(3, 5);
                                    constants.output("You pull the book from the shelf, but upon doing so the entire shelf collapses on top of you,and you fall unconcious. When you come to the bookshelf is no where to be found, but your body aches and you struggle to get up. (Hp -" + dmg + ")")
                                    obj.hp = (obj.hp - dmg);
                                }
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
                                    obj.batt = (obj.batt + bat);
                                    constants.output("You pull the book from the shelf, and open it up. Inside you find that the pages have been carved out and someone has stashed " + bat + " batteries) inside!")
                                    constants.output("You now have " + obj.batt + bat + "batteries.")
                                    constants.output("You attempt to place the book back in the bookshelf, and to your suprise you notice the entire thing has vanished.")
                                }
                                break;
                            default:
                                console.error("ERROR: Book # non-existant, ending game!")
                                exit(1);
                                break;
                        };
                    }
                    else if (luck > 40 && luck < 60) {
                        luck = constants.randomNumber(1, 100);
                        if (abom) {
                            constants.output("An unearthly chill comes over you, unlike anything you have ever felt before. You feel eyes on you, but these eyes see more than any other, you know you have walked into your doom.")
                            obj.setsecr(obj.getsecr() * -1);
                            await this.battle(obj, 999);
                        }
                        else {
                            constants.output("You cannot be sure what, but something is in this room, and its coming right at you!")
                            await this.battle(obj, 0);
                        }
                    }
                    else if (luck > 60 && luck < 80) {
                        luck = constants.randomNumber(1, 100);
                        let type = obj.randitem();
                        let id = 0;
                        if (type == 'S') {
                            id = constants.randomNumber(1, 5);
                        }
                        else {
                            id = constants.randomNumber(1, 3);
                        }
                        constants.output("You enter the room, and it is largely in disrepair much like all the others. In the center of the room however there is a " + obj.itemname(type, id) + " sitting on a nearly collapsed table.")
                        obj.insert(type, id);
                    }
                    else {
                        luck = constants.randomNumber(1, 100);
                        let chance = constants.randomNumber(1, 100);
                        let d = 'm';
                        constants.output("You enter the room, and the first thing you notice is the smell. The entire lighthouse has a foul odor, but in this room its was inescapable. The stench was so overpowering you almost failed to notice a chest in the center of the room. There is something ominous about this chest, but you cant help but feel there might be something useful inside")
                        constants.output("Open the chest? (y:yes || n:no)")
                        do {
                            cin >> d;
                        } while (d != 'y' && d != 'n');
                        if (d == 'y') {
                            if (chance > 70) {
                                let type = obj.randitem();
                                let id = 0;
                                if (type == 'S') {
                                    id = constants.randomNumber(1, 5);
                                }
                                else {
                                    id = constants.randomNumber(1, 3);
                                }
                                constants.output("You open up the chest, and inside you find a/an" + obj.itemname(type, id) + "!")
                                obj.insert(type, id);
                            }
                            else if (chance < 70 && chance > 40) {
                                constants.output("You open up the chest, and find nothing but cobwebs")
                            }
                            else {
                                constants.output("You open up the chest....")
                                await this.battle(obj, 0);
                            }
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
            } while (i < floors && choice != 'n' && done != true && player.hp > 0);
        } else {
            constants.output("You decide against entering the lighthouse. There could have been something valuable in there, but the dangers within could prove fatal.");
        }
        await this.next(player);
        return;
    }

    async function fishing(player) {
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
        constants.output('_');
        buf = await constants.input("Enter your choice: ");
        do {
            luck = constants.randomNumber(1, 99);
            constants.output("You cast line #" + i + "...");
            //Events that can occur during fishing, 1/3 chance for each event
            if (luck < 33) {
                let HPup = constants.randomNumber(1, 4);
                constants.output("You reel in the line, and at the end of it you find a hearty fish!");
                constants.output("You take the time to cook and prepare the fish, and after eating it your Hp goes up by " + HPup + " points! (Hp +" + HPup + ")");
                player.hp += HPup;
            }
            else if (luck > 33 && luck < 66) {
                genranditem(type, id);
                constants.output("You reel in the line, and at the end of it you find a/an " + player.itemname(type, id) + "!");
                player.insert(type, id);
            }
            else {
                constants.output("You reel in the line, and you find nothing at the end of it, but you sense something sneaking up behind you...");
                constants.output('_');
                buf = await constants.input("Enter your choice: ");
                battle(player, 0);
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
                constants.output('.');
                buf = await constants.input("Enter your choice: ");
                d = 'n';
            }
        } while (d == 'y' && bait > 0 && obj -> gethp() > 0);

    }
    else {

    }
}
    async end(player) {
    let buf;
    constants.output("You've finally made it, the cruise ship is within a kilometer of you! You run towards the dock, screaming and flailing about hoping to get someone's attention.");
    constants.output("Then suddenly, the sky blackens, a thick fog rolls in, and you are filled with an immense dread. From the ground in front of you erupts a terrible nightmare, lying in wait for you.");
    constants.output('_');
    buf = await constants.input("Enter your choice: ");
    await this.battle(player, 20);
    if (player.hp > 0) {
        constants.output("As the beast falls, the sky clears around you, and you find yourself transported to the base of the ship. You dont remember much after that, foggy images of some kind crew members taking you aboard. When you next awaken you're safe and warm in a bed aboard the cruise ship.");
        constants.output('.');
        buf = await constants.input("Enter your choice: ");
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
            constants.output("You continue towards the ship, you judge it must be " + this.dist - player.delta + " kilometers away now. You feel confident about making it to the ship. You take some time to check you pockets.");
        } else {
            constants.output("As you continue your trek towards the ship, you feel hopeful. You've already travelled " + player.delta + " kilometers, and you know you can keep going");
        }
    } else {
        if (chance < 25) {
            constants.output("Your body aches, your journey thus far has not been an easy one, and you still have " + this.dist - player.delta + " kilometers to go. Your Hp has fallen to " + player.hp + ", and you have " + player.batt + " batteries for your flashlight left. You hope to muster the strength to continue onwards.");
        } else {
            constants.output("You walk along the path, slower now as the obstacles have taken a toll on you. You've walked " + player.delta + " kilometers already, and felt every single one. Your health has fallen to " + player.hp + ", and you have " + player.batt + " batteries remaining. You hope to find something that can lift some of this burden.");
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
        constants.output("       Prleting path      ");
        constants.output("==========================");
        if (this.events.length === 0) {
            console.error("ERROR: List is empty");
        } else {
            this.events.forEach(event => {
                constants.output(`Distance: ${event.dist} Event: ${event.evt} Weather: ${event.weath}`);
            });
        }
        constants.output("==========================");
        constants.output("        Path Prleted      ");
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


module.exports = { Event, Path };
