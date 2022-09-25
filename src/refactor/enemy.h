#ifndef ENEMY_H
#define ENEMY_H
// #include "player.h"
// #include "event.h"
#include "header.h"
#include <vector>
using namespace std;

class Enemy
{
    private:
        string name;
        int hp = 0;
        int dmg = 0;

    public:
        Enemy(int id);
        ~Enemy();
};
#endif