#ifndef PLAYER
#define PLAYER
#include "header.h"

class Player {
private:
    using namespace std;

    float hp;
    int dist;
    int delta;
    int batt;
    int dmg;
    int path;
    int secr;
    float dfc;

    struct ItemNode {
        char type = 'n';
        int val = 0;
    };

    struct Item {
        ItemNode item;
        Item* next;

        Item(const ItemNode& item, Item* next)
            : item(item), next(next) {}
        ~Item() { delete next; }
    };

    Item* m_head;

public:
    // List functions
    Player();
    ~Player();
    bool empty() const;
    bool remove(char c, int value);
    int size() const;
    string itemname(char c, int val) const;
    int typepresent(char c) const;
    int givenum(char c, int x) const;
    bool doeshave(char c, int val) const;
    void insert(char type, int val);

    // Setters and Getters
    void damage(int x);
    void setpath(int x);
    int getpath() const;
    void setdelta(int x);
    int getdelta() const;
    void setdfc(float x);
    float getdfc() const;
    void setsecr(int x);
    int getsecr() const;
    void sethp(float x);
    float gethp() const;
    void setdmg(int x);
    int getdmg() const;
    void setdist(int y);
    int getdist() const;
    void setbatt(int z);
    int getbatt() const;
};
#endif