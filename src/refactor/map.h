#ifndef MAP_H
#define MAP_H
#include <iostream>
#include "player.h"
#include "event.h"
#include "header.h"
#include <vector>
using namespace std;

class GameMap
{
private:
    vector<vector<Event>> paths;
    Player player;
    Text outputText;

public:
public:
    // List Functions
    GameMap();
    ~GameMap();
};
#endif