#ifndef PLAYER
#define PLAYER
#include "item.h"
#include "header.h"
using namespace std;
class Player
{
private:
    float hp;
    int dist;
    int delta;
    int batt;
    int dmg;
    int path;
    int secr;
    float dfc;
    vector<Item> items;
    
public:
    // List functions
    Player();
    ~Player();
    bool empty();
    bool remove(char c, int value);
    int size();
    string itemname(char c, int val);
    int typepresent(char c);
    int givenum(char c, int x);
    bool doeshave(char c, int val);
    void insert(char type, int val);

    // Setters and Getters
    void damage(int x);
    void setpath(int x);
    int getpath();
    void setdelta(int x);
    int getdelta();
    void setdfc(float x);
    float getdfc();
    void setsecr(int x);
    int getsecr();
    void sethp(float x);
    float gethp();
    void setdmg(int x);
    int getdmg();
    void setdist(int y);
    int getdist();
    void setbatt(int z);
    int getbatt();
};
#endif
