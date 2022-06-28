#ifndef ITEM_H
#define ITEM_H
#include <iostream>
#include "header.h"
using namespace std;
class Item
{
private:
    string name;
    char type = 'n';
    int id = 0;

public:
    Item(int id);
    ~Item();
    // bool empty();
    // bool remove(char c, int value);
    // int size();
    // string itemname(char c, int val);
    // int typepresent(char c);
    // int givenum(char c, int x);
    // bool doeshave(char c, int val);
    // void insert(char type, int val);
};
#endif
