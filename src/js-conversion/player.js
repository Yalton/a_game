const Constants = require('./constants.js');

const constants = new Constants();

class Item {
    constructor(type = 'n', value = 0) {
        this.type = type;
        this.val = value;
    }
}


class Player {
    constructor() {
        console.log("[Player]DEBUG:Constructing player object");
        this.hp = 10;
        this.dist = 0;
        this.delta = 0;
        this.batt = 3;
        this.path = -1;
        this.items = [];
        this.dmg = 1;
        this.secr = 1;
        this.dfc = 1;
        this.enemfelled = 0;
    }

    empty() {
        return this.items.length === 0;
    }

    insert(type, val) {
        val = Number(val)
        if (constants.DEBUG)
            console.log("[Player]DEBUG: Inserting a/an " + this.itemName(type, val) + " into Item; type is " + type + "val is: " + val);
        if (type == 'S' || type == 'D' || type == 'O' || type == 'H') {
            let x = new Item(type, val);
            this.items.push(x);
            return;
        } else {
            console.error("[Player]ERROR:Invalid item type given to player insert. Type given :" + type);
            process.exit(1);
        }
    }

    remove(c, value) {
        value = Number(value)
        if (constants.DEBUG)
            console.log(`[Player]DEBUG: Remove function called for ${this.itemName(c, value)}.`);
        const index = this.items.findIndex(item => item.type === c && item.val === value);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }

    size() {
        return this.items.length;
    }

    itemName(c, val) {
        val = Number(val)
        if (constants.DEBUG)
            console.log("[Player]DEBUG: Calling Item name for Item; type is " + c + "val is: " + val);

        switch (c) {
            //Offence items case
            case 'O':
                switch (val) {
                    case 1:
                        return "Knife";
                        break;

                    case 2:
                        return "Sword";
                        break;

                    case 3:
                        return "Gun";
                        break;
                }
            //Defense items case
            case 'D':
                switch (val) {
                    case 1:
                        return "Leather Jacket";
                        break;
                    case 2:
                        return "Chainmail";
                        break;
                    case 3:
                        return "Knight Armor";
                        break;
                }
            //Health items case
            case 'H':
                switch (val) {
                    case 1:
                        return "Bandage";
                        break;
                    case 2:
                        return "Medkit";
                        break;
                    case 3:
                        return "Stem Cells";
                        break;
                }
                break;
            //Special items case
            case 'S':
                switch (val) {
                    case 1:
                        return "Battery Box";
                        break;
                    case 2:
                        return "Mystery Box";
                        break;
                    case 3:
                        return "Wormhole Box";
                        break;
                    case 4:
                        return "Battle Box";
                        break;
                    case 5:
                        return "Path Switcher";
                        break;
                    case -1:
                        return "Mysterious Key";
                        break;
                }
                break;
        }
        //If item is not in the list, this will return. Program will not break
        return "ITEM_NULL";
    }

    typePresent(c) {
        return this.items.filter(item => item.type === c && item.val > 0).length;
    }

    giveNum(c, x) {
        return this.items.filter(item => item.type === c && item.val === x).length;
    }

    doesHave(c, val) {
        return this.items.some(item => item.type === c && item.val === val);
    }

    damage(x) {
        this.hp -= this.dfc * x;
        console.log(`[Player]DEBUG:In damage function. Defence rating is: ${this.dfc} Incoming Damage: ${x} Adjusted Damage: ${this.dfc * x}.`);
    }

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

    async genranditem() {
        let type = await this.randitem();
        let id
        switch (type) {
            case 'S':
                id = constants.randomNumber(1, 5);
                break;
            default:
                id = constants.randomNumber(1, 3);
                break;
        }
        if (constants.DEBUG)
            console.log(`[Player]DEBUG: Generating new random item with type ${type} and id ${id}.`);
        return { type, id }
    }



    // Setters & Getters 
    set path(x) {
        this._path = x;
    }
    get path() {
        return this._path;
    }

    set delta(x) {
        this._delta = x;
    }
    get delta() {
        return this._delta;
    }

    set hp(x) {
        this._hp = Math.min(x, 35);
    }
    get hp() {
        return this._hp;
    }

    set dfc(x) {
        this._dfc = x;
    }
    get dfc() {
        return this._dfc;
    }

    set secr(x) {
        this._secr = x;
    }
    get secr() {
        return this._secr;
    }

    set dmg(x) {
        this._dmg = x;
    }
    get dmg() {
        return this._dmg;
    }

    set dist(y) {
        this._dist = y;
    }
    get dist() {
        return this._dist;
    }

    set batt(z) {
        this._batt = z;
    }
    get batt() {
        return this._batt;
    }
    set enemfelled(z) {
        this._enemfelled = z;
    }
    get enemfelled() {
        return this._enemfelled;
    }
}


module.exports = Player;
//module.exports = Item