#include <iostream>
#include <iomanip>
#include "player.h"
#include "item.h"
#include "header.h"
using namespace std;

Player ::Player()
{
    if (DEBUG)
        std ::cout << "[Player]DEBUG:Constructing player object" << '\n';
    hp = 10;
    dist = 0;
    delta = 0;
    batt = 3;
    path = -1;
    dmg = 1;
    secr = 1;
    dfc = 1;
}
Player::~Player()
{
    items.clear();
}

void Player::addItem(int id)
{
    items.push_back(new Item(id));
}

/* Setters & Getters */
void Player ::setpath(int x)
{
    path = x;
}
int Player::getpath()
{
    return path;
}
void Player ::setdelta(int x)
{
    delta = x;
}
int Player ::getdelta()
{
    return delta;
}
void Player ::sethp(float x)
{
    if (x < 35)
    {
        hp = x;
        return;
    }
    else
    {
        hp = 35;
        return;
    }
}

float Player ::gethp()
{
    return hp;
}
void Player ::setdfc(float x)
{
    dfc = x;
}
void Player ::setsecr(int x)
{
    secr = x;
}
int Player::getsecr()
{
    return secr;
}

float Player ::getdfc()
{
    return dfc;
}
void Player ::setdmg(int x)
{
    dmg = x;
}
int Player ::getdmg()
{
    return dmg;
}
void Player ::setdist(int y)
{
    dist = y;
}
int Player ::getdist()
{
    return dist;
}

void Player ::setbatt(int z)
{
    batt = z;
}
int Player ::getbatt()
{
    return batt;
}
