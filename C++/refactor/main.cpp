#include <iostream>
#include <fstream>
#include <cctype>
#include <signal.h>
#include <vector>
#include "text.h"
#include "enemy.h"
#include "map.h"
#include "item.h"
#include "player.h"
#include "event.h"
using namespace std;

/* Handles abort signals */
void abrthandler(int sig)
{
	std ::cout << "ALERT: Program received abort signal; calling exit." << endl;
	exit(0);
}
/* Handles segmentation faults, and allows the program to exit normally */
void segvhandler(int sig)
{
	std ::cout << "ALERT: Detected segmentation fault; calling exit." << endl;
	exit(0);
}

/* Handles crtl -c signals, and allows the program to exit normally */
void INThandler(int sig)
{
	char c;
	signal(sig, SIG_IGN);
	std ::cout << "\nALERT: Detected Ctrl -C; Exit the program? (y:yes || n:no)" << '\n';
	do
	{
		std ::cin >> c;
	} while (c != 'y' && c != 'n');
	if (c == 'y')
	{
		exit(0);
	}
	else
	{
		signal(SIGINT, INThandler);
		getchar();
		return;
	}
}



int main()
{
	signal(SIGSEGV, segvhandler);
	signal(SIGABRT, abrthandler);
	signal(SIGINT, INThandler);


    Player *you = new Player();
    GameMap *curentMap = new GameMap();
    return 0;
}