#ifndef ITEM_H
#define ITEM_H
#include "header.h"
using namespace std;
class Item
{
    private:
        char type = 'n';
        int val = 0;

    public:
        Item();
        ~Item();
};
#endif
