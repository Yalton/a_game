#ifndef HEADER_H
#define HEADER_H
using namespace std;
inline bool DEBUG = 0;
inline int MAX_LOOP = 1000000;

namespace Utilities
{
    /*Creates a random number between a, and b */
    int randn(int a, int b)
    {
        int x = 0;
        for (int i = 0; i < 100500; i++)
        {
            x = rand() % b + a;
        }
        if (x > b || x < a)
        {
            return randn(a, b);
        }
        else
        {
            return x;
        }
    }
}

#endif
