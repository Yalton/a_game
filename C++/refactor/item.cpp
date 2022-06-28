#include <iostream>
#include <vector>
#include "item.h"
using namespace std;

Item::Item(int id)
{
    switch (id)
    {
        // Offence items case
    case 1:
        name = "Knife";
        type = 'O';
        break;

    case 2:
        name = "Sword";
        type = 'O';
        break;

    case 3:
        name = "Gun";
        type = 'O';
        break;

        // Defense items case
    case 4:
        name = "Leather Jacket";
        type = 'D';
        break;
    case 5:
        name = "Chainmail";
        type = 'D';
        break;
    case 6:
        name = "Knight Armor";
        type = 'D';
        break;

        // Health items case
    case 7:
        name = "Bandage";
        type = 'H';
        break;
    case 8:
        name = "Medkit";
        type = 'H';
        break;
    case 9:
        name = "Stem Cells";
        type = 'H';
        break;

        break;
        // Special items case
    case 10:
        name = "Battery Box";
        type = 'S';
        break;
    case 11:
        name = "Mystery Box";
        type = 'S';
        break;
    case 12:
        name = "Wormhole Box";
        type = 'S';
        break;
    case 13:
        name = "Battle Box";
        type = 'S';
        break;
    case 14:
        name = "Path Switcher";
        type = 'S';
        break;
    case -1:
        name = "Mysterious Key";
        type = 'S';
        break;

        break;
    default:
        cerr << "[Player]ERROR: Attempting to add an item which does not exist. Id: " << id << "." << '\n';
        exit(1);
    }
}
