#include <iostream>

#include "enemy.h"
using namespace std;

Enemy::Enemy(int id)
{
    switch (id)
    {
    case 1:
        hp = 3;
        dmg = 2;
        name = "King Crab";
        break;
    case 2:
        hp = 5;
        dmg = 3;
        name = "Pirate";
        break;
    case 3:
        hp = 8;
        dmg = 2;
        name = "Mad Castaway";
        break;
    case 4:
        name = "Alligator";
        hp = 5;
        dmg = 6;
        break;
    case 5:
        hp = 4;
        dmg = 4;
        name = "Skeleton";
        break;
    case 6:
        hp = 4;
        dmg = 6;
        name = "Giant Ameoba";
        break;
    case 7:
        hp = 7;
        dmg = 4;
        name = "Siren";
        break;
    case 8:
        hp = 6;
        dmg = 4;
        name = "Giant Squid";
        break;
    case 9:
        hp = 8;
        dmg = 3;
        name = "Zombie";
        break;
    case 10:
        hp = 6;
        dmg = 5;
        name = "Wraith";
        break;
    case 11:
        hp = 10;
        dmg = 5;
        name = "Skeleton Knight";
        break;
    case 12:
        hp = 15;
        dmg = 8;
        name = "Crab Dragon";
        break;
    case 13:
        hp = 30;
        dmg = 10;
        name = "Kali: Hindu Goddess of Destruction.";
        break;
    case 14:
        name = "Old Man";
        hp = 7;
        dmg = 3;
        break;
    case 20:
        hp = randn(16, 22);
        dmg = randn(4, 6);
        name = "Endellos, Guardian of the ship";
        break;
    case 999:
        name = "Cthulu, Great Old One, Dreamer of R'yleh";
        hp = 100000;
        dmg = 1000;
        break;
    default:
        std ::cerr << "ERROR: In monstinfo, monster Id passed in does not exist" << '\n';
        exit(1);
        break;
    }
}


 Enemy::~Enemy()
 {

 }