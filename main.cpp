#include <iostream>
#include "player.h"
#include <fstream>
#include <cctype>
#include "event.h"
#include <signal.h>
#include <vector>
using namespace std;

/* Random number function, to generate one value because I am garbage*/
int randnum(int a, int b)
{
	int x = 0;
	for (int i = 0; i < 100500; i++)
	{
		x = rand() % b + a;
	}
	if (x > b)
	{
		return randnum(a, b);
	}
	else
	{
		return x;
	}
}

/* Hanles abort signals */
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
//Function to print island asci art, and text that starts the game.
void ascisland(Player *obj)
{
	ifstream island("ASCI/island.txt");
	std ::cout << island.rdbuf();
	std ::cout << '\n';
	std ::cout << '\n';
	std ::cout << '\n';
	std ::cout << "You wake up to find youself alone on an island in the middle of the ocean.You can see a cruise ship on the horizon. " << '\n';
	std ::cout << '\n';
	std ::cout << "Attached the the island are three paths all going in the direction on the ship. No one path seems better than any other, which path will you choose?" << '\n';
}

/*Score function, Runs whenever the player dies/wins, IE when the game exits normally. */
void score(Player *obj)
{
	std ::cout << "\n         ||Score||         " << '\n';
	std ::cout << "===========================" << '\n';
	std ::cout << "# of Items: " << obj->size() << '\n';
	std ::cout << "# of Batteries: " << obj->getbatt() << '\n';
	std ::cout << "Distance Traveled: " << obj->getdelta() << '\n';
	if (obj->getsecr() != 1)
		std ::cout << "*Found a Secret*" << '\n';
	std ::cout << "===========================" << '\n';
	exit(1);
}

/* Death Fumction, runs when player hp has fallen to or below 0 */
void death(Player *obj)
{
	ifstream death("ASCI/death.txt");
	std ::cout << death.rdbuf();
	std ::cout << "\nYou crawl across the sand,no longer able to go on,your hands and feet bloodied from your journey; you feel the life slowly drain from your body as the sun beats down on you and the waves lap at the shore." << '\n';
	score(obj);
}

/* Victory function, runs when they player wins*/
void victory(Player *obj)
{
	ifstream victory("ASCI/victory.txt");
	std ::cout << victory.rdbuf();
	score(obj);
}

int main()
{
	//Signal Handlers
	signal(SIGSEGV, segvhandler);
	signal(SIGABRT, abrthandler);
	signal(SIGINT, INThandler);
	//Create two pointers to custom objects.
	Player *you = new Player();
	vector<Event *> evn;
	//Populate a vector with three new Events
	for (int i = 0; i < 3; i++)
		evn.push_back(new Event());

	int numpath,loops,updater = 0;
	int unpath[2] = {0};
	srand(time(0));
	you->setdist(randnum(20, 32));
	//Print island for player
	ascisland(you);
	//Gets path choice from player
	std ::cout << "Path 1,2,or 3?:";
	do
	{
		std ::cin >> numpath;
		std ::cin.clear(); //Clear possible error value of cin
		std ::cin.ignore(100, '\n');
	} while (numpath != 1 && numpath != 2 && numpath != 3);
	std ::cout << '\n';
	//Sets the players path variable to be whatever they chose
	you->setpath(numpath);
	//Builds all three paths
	for (int i = 0; i < 3; i++)
		evn[i]->buildpath(you);
	//Prints path for choice
	if (DEBUG)
	{
		std ::cout << "[Main]DEBUG:Calling print for Path # " << you->getpath() << "." << '\n';
		evn[you->getpath() - 1]->print();
	}
	/*Main loop of game, reroutes to all extranous functions from here, and all functions return to this loop*/
	do
	{
		//Assign unused paths to unpath
		switch (you->getpath())
		{
		case 1:
			unpath[0] = 2;
			unpath[1] = 3;
			break;
		case 2:
			unpath[0] = 1;
			unpath[1] = 3;
			break;
		case 3:
			unpath[0] = 2;
			unpath[1] = 1;
			break;
		}
		//Debug statement to update
		if (DEBUG)
		{
			std ::cout << "\n[Main]DEBUG: In main loop of game. Distance traveled is " << you->getdelta() << " Path is #" << you->getpath() << " Unused path 1 is # " << unpath[0] << " Unused path 2 is # " << unpath[1] << " Event ID is " << evn[you->getpath() - 1]->getevt() << " Distance value is " << evn[you->getpath() - 1]->getdist() << '\n';
		}

		//If player is still alive (and has not gained the opportunity to switch paths) this block will run
		if (updater == 0)
		{
			//Stores the return value of eventable in updater, updater will tell main if there have been in changes in event.cpp
			if (DEBUG)
				std ::cout << "[Main]DEBUG:In main, Entering eventable for path # " << you->getpath() << "." << '\n';
			updater = evn[you->getpath() - 1]->eventable(evn[you->getpath() - 1]->getevt(), you);
			you->setdelta(you->getdelta() + 1);
			//you->setdist(evn[numpath - 1]->getdist());
		}
		//If the player has been detected as "dead" then this block will run
		else if (updater == -1)
		{
			//Calls death function, which subsequently ends the game
			if (you->gethp() <= 0)
			{
				death(you);
			}
			//Error handling if there are any discrepencies between what main sees and what everything else sees
			else
			{
				std ::cerr << "[Main]ERROR: Event reported player as dead, main reported as alive. Cannot compute value in superposition. Aborting program" << '\n';
				exit(1);
			}
		}
		else if (updater == 1)
		{
			victory(you);
		}
		else
		{
			std ::cerr << "[Main]ERROR:Improper value returned from eventable. Killing program." << '\n';
			exit(1);
		}

		//Brings the unused paths up to the current distance value.
		if ((evn[unpath[0] - 1]->getdist()) > (evn[you->getpath() - 1]->getdist()))
		{
			evn[unpath[0] - 1]->ghostnext(you, (evn[you->getpath() - 1])->getdist());
		}

		if ((evn[unpath[1] - 1]->getdist()) > (evn[you->getpath() - 1]->getdist()))
		{
			evn[unpath[1] - 1]->ghostnext(you, (evn[you->getpath() - 1])->getdist());
		}
		loops++;
//Loop that keeps play in game while the list is not empty
	} while (evn[you->getpath() - 1]->empty() != 1 && loops < MAX_LOOP);
	if(loops == MAX_LOOP)
	{
		cerr <<"ERROR:Loop in main exceeded MAX_LOOP, killing program." << '\n'; 
		exit(1); 
	}
	
	std ::cerr << "[Main]ERROR: Pointer made it to the end of main" << '\n';
	return 0;
}
