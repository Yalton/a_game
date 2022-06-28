#ifndef TEXT_H
#define TEXT_H
#include "player.h"
using namespace std;

class Text
{
private:
    int id;
    string data;

public:
    /*General Printing Functions, used to deliver information to the player */
    void ascisland(Player *obj);
    void score(Player *obj);
    void death(Player *obj);
    void victory(Player *obj);

    /* ASCI Art Functions uses input files to print ASCI art to the screen */
    void asciwin();
    void asciguardian();
    void asciattack();
    void ascidodge();
    void asciblock();
    void ascigrab();
    void ascitree();
    void asciwell();
    void ascimansion();
    void ascicthulu();
    void ascilighthouse();
    void ascibattlebox();
    void asciwormholebox();
    void ascibatterybox();
    void ascistem();
    void ascimedkit();
    void ascibandage();
    void ascileather();
    void ascichainmail();
    void asciknight();
    void ascibulb();
    void asciknife();
    void ascisword();
    void ascigun();
    void ascishop();
    void ascipirateship();
    void ascikey();
    void ascisiren();
    void asciameoba();
    void ascialligator();
    void ascioldman();
    void ascikali();
    void ascicrabdragon();
    void asciskeletonN();
    void ascisquid();
    void ascipirate();
    void ascicastaway();
    void ascizombie();
    void ascidolphin();
    void ascishark();
    void ascibox();
    void ascilobster();
    void asciskeleton();
    void asciwraith();
};
#endif