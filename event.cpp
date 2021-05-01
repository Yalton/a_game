#include <iostream>
#include "player.h"
#include "event.h"
#include "header.h"
#include <iomanip>
#include <cstdlib>
#include <assert.h>
#include <fstream>
using namespace std;

/* ASCI Art Functions uses input files to print ASCI art to the screen */
void asciwin()
{
	ifstream win("ASCI/win.txt");
	std ::cout << win.rdbuf();
}
void asciguardian()
{
	ifstream guardian("ASCI/guardian.txt");
	std ::cout << guardian.rdbuf();
}
void asciattack()
{
	ifstream attack("ASCI/attack.txt");
	std ::cout << attack.rdbuf();
}
void ascidodge()
{
	ifstream dodge("ASCI/dodge.txt");
	std ::cout << dodge.rdbuf();
}
void asciblock()
{
	ifstream blk("ASCI/block.txt");
	std ::cout << blk.rdbuf();
}
void ascigrab()
{
	ifstream grab("ASCI/grab.txt");
	std ::cout << grab.rdbuf();
}
void ascitree()
{
	ifstream tree("ASCI/tree.txt");
	std ::cout << tree.rdbuf();
}
void asciwell()
{
	ifstream well("ASCI/well.txt");
	std ::cout << well.rdbuf();
}
void ascimansion()
{
	ifstream mansion("ASCI/mansion.txt");
	std ::cout << mansion.rdbuf();
}
void ascicthulu()
{
	ifstream cthulu("ASCI/cthulu.txt");
	std ::cout << cthulu.rdbuf();
}
void ascilighthouse()
{
	ifstream lighthouse("ASCI/lighthouse.txt");
	std ::cout << lighthouse.rdbuf();
}
void ascibattlebox()
{
	ifstream box("ASCI/Sbox3.txt");
	std ::cout << box.rdbuf();
}
void asciwormholebox()
{
	ifstream box("ASCI/Sbox2.txt");
	std ::cout << box.rdbuf();
}
void ascibatterybox()
{
	ifstream box("ASCI/Sbox1.txt");
	std ::cout << box.rdbuf();
}
void ascistem()
{
	ifstream stem("ASCI/ameoba.txt");
	std ::cout << stem.rdbuf();
}
void ascimedkit()
{
	ifstream medkit("ASCI/medkit.txt");
	std ::cout << medkit.rdbuf();
}
void ascibandage()
{
	ifstream bandage("ASCI/bandage.txt");
	std ::cout << bandage.rdbuf();
}
void ascileather()
{
	ifstream leather("ASCI/leather.txt");
	std ::cout << leather.rdbuf();
}
void ascichainmail()
{
	ifstream chain("ASCI/chainmail.txt");
	std ::cout << chain.rdbuf();
}
void asciknight()
{
	ifstream knight("ASCI/knight.txt");
	std ::cout << knight.rdbuf();
}
void ascibulb()
{
	ifstream bulb("ASCI/bulb.txt");
	std ::cout << bulb.rdbuf();
}
void asciknife()
{
	ifstream knife("ASCI/knife.txt");
	std ::cout << knife.rdbuf();
}
void ascisword()
{
	ifstream sword("ASCI/sword.txt");
	std ::cout << sword.rdbuf();
}
void ascigun()
{
	ifstream gun("ASCI/gun.txt");
	std ::cout << gun.rdbuf();
}
void ascishop()
{
	ifstream shop("ASCI/shop.txt");
	std ::cout << shop.rdbuf();
}
void ascipirateship()
{
	ifstream ship("ASCI/pirateship.txt");
	std ::cout << ship.rdbuf();
}
void ascikey()
{
	ifstream key("ASCI/key.txt");
	std ::cout << key.rdbuf();
}
void ascisiren()
{
	ifstream siren("ASCI/siren.txt");
	std ::cout << siren.rdbuf();
}
void asciameoba()
{
	ifstream ameoba("ASCI/ameoba.txt");
	std ::cout << ameoba.rdbuf();
}
void ascialligator()
{
	ifstream alligator("ASCI/alligator.txt");
	std ::cout << alligator.rdbuf();
}
void ascioldman()
{
	ifstream oldman("ASCI/oldman.txt");
	std ::cout << oldman.rdbuf();
}
void ascikali()
{
	ifstream kali("ASCI/kali.txt");
	std ::cout << kali.rdbuf();
}
void ascicrabdragon()
{
	ifstream dragon("ASCI/crabdragon.txt");
	std ::cout << dragon.rdbuf();
}
void asciskeletonN()
{
	ifstream Askeleton("ASCI/Askeleton.txt");
	std ::cout << Askeleton.rdbuf();
}
void ascisquid()
{
	ifstream squid("ASCI/squid.txt");
	std ::cout << squid.rdbuf();
}
void ascipirate()
{
	ifstream pirate("ASCI/pirate.txt");
	std ::cout << pirate.rdbuf();
}
void ascicastaway()
{
	ifstream castaway("ASCI/castaway.txt");
	std ::cout << castaway.rdbuf();
}
void ascizombie()
{
	ifstream zombie("ASCI/zombie.txt");
	std ::cout << zombie.rdbuf();
}
void ascidolphin()
{
	ifstream dolphin("ASCI/dolphin.txt");
	std ::cout << dolphin.rdbuf();
}
void ascishark()
{
	ifstream shark("ASCI/shark.txt");
	std ::cout << shark.rdbuf();
}
void ascibox()
{
	ifstream box("ASCI/box.txt");
	std ::cout << box.rdbuf();
}
void ascilobster()
{
	ifstream lobster("ASCI/lobster.txt");
	std ::cout << lobster.rdbuf();
}
void asciskeleton()
{
	ifstream skeleton("ASCI/skeleton.txt");
	std ::cout << skeleton.rdbuf();
}
void asciwraith()
{
	ifstream wraith("ASCI/wraith.txt");
	std ::cout << wraith.rdbuf();
}

/* Builds an event object */
Event ::Event()
{
	if (DEBUG)
		std ::cout << "[Event]DEBUG:In Event Constructor" << '\n';
	m_start = NULL;
}

/* Destroys an event list */
Event ::~Event()
{
	if (DEBUG)
		std ::cout << "[Event]DEBUG:In Event Destructor" << '\n';
	Path *tmp = NULL;
	while (m_start)
	{
		tmp = m_start;
		m_start = m_start->m_next;
		delete tmp;
	}
}

/*Creates a random number between a, and b */
int randn(int a, int b)
{
	int x = 0;
	for (int i = 0; i < 100500; i++)
	{
		x = rand() % b + a;
	}
	if (x > b)
	{
		return randn(a, b);
	}
	else
	{
		return x;
	}
}

/*Returns true if the list of path objects is empty*/
bool Event ::empty()
{
	if (m_start == NULL)
	{
		return true;
	}
	else
	{
		return false;
	}
}

/*Returns distance of current path object*/
int Event ::getdist()
{
	assert(m_start != NULL);
	return m_start->m_dist;
}

/*Returns event value of current path object*/
int Event ::getevt()
{
	assert(m_start != NULL);
	return m_start->m_evt;
}

/*Builds a path, uses randomization to set the event and weather values. */
void Event::buildpath(Player *obj)
{
	assert(m_start == NULL);
	srand(time(0));
	int dest = 0;
	int weath = 1;
	int avgweath = randn(3, 5);
	int avg = randn(1, 3);
	//obj->setdist(randn(20, 32));
	int end = obj->getdist();
	if (DEBUG)
		std ::cout << "[Event]DEBUG: Building Path; avg val:" << avg << '\n';

	//Adds first object to the list with event value for start()
	m_start = new Path(end, -1, weath, m_start);
	Path *cur = NULL;
	cur = m_start;

	while (dest < obj->getdist())
	{
		//Decides weather value based on avgweath, simillar to the avg variable for events, but for weather values instead
		if (avgweath == 0)
		{
			if (dest > (obj->getdist()) / 2)
			{
				weath = randn(1, 2);
			}
			else
			{
				weath = randn(1, 3);
			}
			avgweath = randn(3, 5);
		}
		//If avg variable has been decremented to zero IE if the average distance between two events has been reached, this block runs
		if (avg == 0)
		{
			if (DEBUG)
				std ::cout << "[Event]DEBUG: Adding Node WITH an event. Distance is:" << dest << '\n';
			//Adds path objects with event values between 2 and 9, lower difficulty events.
			if (dest == 0)
			{
				cur->m_next = new Path(dest, -2, weath, cur->m_next);
			}
			else if (dest > (obj->getdist() / 2))
			{

				cur->m_next = new Path(dest, randn(2, 10), weath, cur->m_next);
			}
			//Adds path objects with event values between 2 and 20, higher difficult events.
			else
			{
				cur->m_next = new Path(dest, randn(2, 20), weath, cur->m_next);
			}
			avg = randn(1, 3);
		}
		//Adds a path object to the list with the default event value of 1
		else
		{
			if (DEBUG)
				std ::cout << "[Event]DEBUG: Adding node, Distance is:" << dest << '\n';
			if (dest == 0)
			{
				cur->m_next = new Path(dest, -2, weath, cur->m_next);
			}
			else
			{
				cur->m_next = new Path(dest, 1, weath, cur->m_next);
			}
		}

		dest = dest + 1;
		avg = avg - 1;
		avgweath = avgweath - 1;
	}
	if (DEBUG)
		std ::cout << "[Event]DEBUG: Path built:" << cur->m_dist << '\n';
}

/*Prints given path, should never be called outside of a debug enviorenment */
void Event ::print()
{
	std ::cout << "==========================" << '\n';
	std ::cout << "       Printing path      " << '\n';
	std ::cout << "==========================" << '\n';
	if (m_start == NULL)
	{
		std ::cerr << "ERROR:List is empty" << '\n';
	}
	else
	{
		Path *tmp;
		tmp = m_start;
		while (tmp != NULL)
		{
			std ::cout << "Distance:" << tmp->m_dist;
			std ::cout << " Event:" << tmp->m_evt;
			std ::cout << " Weather:" << tmp->m_weath << '\n';
			tmp = tmp->m_next;
		}
	}
	std ::cout << "==========================" << '\n';
	std ::cout << "        Path Printed      " << '\n';
	std ::cout << "==========================" << '\n';
}

/*Monster info table, takes in Id and returns a structs with the correct data. */
Event ::monster Event ::monstinfo(int id)
{
	if (DEBUG)
		std ::cout << "[Event]DEBUG: Entering monsterinfo function." << '\n';
	Event ::monster guy;

	switch (id)
	{
	case 1:
		guy.hp = 3;
		guy.dmg = 2;
		ascilobster();
		guy.name = "King Crab";
		break;
	case 2:
		guy.hp = 5;
		guy.dmg = 3;
		ascipirate();
		guy.name = "Pirate";
		break;
	case 3:
		guy.hp = 8;
		guy.dmg = 2;
		ascicastaway();
		guy.name = "Mad Castaway";
		break;
	case 4:
		ascialligator();
		guy.name = "Alligator";
		guy.hp = 5;
		guy.dmg = 6;
		break;
	case 5:
		guy.hp = 4;
		guy.dmg = 4;
		asciskeleton();
		guy.name = "Skeleton";
		break;
	case 6:
		asciameoba();
		guy.hp = 4;
		guy.dmg = 6;
		guy.name = "Giant Ameoba";
		break;
	case 7:
		ascisiren();
		guy.hp = 7;
		guy.dmg = 4;
		guy.name = "Siren";
		break;
	case 8:
		guy.hp = 6;
		guy.dmg = 4;
		ascisquid();
		guy.name = "Giant Squid";
		break;
	case 9:
		guy.hp = 8;
		guy.dmg = 3;
		ascizombie();
		guy.name = "Zombie";
		break;
	case 10:
		guy.hp = 6;
		guy.dmg = 5;
		asciwraith();
		guy.name = "Wraith";
		break;
	case 11:
		guy.hp = 10;
		guy.dmg = 5;
		asciskeletonN();
		guy.name = "Skeleton Knight";
		break;
	case 12:
		guy.hp = 15;
		guy.dmg = 8;
		ascicrabdragon();
		guy.name = "Crab Dragon";
		break;
	case 13:
		ascikali();
		guy.hp = 30;
		guy.dmg = 10;
		guy.name = "Kali: Hindu Goddess of Destruction.";
		break;
	case 14:
		ascioldman();
		guy.name = "Old Man";
		guy.hp = 7;
		guy.dmg = 3;
		break;
	case 20:
		asciguardian();
		guy.hp = randn(16, 22);
		guy.dmg = randn(4, 6);
		guy.name = "Endellos, Guardian of the ship";
		break;
	case 999:
		ascicthulu();
		guy.name = "Cthulu, Great Old One, Dreamer of R'yleh";
		guy.hp = 100000;
		guy.dmg = 1000;
		break;
	default:
		std ::cerr << "ERROR: In monstinfo, monster Id passed in does not exist" << '\n';
		exit(1);
		break;
	}
	return guy;
}

/* Buffer function to stop the program from throwing an insane amount of text at the player, asks the player to enter any key and displays a different message depending on arguments */
void buffer(char exp)
{
	char buff;
	cin.clear();
	switch (exp)
	{
	case '.':
		cout << "Continue. (Any key)" << '\n';
		cin >> buff;
		cin.ignore();
		return;
	case '?':
		cout << "Continue? (Any key)" << '\n';
		cin >> buff;
		cin.ignore();
		return;
	case '_':
		cout << "Continue... (Any key)" << '\n';
		cin >> buff;
		cin.ignore();
		return;
	}
}

/* Wormhole function, will carry the player a specified distance foward */
void Event ::wormhole(int x, Player *obj)
{
	for (int i = 0; i < x; i++)
	{
		Path *tmp = m_start;
		m_start = m_start->m_next;
		delete tmp;
	}
	obj->setdelta(obj->getdelta() + x);
}

/* Item effect function, generates the actual effects of the items in game. Takes in type of item, id, and decides which effect to match them to */
void Event ::itemeffect(char type, int x, Player *obj)
{
	int batt = randn(1, 3);
	int dist = randn(1, 5);
	int enem = randn(1, 12);
	int hpup = randn(1, 3);
	if (DEBUG)
		std ::cout << "[Event]DEBUG: Entering itemeffect function." << '\n';
	switch (type)
	{
	case 'O':
		switch (x)
		{
		case 1:
			asciknife();
			std ::cout << "You take out the knife, your base damage is now 2" << '\n';
			obj->setdmg(2);
			break;
		case 2:
			ascisword();
			std ::cout << "You equip the sword, your base damage is now 3" << '\n';
			obj->setdmg(3);
			break;
		case 3:
			ascigun();
			std ::cout << "You pull out the gun, your base damage is now 5" << '\n';
			obj->setdmg(5);
			break;
		}
		break;
	case 'D':
		switch (x)
		{
		case 1:
			ascileather();
			std ::cout << "You put on the leather shirt, and feel slightly protected (+10% Defence)" << '\n';
			obj->setdfc(.9);
			break;
		case 2:
			ascichainmail();
			std ::cout << "You put on the chain mail, and feel much more protected. (+40% Defence)" << '\n';
			obj->setdfc(.6);
			break;
		case 3:
			asciknight();
			std ::cout << "Taking your time to put on the knight armor piece by piece, and with each part of the whole you feel more and more untouchable. (80% Defense). " << '\n';
			obj->setdfc(.2);
			break;
		}
		break;
	case 'H':
		switch (x)
		{
		case 1:
			ascibandage();
			std ::cout << "You use the bandage on your wounds, and feel slightly better. (+" << hpup << "hp)" << '\n';
			obj->sethp(obj->gethp() + hpup);
			obj->remove('H', 1);
			break;
		case 2:
			ascimedkit();
			std ::cout << "The medkit has a plethora of healing items for you to choose from. Almost every wound you had can be mended now. (+5hp)." << '\n';
			obj->remove('H', 2);
			obj->sethp(obj->gethp() + 5);
			break;
		case 3:
			ascistem();
			std ::cout << "The Stem Cells ooze over your body, filling in your wounds and making you healthier than ever before. (hp x 2)" << '\n';
			obj->remove('H', 3);
			obj->sethp(obj->gethp() * 2);
			break;
		}
		break;
	case 'S':
		switch (x)
		{
		case 1:
			ascibatterybox();
			obj->setbatt(obj->getbatt() + batt);
			std ::cout << "You open up the Battery Box, and see it contains " << batt << " batteries! Your total number of batteries is now " << obj->getbatt() << "." << '\n';
			obj->remove('S', 1);
			break;

		case 2:
			std ::cout << "You open the mystery box, and inside of it ";
			getitem(obj);
			obj->remove('S', 2);
			break;
		case 3:
			asciwormholebox();
			wormhole(dist, obj);
			std ::cout << "You hesistate at first, and then open the Wormhole box. Instantly the box pulls you into itself, you think you will be crushed inside, however instead of hitting the bottom of the box, you came out of another box " << dist << " kilometers closer to the ship!" << '\n';
			obj->remove('S', 3);
			break;
		case 4:
			ascibattlebox();
			std ::cout << "You pry open the battle box, and within it you sense a sisister entity. The entity became aware of you, and clawed its way out of the box" << '\n';
			battle(obj, enem);
			obj->remove('S', 4);
			break;
		case 5:
			int chance = randn(1, 50);
			int newpath = 0;
			switch (obj->getpath())
			{
			case 1:
				if (chance > 25)
				{
					newpath = 2;
				}
				else
				{
					newpath = 3;
				}
				break;
			case 2:
				if (chance > 25)
				{
					newpath = 3;
				}
				else
				{
					newpath = 1;
				}
				break;
			case 3:
				if (chance > 25)
				{
					newpath = 1;
				}
				else
				{
					newpath = 2;
				}
				break;
			}
			std ::cout << "You open up the path switcher, and inside of you see a new destiation very similar to your own. The switcher pulls you into itself, and rather than your body being crushed inside of the box, you find yourself on a new path, path # " << newpath << "." << '\n';
			obj->setpath(newpath);
			obj->remove('S', 5);
			break;
		}
		break;
	default:
		std ::cerr << "ERROR: Trying to get an effect for a non-existent item. Values passed in || Type: " << type << " || Id: " << x << "." << '\n';
		break;
	}
}

/*Takes in item type and player object, uses them to ask the player which item they would like to use of that type. */
int Event ::useitem(char type, Player *obj)
{
	if (DEBUG)
		std ::cout << "[Event]DEBUG: Entering useitem function. Type: " << type << "." << '\n';
	int num = 0;
	assert(obj->empty() == 0);

	//Decides how large of an item pool it has to search through, for all types except 'S' the size of that pool is 3.
	if (type == 'S')
	{
		num = 5;
	}
	else
	{
		num = 3;
	}
	int itemnum[6];
	for (int i = 1; i < 6; i++)
		itemnum[i] = 0;

	//Saves number of items based on Id to itemnum[]. EX: if a player has 3 items with Id 2, then itemnum[2] == 3.
	for (int i = 1; i < num + 1; i++)
	{

		if (obj->doeshave(type, i))
		{
			itemnum[i] = obj->givenum(type, i);
		}
	}
	//Prints the items of given type the player has
	for (int i = 1; i < num + 1; i++)
	{

		if (obj->doeshave(type, i))
		{
			std ::cout << "You have " << itemnum[i] << " : " << obj->itemname(type, i) << "." << '\n';
		}
	}
	int choice = -1;
	//Prints items player has and their respective Id's, Gets Item Id choice from player
	do
	{
		std ::cout << "Which item would you like to use?" << '\n';
		for (int i = 1; i < num + 1; i++)
		{
			if (itemnum[i] > 0)
			{
				std ::cout << i << ": " << obj->itemname(type, i) << ", ";
			}
		}
		std ::cout << "or 0: none." << '\n';
		cin >> choice;
		//Loop that checks every item in itemnum[] too make sure player selected an Id they in fact have.
		for (int i = 0; i < num + 1; i++)
		{
			if (choice == i)
			{
				if (itemnum[i] == 0)
				{
					std ::cout << "You do not have any " << obj->itemname(type, i) << "." << '\n';
					choice = -1;
				}
			}
		}

	} while (choice != 1 && choice != 2 && choice != 3 && choice != 4 && choice != 5 && choice != 0);
	itemeffect(type, choice, obj);
	return choice;
}

/* Prompt item function, prompts the player to use an item of a given type */
int Event ::promptitem(Player *obj, char type)
{
	if (DEBUG)
		std ::cout << "[Event]DEBUG:Entering Prompt item function for type " << type << "." << '\n';
	char c;
	if (obj->typepresent(type) > 0)
	{
		do
		{
			std ::cout << "You have ";
			switch (type)
			{
			case 'O':
				std ::cout << "weapons";
				break;
			case 'D':
				std ::cout << "armor";
				break;
			case 'S':
				std ::cout << "special items";
				break;
			case 'H':
				std ::cout << "healing items";
				break;
			}
			std ::cout << " available, View them? (y:yes || n: no)" << '\n';
			cin >> c;
		} while (c != 'y' && c != 'n');

		//Sends Player to useitem function, returns item they chose to calling function.
		if (c == 'y')
		{
			return useitem(type, obj);
		}
		else if (c == 'n')
		{
			return 0;
		}
	}
	return -1;
}

/* "AI" Function */
int enemyai(int adv);
int enemyai(int adv)
{
	int chance = randn(1, 100);
	switch (adv)
	{
	case -1:
		if (chance > 65)
		{
			return 1;
		}
		else if (chance < 65 && chance > 30)
		{
			return 4;
		}
		else if (chance < 30 && chance > 15)
		{
			return 2;
		}
		else
		{
			return 3;
		}
		break;
	case 0:
		if (chance > 75)
		{
			return 1;
		}
		else if (chance < 75 && chance > 50)
		{
			return 2;
		}
		else if (chance < 50 && chance > 25)
		{
			return 3;
		}
		else
		{
			return 4;
		}
		break;
	case 1:
		if (chance > 65)
		{
			return 2;
		}
		else if (chance < 65 && chance > 30)
		{
			return 3;
		}
		else if (chance < 30 && chance > 15)
		{
			return 1;
		}
		else
		{
			return 4;
		}
		break;
	default:
		std ::cerr << "ERROR: In enemy AI function. Adv value passed in invalid, ending program" << '\n';
		exit(1);
		break;
	}
	return 0;
}

/* Battle function, uses player obj and current weath value to determine enemy type and stats */
void Event ::battle(Player *obj, int Id)
{
	if (DEBUG)
		std ::cout << "[Event]DEBUG: Entering battle function." << '\n';
	int weathr = m_start->m_weath;
	int adv = 0;
	int enemove = 0;
	char buf;
	int Oitem, Ditem = 0;
	obj->setdmg(1);
	obj->setdfc(1);
	monster guy;
	monster *monst;
	string c = "none";

	//Picks monster based on current weather type

	if (Id == 0)
	{
		if (weathr == 1)
		{
			guy = monstinfo(randn(1, 4));
		}
		else if (weathr == 2)
		{
			guy = monstinfo(randn(5, 8));
		}
		else
		{
			guy = monstinfo(randn(9, 12));
		}
	}
	else
	{
		guy = monstinfo(Id);
	}

	monst = &guy;

	//Text to prompt item search
	std ::cout << "A " << monst->name << " jumps out at, there is no way they are letting you past." << '\n';
	std ::cout << "The " << monst->name << " has " << monst->hp << " health, and " << monst->dmg << " damage" << '\n';
	std ::cout << "You frantically search your pockets, trying to find something to help you fight the " << monst->name << "." << '\n';

	//Prompts the player to use either offensive or defensive items.
	Oitem = promptitem(obj, 'O');
	Ditem = promptitem(obj, 'D');
	//Actual battle loop

	do
	{
		c = "none";
		//Messages to tell player what their current advantage value is
		if (adv == 0)
		{
			enemove = enemyai(adv);
			std ::cout << "You and the " << monst->name << " stare eachother down, no one is making a move yet." << '\n';
		}
		else if (adv == 1)
		{
			enemove = enemyai(adv);
			std ::cout << "The " << monst->name << " stumbles backwards; now is the time to attack." << '\n';
		}
		else
		{
			enemove = enemyai(adv);
			std ::cout << "You stumble backwards, and the " << monst->name << " moves in." << '\n';
		}

		//promptitem(obj, 'H');
		//Loop to get battle action from player
		std ::cout << "\n################" << '\n';
		std ::cout << "Your HP: " << obj->gethp() << '\n';
		std ::cout << "################" << '\n';

		std ::cout << "\n################" << '\n';
		std ::cout << monst->name << " HP: " << monst->hp << '\n';
		std ::cout << "################" << '\n';

		std ::cout << "\nWhat will you do; attack, grab, dodge, block, or use_item?" << '\n';
		do
		{
			getline(cin, c);
		} while (c != "attack" && c != "dodge" && c != "block" && c != "grab" && c != "use_item");
		//Calls Decider function for attack, and a random battle action for enemy
		if (c == "attack")
		{
			adv = Decider(1, enemove, adv, obj->getdmg(), obj, monst);
		}
		//Calls Decider function for block, and a random battle action for enemy
		else if (c == "block")
		{
			adv = Decider(2, enemove, adv, obj->getdmg(), obj, monst);
		}
		//Calls Decider function for dodge, and a random battle action for enemy
		else if (c == "dodge")
		{
			adv = Decider(3, enemove, adv, obj->getdmg(), obj, monst);
		}
		else if (c == "grab")
		{
			adv = Decider(4, enemove, adv, obj->getdmg(), obj, monst);
		}
		else if (c == "use_item")
		{
			if (promptitem(obj, 'H') == -1)
			{
				cout << "You have no items you could use right now." << '\n';
				buffer('.');
				cin >> buf;
			}
		}

	} while (monst->hp > 0 && obj->gethp() > 0);

	//Block that will run after player or enemy hp = 0
	if (obj->gethp() <= 0)
	{
		std ::cout << "The " << monst->name << " knocks you to the ground, you struggle to get up, but are too weak to do anything but lie there. They move in for the killing blow, and all you can do is close your eyes" << '\n';
		buffer('.');
		cin >> buf;
		return;
	}

	//If monster is dead and player is not
	if (monst->hp < 0 && obj->gethp() > 0)
	{
		asciwin();
		int chance = randn(1, 50);
		std ::cout << "\nThe " << monst->name << " falls beaten to the ground, You have won this encounter." << '\n';
		// 50/50 Chance that the player will find 1-3 batteries after an encounter
		if (chance > 35)
		{
			char type;
			int id = 0;
			genranditem(type, id);
			cout << "You notice that the defeated " << monst->name << " was carrying a/an " << obj->itemname(type, id) << "!" << '\n';
			obj->insert(type, id);
		}
		else if (chance > 15 && chance < 35)
		{
			int batts = randn(1, 4);
			std ::cout << "Much to your suprise, you also notice the " << monst->name << " had " << batts << " batteries, so you take them for yourself!" << '\n';
			obj->setbatt(obj->getbatt() + batts);
			buffer('.');
			cin >> buf;
		}

		//Block that runs if you chose an offensive item
		if (Oitem > 0)
		{
			int luck = randn(1, 100);
			//"Breaks" your weapon, removes it from the list
			if (luck < 20)
			{
				std ::cout << "You stand next to the fallen " << monst->name << ". Your pride swells, but as you go to put your " << obj->itemname('O', Oitem) << " you notice to your dismay that is has broken." << '\n';
				buffer('.');
				cin >> buf;
				if (obj->remove('O', Oitem) == 0)
				{
					std ::cerr << "ERROR: Attempting to remove a broken weapon; that does not exist." << '\n';
				}
			}
		}

		//Block that runs if you chose an offensive item
		if (Ditem > 0)
		{
			int luck = randn(1, 100);
			//"Breaks" your armor, removes it from the list.
			if (luck < 20)
			{
				std ::cout << "As you walk away from the fallen " << monst->name << " you notice your " << obj->itemname('D', Ditem) << " has been left in pieces, and it crumbles off your body." << '\n';
				buffer('.');
				cin >> buf;
				if (obj->remove('D', Ditem) == 0)
				{
					std ::cerr << "ERROR: Attempting to remove broken armor, that does not exist." << '\n';
				}
			}
		}
	}
}

/*Decider function, essentially rock paper scissors with two extra variables. */
int Event ::Decider(int umove, int enmove, int adv, int dmg, Player *you, monster *enem)
{
	if (DEBUG)
		std ::cout << "[Event]DEBUG: Entering battle function. umove id:" << umove << " enmove id:" << enmove << " adv id:" << adv << " dmg value:" << dmg << '\n';
	dmg = you->getdmg();
	if (DEBUG)
		std ::cout << "[Event]DEBUG: Entering decider function" << '\n';

	int luck = randn(1, 100);
	switch (umove)
	{
	//Player chose attack
	case 1:
		switch (enmove)
		{
		//Player chose attack || Enemy chose attack
		case 1:
			asciattack();
			switch (adv)
			{
			case -1:
				if (luck > 90)
				{
					std ::cout << "As you struggle to regain your footing; The " << enem->name << " comes at you with its full might, somehow at the last minute you manage to plant your feet and land a blow on the " << enem->name << " dealing " << dmg + 1 << "damage!" << '\n';
					enem->hp = enem->hp - (dmg + 1);
					return 0;
				}
				else
				{
					std ::cout << "The " << enem->name << " charges at your, and you attempt to match its fury with your own, but you cannot recover in time. The " << enem->name << " lands a crushing blow dealing " << enem->dmg + 2 << " damage." << '\n';
					you->damage(enem->dmg + 2);
					return -1;
				}
				break;
			case 0:
				if (luck > 50)
				{
					std ::cout << "You and the " << enem->name << " both go for the attack; luckily you are able to land yours and the " << enem->name << " is not. You deal " << dmg + 1 << " damage!" << '\n';
					enem->hp = enem->hp - (dmg + 1);
					return 0;
				}
				else
				{
					std ::cout << "You ready yourself for the attack, but so does your oppenent. The " << enem->name << " shreds you on approach for " << enem->dmg + 1 << " damage." << '\n';
					you->damage(enem->dmg + 1);
					return -1;
				}
				break;
			case 1:
				if (luck > 20)
				{
					std ::cout << "You attack the dazed " << enem->name << ". They attempt to return the blow, but it is a pitiful attempt at best and you land a crushing blow on the " << enem->name << " for " << dmg + 2 << " damage!" << '\n';
					enem->hp = enem->hp - (dmg + 2);
					return 1;
				}
				else
				{
					std ::cout << "You prepare to hit the stunned " << enem->name << " with your full force, but by some unholy miracle they are able to deflect your attack and land a blow on you for " << enem->dmg - 1 << " damage." << '\n';
					you->damage(enem->dmg - 1);
					return 0;
				}
				break;
			}
			break;
			//Player chose attack || Enemy chose block
		case 2:
			asciblock();
			switch (adv)
			{
			case -1:
				if (luck > 90)
				{
					std ::cout << "Even dazed, you steel your nerves for an attack on the " << enem->name << ". They prepared with a block, but it did not matter, as your attack went straight through their defences, dealing " << dmg + 1 << " damage!" << '\n';
					enem->hp = enem->hp - (dmg + 1);
					return 0;
				}
				else
				{
					std ::cout << "You can hardly see straight, but you still throw out an attack at the " << enem->name << ". They were ready however and deflected your attack, knocking you back once again. " << '\n';
					return -1;
				}
				break;
			case 0:
				if (luck > 60)
				{
					std ::cout << "The " << enem->name << " knows your move, and raises it's defences, but they are not enough, and you are able to land an attack on the " << enem->name << " for " << dmg + 1 << " damage!" << '\n';
					enem->hp = enem->hp - (dmg + 1);
					return 0;
				}
				else
				{
					std ::cout << "You throw out an attack in an instant, but the " << enem->name << " is able to react in time, blocking your attack" << '\n';
					return 0;
				}
				break;
			case 1:
				if (luck > 30)
				{
					std ::cout << "The stumbling " << enem->name << " tries to raise it's defenses, but it is too slow and you hit it for " << dmg + 1 << " damage!" << '\n';
					enem->hp = enem->hp - (dmg + 1);
					return 0;
				}
				else
				{
					std ::cout << "You ready yourself for the attack, and charge at the " << enem->name << ", but somehow it is able to raise it's defenses at the last possible second, deflecting your attack" << '\n';
					return 0;
				}
				break;
			}

			break;
		////Player chose attack || Enemy chose dodge
		case 3:
			ascidodge();
			switch (adv)
			{
			case -1:
				if (luck > 70)
				{
					std ::cout << "Stunned, and unaware of your surroundings all you can make out is the outline of the " << enem->name << " in front of you. Almost as a reflex you attack it; it attempts to dodge your attack but fails. You hit the " << enem->name << " for " << dmg + 1 << " damage!" << '\n';
					enem->hp = enem->hp - (dmg + 1);
					return 0;
				}
				else
				{
					std ::cout << "Unable to see anything but a blur, you still decide to attack the " << enem->name << " it dodges your attack effortlessly, keeping you on the back foot" << '\n';
					return -1;
				}
				break;
			case 0:
				if (luck > 50)
				{
					std ::cout << "You step towards the " << enem->name << ", and it seems wary of you. You throw out an attack at it, and it tries to dodge you but reacts too slowly. You hit the " << enem->name << " for " << dmg + 1 << '\n';
					enem->hp = enem->hp - (dmg + 1);
					return 0;
				}
				else
				{
					std ::cout << "You charge at the " << enem->name << ", but it is able to see through your moves, and dodges your every attack, leaving you stunned" << '\n';
					return -1;
				}
				break;
			case 1:
				if (luck > 15)
				{
					std ::cout << "Ahead of you lie the " << enem->name << " stumbling and unable to regain its footing. You move in for the attack, and before you do anything, it tries to dodge you. The " << enem->name << " is helpless; taking advantage of this you land a crushing blow dealing " << dmg + 2 << " damage!" << '\n';
					enem->hp = enem->hp - (dmg + 2);
					return 0;
				}
				else
				{
					std ::cout << "You approach the fumbling " << enem->name << " and attack it with everything you have. However it moves out of the way just in time leaving you stunned" << '\n';
					return -1;
				}
				break;
			}
		//Player chose attack || Enemy chose grab
		case 4:
			ascigrab();
			switch (adv)
			{
			case -1:
				if (luck > 60)
				{
					std ::cout << "You stumble away from the " << enem->name << " it approaches you, and grabs at you as you lose your footing. Reflexively you attack it, and by some miracle youre able to hit it for " << dmg << " damage!" << '\n';
					enem->hp = enem->hp - dmg;
					return 0;
				}
				else
				{
					std ::cout << "You try to regain your footing and attack the " << enem->name << " as it approaches, but It grabs you before you can attack. You suffer " << enem->dmg - 1 << " damage." << '\n';
					you->damage(enem->dmg - 1);
					return 0;
				}
				break;
			case 0:
				if (luck > 40)
				{
					std ::cout << "You see the " << enem->name << " approaching, and you know it's going for the grab, you time your attack perfectly and hit the " << enem->name << " for " << dmg << " damage!" << '\n';
					enem->hp = enem->hp - dmg;
					return 0;
				}
				else
				{
					std ::cout << "You ready yourself for the attack, and as the " << enem->name << " comes in you expect an attack, but it caught you off guard and went for the grab. You suffer " << enem->dmg - 1 << " damage." << '\n';
					you->damage(enem->dmg - 1);
					return 0;
				}
				break;
			case 1:
				std ::cout << "You approach the fumbling " << enem->name << " and in it's stupor it tries to grab you. You respond to this by hitting it for " << dmg + 2 << " damage!" << '\n';
				enem->hp = enem->hp - dmg + 2;
				break;
			}

			break;
		}
		break;
		//Player chose block || Enemy chose attack
	case 2:
		switch (enmove)
		{
		case 1:
			asciattack();
			switch (adv)
			{
			case -1:
				if (luck > 70)
				{
					std ::cout << "Your vision blurred, you senses numbed, somehow you manage to block the " << enem->name << "'s attack." << '\n';
					return 0;
				}
				else
				{
					std ::cout << "You see the approach of the " << enem->name << " but you are unable to put up your defenses in time, and they hit you for " << enem->dmg << " damage!" << '\n';
					you->damage(enem->dmg);
					return 0;
				}
				break;
			case 0:
				if (luck > 40)
				{
					std ::cout << "You see the " << enem->name << " approaching, it's clearly ready to attack. You raise your defenses just in time delfecting the blow" << '\n';
					return 0;
				}
				else
				{
					std ::cout << "The " << enem->name << " moves on you faster than you imagined, you try to raise your defense but cannot block the attack in time. You suffer " << enem->dmg << " damage!" << '\n';
					you->damage(enem->dmg);
					return 0;
				}

				break;
			case 1:
				if (luck > 20)
				{
					std ::cout << "The " << enem->name << " struggles to gain its balance, but you knew it would try a hasty attack, and you were able to block it in time." << '\n';
					return 0;
				}
				else
				{
					std ::cout << "The " << enem->name << " cannot see straight and starts flailing about violently. Unfortunately you cannot block all of these attacks and suffer " << enem->dmg - 1 << " damage." << '\n';
					return 0;
				}
				break;
			}

			break;
			//Player chose block || Enemy chose block
		case 2:
			asciblock();
			switch (adv)
			{
			case -1:
				std ::cout << "As you struggle to regain you balance, you decide the best course of action is to block. The " << enem->name << " decided to do the same fearing an attack from you." << '\n';
				return 0;
				break;
			case 0:
				std ::cout << "You and the " << enem->name << " both block at one and other, and you both feel a bit silly afterwards." << '\n';
				return 0;
				break;
			case 1:
				std ::cout << "You see the " << enem->name << " stumbling about aimlessly, and still fear retaliation from it so you decide to block, and so does the " << enem->name << ". You cant help but feel you missed an opportunity" << '\n';
				return 0;
				break;
			}

			break;
			//Player chose block || Enemy chose dodge
		case 3:
			ascidodge();
			switch (adv)
			{
			case -1:
				std ::cout << "In your confused state you decide to shield yourself against whatever the " << enem->name << " might do. However when you regain focus you notice it feared an attack from you and chose to dodge" << '\n';
				return 0;
				break;
			case 0:
				std ::cout << "Before you can even think about it, you block expecting an attack from the " << enem->name << ", but it expected an attack from you aswell and dodged" << '\n';
				return 0;
				break;
			case 1:
				std ::cout << "The " << enem->name << " is still recovering from it's fumble, you approach it and fearing retalitation you block. The " << enem->name << " just rolls away from you, and you feel as though you should have taken advantage of the state it was in" << '\n';
				return 0;
				break;
			}

			break;
		//Player chose block || Enemy chose grab
		case 4:
			ascigrab();
			switch (adv)
			{
			case -1:
				if (luck > 90)
				{
					std ::cout << "You stumble away from the " << enem->name << " and try to block the oncoming grab, and by some miracle it works!" << '\n';
					return 0;
				}
				else
				{
					std ::cout << "You fumble and try to regain your footing, fearing what the " << enem->name << " you decide to block, but the " << enem->name << " went for the grab and broke your guard. You suffer " << enem->dmg << " damage." << '\n';
					you->damage(enem->dmg);
					return 0;
				}
				break;
			case 0:
				if (luck > 80)
				{
					std ::cout << "You block the " << enem->name << "'s grab, and by some miracle your guard hols up!" << '\n';
					return 0;
				}
				else
				{
					std ::cout << "You attempt to block the " << enem->name << "'s grab, and the " << enem->name << " is able to break your guard easily. You suffer " << enem->dmg << " damage" << '\n';
					you->damage(enem->dmg);
					return 0;
				}
				break;
			case 1:
				std ::cout << "You are able to block the " << enem->name << "'s grab as it fumbles away from you, but you wonder if maybe you wasted an opportunity to do some damage." << '\n';
				break;
				break;
			}
			break;
		}
		break;
		//Player chose dodge || Enemy chose attack
	case 3:
		switch (enmove)
		{
		case 1:
			asciattack();
			switch (adv)
			{
			case -1:
				if (luck > 80)
				{
					std ::cout << "You can see but an outline of the " << enem->name << " as it approaches, but at the perfect time you dodge it's attack, leaving it stunned" << '\n';
					return 1;
				}
				else
				{
					std ::cout << "You stumble around, trying to keep from falling over entirely, as the " << enem->name << " approaches. When it attacks you try to dodge, but get hit with a crushing blow. You suffer " << enem->dmg + 2 << " damage." << '\n';
					you->damage(enem->dmg + 2);
					return 0;
				}
				break;
			case 0:
				if (luck > 50)
				{
					std ::cout << "The " << enem->name << " attacks you with all it has, and instead of trying to bear the brunt of it you dodge at the perfect time, leaving it stunned" << '\n';
					return 1;
				}
				else
				{
					std ::cout << "The " << enem->name << " approaches, ready to attack. When the attack comes you try to dodge, but it is too fast. You are left stunned and suffer " << enem->dmg << " damage." << '\n';
					you->damage(enem->dmg);
					return -1;
				}
				break;
			case 1:
				if (luck > 30)
				{
					std ::cout << "You stand adjacent the confused " << enem->name << " and it begins flailing about violently. You dodge just in time" << '\n';
					return 0;
				}
				else
				{
					std ::cout << "You approach the " << enem->name << ", as it stumbles about. However it begins flailing around randomly, and you are unable to dodge in time. You suffer " << enem->dmg - 1 << " damage" << '\n';
				}
				break;
			}

			break;
			//Player chose dodge || Enemy chose block
		case 2:
			asciblock();
			switch (adv)
			{
			case -1:
				std ::cout << "You cannot see straight, and you dont know where the " << enem->name << " is coming from. Instinctively you dodge, and when you regain your senses you notice the " << enem->name << " is blocking, clearly fearing an attack from you" << '\n';
				return 0;
				break;
			case 0:
				std ::cout << "As you and the " << enem->name << " stare eachother down, both unsure of the other's next move. you both play it safe. You deciding to dodge and the " << enem->name << " deciding to block" << '\n';
				return 0;
				break;
			case 1:
				std ::cout << "You see the " << enem->name << " pitifully stumbling around, and still fear an attack, so you dodge, and notice that the " << enem->name << " chose to block, you cant help but feel you missed you chance" << '\n';
				return 0;
				break;
			}

			break;
			//Player chose dodge || Enemy chose dodge
		case 3:
			ascidodge();
			switch (adv)
			{
			case -1:
				std ::cout << "You struggle to regain you balance and roll away, from where you know the " << enem->name << " last was, they too rolled away from you." << '\n';
				return 0;
				break;
			case 0:
				std ::cout << "You lock eyes with the " << enem->name << " you're sure it will attack so you dodge. It was sure you would attack aswell, and also chose to dodge" << '\n';
				return 0;
				break;
			case 1:
				std ::cout << "The " << enem->name << " struggles to regain it's balance, fear in its eyes. You still decide to dodge, and see that the " << enem->name << " chose the same, you cant help but wonder if you missed your chance" << '\n';
				return 0;
				break;
			}
			break;
		//Player chose dodge || Enemy chose grab
		case 4:
			ascigrab();
			switch (adv)
			{
			case -1:
				if (luck > 40)
				{
					std ::cout << "You stumble away from the " << enem->name << " you see it trying to grab you so you roll away at just the right time, leaving it stunned." << '\n';
					return 1;
				}
				else
				{
					std ::cout << "You stumble away from the " << enem->name << " and try to dodge it's grab, but sadly you are too slow and suffer " << enem->dmg - 1 << " damage." << '\n';
					you->damage(enem->dmg - 1);
					return 0;
				}
				break;
			case 0:
				if (luck > 25)
				{
					std ::cout << "The " << enem->name << " ran up to you and attempted to grab you, but you dodged at just the right time leaving it stunned." << '\n';
					return 1;
				}
				else
				{
					std ::cout << "You atttempted to dodge the " << enem->name << "'s grab, but were too slow and suffered " << enem->dmg - 1 << " damage." << '\n';
					you->damage(enem->dmg - 1);
					return 0;
				}

				break;
			case 1:
				std ::cout << "You saw the " << enem->name << " and predicted it would grab, so you went for the dodge and evaded it, but you cant help but feel you should have taken advantage of it'f fumbling" << '\n';
				return 0;
				break;
			}
		default:
			std ::cerr << "ERROR: Passed in non-existent enemy move-Id" << '\n';
			exit(1);
			break;
		}
		break;
	//Player chose grab
	case 4:
		switch (enmove)
		{
		//Player chose grab|| Enemy chose attack
		case 1:
			asciattack();
			switch (adv)
			{
			case -1:
				if (luck > 80)
				{
					std ::cout << "As you fumble about, you can barely make out the hazy outline of the approaching " << enem->name << " but even as it goes for the attack you're able to grab it and deal " << dmg << " damage!" << '\n';
					enem->hp = enem->hp - dmg;
					return 0;
				}
				else
				{
					std ::cout << "As you struggle to regain your footing and grab, the " << enem->name << " attacks you, and deals " << enem->dmg << " damage." << '\n';
					you->damage(enem->dmg);
					return 0;
				}
				break;
			case 0:
				if (luck > 60)
				{
					std ::cout << "The " << enem->name << " runs at you, ready to attack, but luckily your able to grab it on approach and the " << enem->name << " takes " << dmg << " damage!" << '\n';
					enem->hp = enem->hp - dmg;
					return 0;
				}
				else
				{
					std ::cout << "You ready yourself for the " << enem->name << "'s move, but it caught you off guard and went for the attack. You suffer " << enem->dmg << " damage." << '\n';
					you->damage(enem->dmg);
					return 0;
				}
				break;
			case 1:
				if (luck > 40)
				{
					std ::cout << "The " << enem->name << " stumbles away from you aimlessly, hopeless to defend itself. You grab and beat it mercilessly for " << dmg + 2 << " damage!" << '\n';
					enem->hp = enem->hp - (dmg + 2);
					return 0;
				}
				else
				{
					std ::cout << "The " << enem->name << " struggles to regain it's footing, so you go in for the grab and deal " << dmg << " damage!" << '\n';
					enem->hp = enem->hp - dmg;
					return 0;
				}

				break;
			}
			break;
		//Player chose grab || Enemy chose block
		case 2:
			asciblock();
			switch (adv)
			{
			case -1:
				if (luck > 50)
				{
					std ::cout << "As you stumble and fall, you make the determination to take the " << enem->name << " to the ground with you, you grab it through it's block and deal " << dmg << " damage!" << '\n';
					enem->hp = enem->hp - dmg;
					return 0;
				}
				else
				{
					std ::cout << "You fumble about, grabbing at the " << enem->name << ", but sadly it's defenses hold up" << '\n';
					return 0;
				}
				break;
			case 0:
				std ::cout << "You grab at the blocking " << enem->name << " it clearly was not expecting this. You deal " << dmg << " damage!" << '\n';
				enem->hp = enem->hp - dmg;
				return 0;
				break;
			case 1:
				std ::cout << "You approach the stumbling " << enem->name << " it tries to block you, so you go for the grab deal a whopping " << dmg + 3 << " damage!" << '\n';
				enem->hp = enem->hp - (dmg + 3);
				return 0;
				break;
			}
			break;
		//Player chose grab || Enemy chose dodge
		case 3:
			ascidodge();
			switch (adv)
			{
			case -1:
				if (luck > 90)
				{
					std ::cout << "By some miracle, even while fumbling about you were able to grab the " << enem->name << " as it tried to dodge you. The " << enem->name << " takes " << dmg << " damage!" << '\n';
					enem->hp = enem->hp - dmg;
					return 1;
				}
				else
				{
					std ::cout << "You fumble about, grabbing at the " << enem->name << " aimlessly, and it is able to dodge you effortlessly, keeping you stunned." << '\n';
					return -1;
				}
				break;
			case 0:
				if (luck > 80)
				{
					std ::cout << "The " << enem->name << " was able to predict your grab, and dodges you, leaving you stunned" << '\n';
					return -1;
				}
				else
				{
					std ::cout << "You grab at the " << enem->name << " it tries to dodge you but is too slow, you deal " << dmg << " damage!" << '\n';
					enem->hp = enem->hp - dmg;
					return 0;
				}

				break;
			case 1:
				std ::cout << "You grab at the fumbling " << enem->name << " it tries to dodge you hopelessly. You deal " << dmg + 2 << " damage!" << '\n';
				enem->hp = enem->hp - (dmg + 2);
				return 0;
				break;
			}
			break;
		//Player chose grab || Enemy chose grab
		case 4:
			ascigrab();
			switch (adv)
			{
			case -1:
				if (luck > 80)
				{
					std ::cout << "The " << enem->name << " approaches you as you stumble about, someohow you know it is going for a grab amd you are able to land one before it does! You deal " << dmg << " damage!" << '\n';
					enem->hp = enem->hp - dmg;
					return 0;
				}
				else
				{
					std ::cout << "You attempt to grab at the " << enem->name << " in your stupor, but it is able to land its grab and you are not. You suffer " << enem->dmg - 1 << " damage." << '\n';
					you->damage(enem->dmg - 1);
					return 0;
				}
				break;
			case 0:
				if (luck > 50)
				{
					std ::cout << "You and the " << enem->name << " both go for the grab, but you are the succesful one. You deal " << dmg << " damage!" << '\n';
					enem->hp = enem->hp - dmg;
					return 0;
				}
				else
				{
					std ::cout << "You and the " << enem->name << " both go for the grab, but the " << enem->name << " gets you first, you suffer " << enem->dmg - 1 << " damage." << '\n';
					you->damage(enem->dmg - 1);
					return 0;
				}
				break;
			case 1:
				if (luck > 30)
				{
					std ::cout << "You approach the fumbling " << enem->name << " and even while it tries to grab you, you grab it and beat it senseless. You deal " << dmg + 2 << " damage!" << '\n';
					enem->hp = enem->hp - dmg + 2;
					return 0;
				}
				else
				{
					std ::cout << "You approach the fumbling " << enem->name << " and somehow even while nearly collapses it is able to grab you first, and you suffer " << enem->dmg - 1 << " damage." << '\n';
					you->damage(enem->dmg - 1);
					return 0;
				}
				break;
			}
			break;
		}
		break;
	default:
		std ::cerr << "ERROR: Passed in non-existent player move-Id, Id is:" << umove << '\n';
		break;
	}
	return 0;
}

/*Function to give the player a random item, used by the mystery box and others. */

void Event ::getitem(Player *obj)
{
	int luck = randn(1, 100);
	if (luck > 75)
	{
		int iD = randn(1, 3);
		std ::cout << "you found a/an " << obj->itemname('H', iD) << "!" << '\n';
		obj->insert('H', iD);
	}
	else if (luck < 75 && luck > 50)
	{
		int iD = randn(1, 3);
		std ::cout << "you found a/an " << obj->itemname('O', iD) << "!" << '\n';
		obj->insert('O', iD);
	}
	else if (luck < 50 && luck > 25)
	{
		int iD = randn(1, 3);
		std ::cout << "you found a/an " << obj->itemname('D', iD) << "!" << '\n';
		obj->insert('D', iD);
	}
	else
	{
		int iD = randn(1, 5);
		std ::cout << "you found a/an " << obj->itemname('S', iD) << "!" << '\n';
		obj->insert('S', iD);
	}
}

/*Function that runs at start of the game every time, gives the player their starting item */
void Event ::start(Player *obj)
{
	string choice;
	ascibox();
	std ::cout << "As you start down your chosen path, a box appears in front of you. This box is like no other you have seen before, you feel an entity within it, and it's as if the box is asking you something" << '\n';
	std ::cout << "It queries, health, defence, offence, or special?" << '\n';
	do
	{
		getline(cin, choice);
	} while (choice != "health" && choice != "defence" && choice != "offence" && choice != "special");
	int val = 3;
	if (choice == "special")
		val = 5;

	int item = randn(1, val);
	if (choice == "health")
	{
		std ::cout << "You hesitate at first and then respond. 'Health' you say, and without delay the box opens up to reveal a " << obj->itemname('H', item) << ". You reach into the box and grab it. Upon obtaining your " << obj->itemname('H', item) << " the box vanished before your eyes." << '\n';
		obj->insert('H', item);
	}
	else if (choice == "defence")
	{
		std ::cout << "You hesitate at first and then respond. 'defence' you say, and without delay the box opens up to reveal a " << obj->itemname('D', item) << ". You reach into the box and grab it. Upon obtaining your " << obj->itemname('D', item) << " the box vanished before your eyes." << '\n';
		obj->insert('D', item);
	}
	else if (choice == "offence")
	{
		std ::cout << "You hesitate at first and then respond. 'offence' you say, and without delay the box opens up to reveal a " << obj->itemname('O', item) << ". You reach into the box and grab it. Upon obtaining your " << obj->itemname('O', item) << " the box vanished before your eyes." << '\n';
		obj->insert('O', item);
	}
	if (choice == "special")
	{
		std ::cout << "You hesitate at first and then respond. 'special' you say, and without delay the box opens up to reveal a " << obj->itemname('S', item) << ". You reach into the box and grab it. Upon obtaining your " << obj->itemname('S', item) << " the box vanished before your eyes." << '\n';
		obj->insert('S', item);
	}
	next(obj);
	return;
}

//Most common event aside from fog, a chance for the player to catch their breath, use items, see hp and distance etc.
void Event ::unevent(Player *obj)
{
	int chance = randn(1, 50);
	if (obj->gethp() > 6)
	{
		if (chance < 25)
		{
			std ::cout << "You continue towards the ship, you judge it must be " << m_start->m_dist << " kilometers away now. You feel confident about making it to the ship. You take some time to check you pockets." << '\n';
		}
		else
		{
			std ::cout << "As you continue your trek towards the ship, you feel hopeful. You've already travelled " << obj->getdist() - m_start->m_dist << " kilometers, and you know you can keep going" << '\n';
		}
	}
	else
	{
		if (chance < 25)
		{
			std ::cout << "Your body aches, your journey thus far has not been an easy one, and you still have " << m_start->m_dist << " kilometers to go. Your Hp has fallen to " << obj->gethp() << ", and you have " << obj->getbatt() << " batteries for your flashlight left. You hope to muster the strength to continue onwards." << '\n';
		}
		else
		{
			std ::cout << "You walk along the path, slower now as the obstacles have taken a toll on you. You've walked " << obj->getdist() - m_start->m_dist << " kilometers already, and felt every single one. Your health has fallen to " << obj->gethp() << ", and you have " << obj->getbatt() << " batteries remaining. You hope to find something that can lift some of this burden." << '\n';
		}
	}
	if (DEBUG)
		std ::cout << "\n[Event]DEBUG: Health items: " << obj->typepresent('H') << "." << '\n';
	if (DEBUG)
		std ::cout << "\n[Event]DEBUG: Special items: " << obj->typepresent('S') << "." << '\n';
	next(obj);
}

/*The other most common function, and the primary use for batteries, batteries allow this event to change from almost always bad, to sometimes good. */
void Event ::fog(Player *obj)
{
	char c;
	int luck = randn(1, 50);

	std ::cout << "You enter a thick fog, so thick you can hardly see you hands in front of you. You fear what dangers could be lurking in the fog, wholly hidden from view 		 but apt to cause you harm." << '\n';
	std ::cout << "You know your flashlight could cut through this fog easily, but that would mean using a battery." << '\n';

	if (obj->getbatt() > 0)
	{
		do
		{
			std ::cout << "\nDo you wish to use a battery? (y:yes || n:no)";
			cin >> c;
		} while (c != 'y' && c != 'n');
	}
	else
	{
		std ::cout << "\nSadly, you are out of batteries" << '\n';
		c = 'n';
	}
	if (c == 'y')
	{
		obj->setbatt(obj->getbatt() - 1);
		ascibulb();
		if (luck > 15)
		{
			std ::cout << "With your flashlight, you are able to see further into the fog. You see hazy outlines of what could be dangers, and stick to the path of 				least resistance. After what feels like an eternity, you make it through the fog." << '\n';
		}
		else
		{
			int item = randn(1, 3);
			std ::cout << "Using the beam of your flashlight you easily cut through the fog. You see your fear was almost entirely unfounded, as the fog is devoid of any danger. As you continue along you find a " << obj->itemname('H', item) << " on the ground, you know this will be useful later and decide to take it with you." << '\n';
			obj->insert('H', item);
		}
	}
	else if (c == 'n')
	{
		if (luck > 40)
		{
			std ::cout << "You stumble through the fog blindly, terrified by every dark shape. You see things moving in the fog, and hear unholy sounds coming from the depths of it, but by some miracle you manage to make it through." << '\n';
		}
		else if (luck < 40 && luck > 15)
		{
			std ::cout << "Even though you cannot see you way, you trudge forwards. You try to avoid any hazy shape you can make out in the fog, but your caution was not enough." << '\n';
			std ::cout << "Something or someone in the fog attacks you, and you fall unconcious. When you come to the fog has cleared, but your in deep pain. Hp - 3" << '\n';
			obj->sethp(obj->gethp() - 3);
		}
		else
		{
			std ::cout << "You move through the fog, blind and unaware of your surroundings, and the whole time you feel as though you are being watched. You feel as though you can see the edge of the fog, when your paranoia proves to be justified." << '\n';
			battle(obj, 0);
		}
	}
	next(obj);
	return;
}

/* Outcrop function. Player is informed there is an item at the top of an outcropping of varying height. Player can chose to climb it to retrieve item. If player falls they lose Hp proportional to the height they climbed. They can attempt the climb as many times as they want, their chances will change every time */
void Event ::outcrop(Player *obj)
{
	int height = randn(3, 6);
	int itemtype = randn(1, 100);
	int iD = 0;
	char type = 'n';
	if (itemtype > 75)
	{
		iD = randn(1, 3);
		type = 'H';
	}
	else if (itemtype < 75 && itemtype > 50)
	{
		iD = randn(1, 3);
		type = 'O';
	}
	else if (itemtype < 50 && itemtype > 25)
	{
		iD = randn(1, 3);
		type = 'D';
	}
	else
	{
		iD = randn(1, 5);
		type = 'S';
	}
	std ::cout << "You come to a raised rocky outcropping, you judge it might be " << height * 3 << " meters  above sea level." << '\n';
	std ::cout << "You almost just kept on walking were it not for the " << obj->itemname(type, iD) << " you spotted sitting atop the outcropping!" << '\n';
	std ::cout << "You think you can climb up to it, but falling from " << height * 3 << " meters would certainly hurt" << '\n';
	std ::cout << "Would you like to climb up to the " << obj->itemname(type, iD) << "? (y:yes||n:no)" << '\n';
	char c = 'm';
	char climbvar;
	do
	{
		cin >> c;
	} while (c != 'y' && c != 'n');
	if (c == 'y')
	{
		bool fallen = 0;
		int climbluck[height];
		for (int i = 0; i < height; i++)
		{
			climbluck[i] = randn(1, 100);
		}

		for (int i = 0; i < height; i++)
		{
			if (i == 0)
			{
				std ::cout << "You climb up the first three meters with little effort, but you notice the next " << (height - (i + 1)) * 3 << " meters might be more treacherous" << '\n';
			}
			else
			{
				if (climbluck[i] < 20)
				{
					std ::cout << "You climb up, meter after meter, but this outcropping is far from forgiving. You feel your finger slip, and then you plummet " << (i + 1) * 3 << " meters to the ground. (-" << i + 1 << " Hp )" << '\n';
					obj->sethp(obj->gethp() - i);
					fallen = 1;
				}
				else if (climbluck[i] > 20 && climbluck[i] < 60)
				{
					std ::cout << "You climb further up the outcropping, you guess you are now " << i * 3 << " meters off the ground..." << '\n';
				}
				else
				{
					std ::cout << "Your hands find their placement perfectly, and you climb up the rock with ease, and before you realize it you are " << i * 3 << " meters high..." << '\n';
				}
				if (fallen == 0 && obj->gethp() > 0)
				{
					std ::cout << "Continue climbing? (y:yes || n:no)" << '\n';
					do
					{
						cin >> climbvar;
						cin.clear();
					} while (climbvar != 'y' && climbvar != 'n');

					if (climbvar == 'n')
					{
						fallen = 1;
					}
				}
				else if (obj->gethp() <= 0)
				{
					return;
				}
			}
			if (fallen)
			{
				std ::cout << "You sit defeated at the bottom of the outcropping, your mind still on the " << obj->itemname(type, iD) << " at the top." << '\n';
				std ::cout << "You could try for it again, your Hp is at " << obj->gethp() << ", so it might be a risky move." << '\n';
				std ::cout << "Would you like to try again? (y:yes||n:no)" << '\n';
				char redo = 'm';
				do
				{
					cin >> redo;
				} while (redo != 'y' && redo != 'n');

				if (redo == 'y')
				{
					std ::cout << "You wont be beaten that easily, not by a rock that's for sure" << '\n';
					for (int i = 0; i < height; i++)
					{
						climbluck[i] = randn(1, 100);
					}
					i = 0;
					fallen = 0;
				}
				else
				{
					std ::cout << "You decide against giving it another go, you've still got a long ways ahead and cant afford to lose any more health." << '\n';
					i = height;
					break;
				}
			}
		}
		std ::cout << "You made it to the top! You can scarcely believe you were able to make it, but now that your here you are able to claim the " << obj->itemname(type, iD) << " for yourself." << '\n';
		obj->insert(type, iD);
	}
	else
	{
		std ::cout << "You decide it would be best to reserve what Hp you have left, you've got a long road ahead of you and a/an " << obj->itemname(type, iD) << " is not worth the potential injury" << '\n';
	}

	next(obj);
	return;
}

/*Whale bone event, player is given three bones to chose from, only one bone is the right bone, and its randomly assigned. The other two do nothing, and damage the p;ayer respectively. */
void Event ::whalebones(Player *obj)
{
	int x = 0;
	int bones[4];
	for (int i = 1; i < 4; i++)
	{
		bones[i] = 1;
	}
	//bones[3] = 0;
	bool out = 0;
	int luck = randn(1, 99);

	std ::cout << "\nAs you continue onwards, You find your path blocked by a whale skeleton. The only way onwards, is through the whale skeleton.\n You enter pile of giant bones laid out head of you;the skeleton of this leviathan entraps you.\n You see no way to phyically progress through the bones, but you notice there are three bones that seem to bear a large portion of the skeleton's weight." << '\n';
	std ::cout << "You infer that in order to progress you must pull out one of these bones, and hopefully collapse the skeleton in just the right way allowing you to escape.No one bone seems safer than any other; you must only decide which one to start with." << '\n';

	while (out != 1)
	{
		if (DEBUG)
		{
			std ::cout << "[Event]DEBUG: Bone count " << '\n';
			;
			for (int i = 1; i < 4; i++)
				std ::cout << "Bone #" << i << ":" << bones[i] << '\n';
		}
		std ::cout << "Which bone will you pull;";
		for (int i = 1; i < 4; i++)
		{
			if (bones[i] == 1)
			{
				if (bones[i + 1] == 1)
				{
					std ::cout << i << ", ";
				}
				else
				{
					std ::cout << i << "." << '\n';
				}
			}
		}

		do
		{
			cin >> x;
		} while (x != 1 && x != 2 && x != 3);
		switch (x)
		{
		case 1:
			if (bones[1] == 1)
			{
				if (luck < 66)
				{
					std ::cout << "As you pull out the bone, to your utter joy you witness the skeleton perfectly collapsing in front of you, allowing you to exit the whale's bones." << '\n';
					out = 1;
					break;
					//bones[1] = 0;
				}
				else if (luck > 33 && luck < 66)
				{
					std ::cout << "You pull the bone out, at first there is a rumble in the skeleton, and then nothing. It appears this bone was the wrong one." << '\n';
					bones[1] = 0;
				}
				else
				{
					std ::cout << "As you yank the bone out, you are instantly filled with a deep regret. The entirety of the whale skeleton collaspes on you, crushing you beneath it's titanic weight. -4 HP " << '\n';
					obj->sethp(obj->gethp() - 4);
					out = 1;
					break;
					//bones[1] = 0;
				}
			}
			else
			{
				std ::cout << "You have already pulled this bone." << '\n';
			}
			break;
		case 2:
			if (bones[2] == 1)
			{
				if (luck < 66)
				{
					std ::cout << "You pull the bone out, at first there is a rumble in the skeleton, and then nothing. It appears this bone was the wrong one." << '\n';
					bones[2] = 0;
				}
				else if (luck > 33 && luck < 66)
				{
					std ::cout << "As you yank the bone out, you are instantly filled with a deep regret. The entirety of the whale skeleton collaspes on you, crushing you beneath it's titanic weight. -4 HP " << '\n';
					obj->sethp(obj->gethp() - 4);
					out = 1;
					break;
					//bones[2] = 0;
				}
				else
				{
					std ::cout << "As you pull out the bone, to your utter joy you witness the skeleton perfectly collapsing in front of you, allowing you to exit the whale's bones." << '\n';
					out = 1;
					break;
					//bones[2] = 0;
				}
			}
			else
			{
				std ::cout << "You have already pulled this bone." << '\n';
			}
			break;
		case 3:
			if (bones[3] == 1)
			{
				if (luck < 66)
				{
					std ::cout << "As you yank the bone out, you are instantly filled with a deep regret. The entirety of the whale skeleton collaspes on you, crushing you beneath it's titanic weight. -4 HP " << '\n';
					obj->sethp(obj->gethp() - 4);
					out = 1;
					break;
					//bones[3] = 0;
				}
				else if (luck > 33 && luck < 66)
				{
					std ::cout << "As you pull out the bone, to your utter joy you witness the skeleton perfectly collapsing in front of you, allowing you to exit the whale's bones." << '\n';
					out = 1;
					break;
					//bones[3] = 0;
				}
				else
				{
					std ::cout << "You pull the bone out, at first there is a rumble in the skeleton, and then nothing. It appears this bone was the wrong one." << '\n';
					bones[3] = 0;
				}
			}
			else
			{
				std ::cout << "You have already pulled this bone." << '\n';
			}
			break;
		}
	}

	next(obj);
	return;
}

/* Cave event: Player enters a cave, and can use their flashlight to see better (give better chances), and then chooses twice between the path on the right, or the path on the left. Each path has a random chance of something happening inside that room */
void Event ::cave(Player *obj)
{
	std ::cout << "You find you path blocked by a cave, on all sides of the it are water, so the only way forward is through the cave." << '\n';
	std ::cout << "As you enter the cave, darkness envelops you, you can scarcely make out where the walls are. You realize your flashlight would come in very handy here, but that would mean using up a battery." << '\n';
	char c = 'm';
	char buf;
	//Block that runs if player has batteries
	if (obj->getbatt() > 0)
	{
		std ::cout << "Would you like to use a battery? (y:yes||n:no)" << '\n';
		//Prompts player to use a battey
		do
		{
			cin >> c;
		} while (c != 'y' && c != 'n');
	}
	//If player does not have batteries, treats it as if they chose not to use them.
	else
	{
		std ::cout << "Sadly you are all out of batteries." << '\n';
		c = 'n';
	}

	//Player chose to use a battery
	if (c == 'y' && obj->gethp() > 0)
	{
		int length = randn(3, 5);
		int roomluck[length];
		for (int i = 0; i <= length; i++)
			roomluck[i] = 0;

		string choice;
		for (int i = 0; i < length; i++)
		{

			std ::cout << "You enter room # " << i + 1 << " of the cave." << '\n';
			if (roomluck[i] == 0)
			{
				if (DEBUG)
					std ::cout << "[Event]DEBUG:Cave event knows player is in first room, setting luck value to 100" << '\n';
				roomluck[i] = 100;
			}
			else
			{
				if (DEBUG)
					std ::cout << "[Event]DEBUG:In room #" << i + 1 << " luck value is: " << roomluck[i] << '\n';
				//BLocks that run to determine events in each room, dependent on luck value.
				if (roomluck[i] < 20)
				{
					std ::cout << "This room is empty, there is nothing but cold stone here." << '\n';
				}
				else if (roomluck[i] > 20 && roomluck[i] < 40)
				{
					std ::cout << "This room harbors something, alive. You can't be sure what, but you know it is coming right at you!" << '\n';
					buffer('_');
					cin >> buf;
					battle(obj, 0);
				}
				else if (roomluck[i] > 40 && roomluck[i] < 70)
				{
					std ::cout << "This room has something in the middle.You cannot tell what yet, but it glistens in the beam of your flashlight, " << '\n';
					getitem(obj);
				}
				else
				{
					std ::cout << "This room is full of sharp stallagtites, and stallagmites. Without your flashlight to guide you, you would have surely been hurt" << '\n';
				}
			}
			if (i < length && obj->gethp() > 0)
			{
				std ::cout << "Ahead you see the cave diverges to the right and to the left, which path do you want to take?" << '\n';
				do
				{
					getline(cin, choice);
				} while (choice != "left" && choice != "right");
				if (roomluck[i] > 50)
				{
					//Sets luck for next room
					if (choice == "left")
					{
						roomluck[i + 1] = randn(1, 50);
					}
					else
					{
						roomluck[i + 1] = randn(50, 100);
					}
				}
				else
				{
					//Sets luck for next room
					if (choice == "left")
					{
						roomluck[i + 1] = randn(50, 100);
					}
					else
					{
						roomluck[i + 1] = randn(1, 50);
					}
				}
			}
			else if (obj->gethp() > 0)
			{
				std::cout << "Finally, you see it; the light at the end of the tunnel! You've made it out of the cave with your life" << '\n';
				next(obj);
				return;
			}
			else
			{
				if (DEBUG)
					cout << "[Event]DEBUG:In cave function, player has died." << '\n';
				return;
			}
		}
		if (obj->gethp() > 0)
		{
			std::cout << "Finally, you see it; the light at the end of the tunnel! You've made it out of the cave with your life" << '\n';
			buffer('.');
			cin >> buf;
			next(obj);
			return;
		}
		else
		{
			if (DEBUG)
				cout << "[Event]DEBUG:In cave function, player has died." << '\n';
			return;
		}
	}
	else if (obj->gethp() > 0)
	{
		int length = randn(3, 5);
		int roomluck[length];
		for (int i = 0; i <= length; i++)
			roomluck[i] = 0;

		string choice;
		for (int i = 0; i < length; i++)
		{
			std ::cout << "\nYou enter room # " << i + 1 << " of the cave." << '\n';
			//If player is in the first toom, set their luck to 100
			if (roomluck[i] == 0)
			{
				if (DEBUG)
					std ::cout << "[Event]DEBUG:Cave event knows player is in first room, setting luck value to 100" << '\n';
				roomluck[i] = 100;
			}
			else
			{
				if (DEBUG)
					std ::cout << "[Event]DEBUG:In room #" << i + 1 << " luck value is: " << roomluck[i] << '\n';
				//Blocks that determine what happens in each of the rooms, based on luck value.
				if (roomluck[i] < 25)
				{
					std ::cout << "This room feels emptier than the others, you can hear your every footstep echoing against the cave walls." << '\n';
				}
				else if (roomluck[i] > 25 && roomluck[i] < 50)
				{
					std ::cout << "This room harbors something, alive. You can't be sure what, but you know it is coming right at you!" << '\n';
					buffer('_');
					cin >> buf;
					battle(obj, 0);
				}
				else if (roomluck[i] > 50 && roomluck[i] < 75)
				{
					std ::cout << "You stumble through this room in the darkness, unable to see anything that might harm you, or help you." << '\n';
				}
				else
				{
					int dmg = randn(1, 5);
					std ::cout << "You enter this room, and get cut almost instantly. You cannot be sure what is hurting you so you just keep running frantically trying to find and exit. Your clothes are in tatters, and your body has been broken. (-" << dmg << " Hp)" << '\n';
					obj->sethp(obj->gethp() - dmg);
					buffer('.');
					cin >> buf;
				}
			}
			if (i < length && obj->gethp() > 0)
			{
				std ::cout << "Ahead you can barely make out that the cave diverges to the right and to the left, which path do you want to take?" << '\n';
				do
				{
					getline(cin, choice);
				} while (choice != "left" && choice != "right");
				if (roomluck[i] > 50)
				{
					//Assigns luck values to the next room
					if (choice == "left")
					{
						roomluck[i + 1] = randn(50, 100);
					}
					else
					{
						roomluck[i + 1] = randn(1, 50);
					}
				}
				else
				{
					//Assigns luck values to the next room
					if (choice == "left")
					{
						roomluck[i + 1] = randn(1, 50);
					}
					else
					{
						roomluck[i + 1] = randn(50, 100);
					}
				}
			}
			else if (obj->gethp() > 0)
			{
				std::cout << "Finally, you see it; the light at the end of the tunnel! You've made it out of the cave with your life" << '\n';
				buffer('.');
				cin >> buf;
				next(obj);
				return;
			}
			else
			{
				if (DEBUG)
					cout << "[Event]DEBUG:In cave function, player has died." << '\n';
				return;
			}
		}
		if (obj->gethp() > 0)
		{
			std::cout << "Finally, you see it; the light at the end of the tunnel! You've made it out of the cave with your life" << '\n';
			buffer('.');
			cin >> buf;
			next(obj);
			return;
		}
		else
		{
			if (DEBUG)
				cout << "[Event]DEBUG:In cave function, player has died." << '\n';
			return;
		}
	}
	//Prints to the screen telling the player they have made it out of the cave.
	std ::cout << "\nFinally you see it, the light at the end of the tunnel. At first it blinds you, but when your eyes adjust you're shocked to discover you are actually relieved to be back on the path and out of that cave." << '\n';
	next(obj);
	buffer('.');
	cin >> buf;
	return;
}

/*Simple event that generates a chance for the player to skip some distance by riding on a doplhin, or lose half their health to a shark. Chance is random. */
void Event ::sharkordolphin(Player *obj)
{
	//Luck value
	int luck = randn(1, 100);
	std ::cout << "You come to gap in your path, the gap is filled with water but large enough to jump over. You notice something swimming in the gap however, all you can make out is the fin on it's back." << '\n';
	std ::cout << "From this you conclude the swimming creature must be either a shark, or a dolphin. You know that if you jump in and hitch a ride on a dolphins back, it may take you anywhere from 3 to 6 kilometers closer to the ship. If it is a shark however, it would surely maul you for attempting to ride it." << '\n';
	std ::cout << "Do you wish to risk it? (y:yes||n:no)" << '\n';

	char c = 'o';
	do
	{
		cin >> c;
	} while (c != 'y' && c != 'n');
	//Block that runs if a player decides to risk a shark attack.
	if (c == 'y')
	{
		if (luck > 60)
		{
			ascidolphin();
			int dolphdist = randn(3, 6);

			std ::cout << "Just your luck, it was a dolphin! The dolphin seems overjoyed to see you, and instantly takes off towards the ship with you on it's back." << '\n';
			std ::cout << "The dolphin swims into another gap very similar to the one which you first found it in, and you hop off. You judge it must have take you " << dolphdist << ": kilometers closer!" << '\n';
			wormhole(dolphdist, obj);
			return;
		}
		else
		{
			ascishark();
			obj->sethp((obj->gethp()) / 2);
			std ::cout << "As you jump in, you notice a set of jaws erupting from the water to catch you, and you know you have made a mistake. You fight with the beast for what feels like forever, and when you finally get away you're left with " << obj->gethp() << " hp." << '\n';
			next(obj);
			return;
		}
	}
	//Block that runs if player decides NOT to risk a shark attack
	else
	{
		std ::cout << "You decide it would be safer to just jump over the gap, and continue on foot." << '\n';
		next(obj);
		return;
	}
}

/*Old man event, an old man will ask the player for an item. If they have one, they can chose to give it to him or not. If not he may attack them, if they give it to him he may give them a better one. */

void Event ::oldman(Player *obj)
{
	int luck = randn(1, 100);
	std ::cout << "As you continue along your path, you find an old man sitting along the shore. As you approach you find it hard to discern if he is even alive or dead, but when the old man notices you he gestures weakly for you to approach him closer" << '\n';
	std ::cout << "The old man is not able to speak, but you can tell from his weak gestures that he wants an item" << '\n';

	if (obj->empty() == 0)
	{
		char c = 'm';
		std ::cout << "You do have something you could offer the man; will you give him an item? (y:yes||n:no)" << '\n';

		do
		{
			cin >> c;
		} while (c != 'y' && c != 'n');

		if (c == 'y')
		{
			if (DEBUG)
				std ::cout << "[Event]DEBUG:Chose to give old man item" << '\n';

			char gift = 'N';
			//Checks if player have any health items, if so gives the first in the list to the old man
			if (obj->typepresent('H') > 0)
			{
				int id;
				for (int i = 1; i < 3; i++)
				{
					if (obj->doeshave('H', i))
					{
						id = i;
						i = 3;
					}
				}
				obj->remove('H', id);
				std ::cout << "You gave the old man a/an " << obj->itemname('H', id) << " he seems overjoyed with the gift!" << '\n';
				gift = 'H';
			}
			//Checks if player have any defence items, if so gives the first in the list to the old man
			else if (obj->typepresent('D') > 0)
			{
				int id;
				for (int i = 1; i < 3; i++)
				{
					if (obj->doeshave('D', i))
					{
						id = i;
						i = 3;
					}
				}
				obj->remove('D', id);
				std ::cout << "You gave the old man a/an " << obj->itemname('D', id) << " he seems overjoyed with the gift!" << '\n';
				gift = 'D';
			}
			//Checks if player have any offence items, if so gives the first in the list to the old man
			else if (obj->typepresent('O') > 0)
			{
				int id;
				for (int i = 1; i < 3; i++)
				{
					if (obj->doeshave('O', i))
					{
						id = i;
						i = 3;
					}
				}
				obj->remove('O', id);
				std ::cout << "You gave the old man a/an " << obj->itemname('O', id) << " he seems overjoyed with the gift!" << '\n';
				gift = 'O';
			}
			//Checks if player has any special items, if so gives the first in the list to the old man
			else if (obj->typepresent('S') > 0)
			{
				int id;
				for (int i = 1; i < 5; i++)
				{
					if (obj->doeshave('S', i))
					{
						id = i;
						i = 5;
					}
				}
				obj->remove('S', id);
				std ::cout << "You gave the old man a/an " << obj->itemname('S', id) << " he seems overjoyed with the gift!" << '\n';
				gift = 'S';
			}

			//Block that will sometimes run if player gave the old man an item, he will heal the player  and give them the best item of whatever type they gave him.
			if (luck > 65)
			{
				std ::cout << "The man was so pleased with his gift, he decided to heal you for 5 hp points, and he gave you a/an " << obj->itemname(gift, 3) << "!" << '\n';
				obj->sethp(obj->gethp() + 5);
				obj->insert(gift, 3);
			}
		}
		//Runs if player has items to give, but decided not to share
		else
		{
			if (DEBUG)
				std ::cout << "[Event]DEBUG:Did not give old man an item" << '\n';
			if (luck > 30)
			{
				std ::cout << "Before you can even tell the old man you do not want to give him an item, he gets up abruptly and attacks you" << '\n';
				battle(obj, 14);
			}
			else
			{
				std ::cout << "You tell the man you cannot bear to part with any of your items, as you may need them along the way, he seems dissapointed but understanding." << '\n';
			}
		}
	}
	//Block that runs if player have no items to give the old man (rare)
	else
	{
		std ::cout << "You explain to the man that your pockets are as empty as his; he gives you a pained but understanding gesture, and looks back over the sea. You continue along your way" << '\n';
	}
	next(obj);
	return;
}

/*Tree event; Player can reach into a hole in a tree, and there is a random chance they will either get an item, get the secret key, or enter a battle event. */

void Event ::tree(Player *obj)
{
	//generates luck value
	int luck = randn(1, 50);
	std ::cout << "You come upon a dead tree in the middle of your path. This tree has a large hole in the center of it, and you think there might be something inside." << '\n';
	std ::cout << "Do you want to reach inside? (y:yes || n: no)" << '\n';
	//Loop to get correct player input
	char c = 'm';
	do
	{
		cin >> c;
	} while (c != 'y' && c != 'n');
	if (c == 'y')
	{
		//Determines outcome based on luck variable
		if (luck > 40)
		{
			std ::cout << "You reach into the tree, and to your suprise you feel something inside. When you pull it out you discover you have found a Mysterious Key" << '\n';
			ascikey();
			std ::cout << "\nYou dont know how, but somehow you understand that this key is very important." << '\n';
			obj->insert('S', -1);
		}
		else if (luck < 40 && luck > 25)
		{
			int id = randn(1, 3);
			std ::cout << "You reach into the tree, and fumble around for a while until you feel something. When you pull that something out you notice its a/an " << obj->itemname('O', id) << "!" << '\n';
			obj->insert('O', id);
		}
		else
		{
			std ::cout << "As you reach into the tree, you fee the hole closing faster and faster around your arm. You try to pull it out in time but to no avail, this tree was clearly a trap and you walked right into it" << '\n';
			std ::cout << "You hear someone or something approaching, but cannot make out what it is yet..." << '\n';
			battle(obj, 0);
		}
	}
	else
	{
		std ::cout << "You decide against reaching into the tree, anything could be in there and you dont want to risk it" << '\n';
	}
	next(obj);
	return;
}
char Event ::randitem()
{
	int luck = randn(1, 100);
	if (luck > 75)
	{
		return 'H';
	}
	else if (luck < 75 && luck > 50)
	{
		return 'O';
	}
	else if (luck < 50 && luck > 25)
	{
		return 'D';
	}
	else
	{
		return 'S';
	}
}

/*Shop function: Player can purchase three random items for batteries*/
void Event ::shop(Player *obj)
{
	ascishop();
	char type[3];
	int id[3];
	int prices[3];
	char c = 'm';
	for (int i = 0; i < 3; i++)
	{
		type[i] = randitem();
		if (type[i] == 'S')
		{
			id[i] = randn(1, 5);
			prices[i] = i + randn(1, 3);
		}
		else
		{
			id[i] = randn(1, 3);
			prices[i] = i + randn(1, 2);
		}
	}

	std ::cout << "\nYou approach what seems to be a small shack along the shore." << '\n';
	std ::cout << "When you near the shack you see there is a man inside. He is trying to say something to you, but you cant quite make out what" << '\n';
	std ::cout << "'Hello!' says the man. 'Welcome to my store traveler!" << '\n';
	std ::cout << "The store has 3 items for sale, all items appear to be purchased using batteries." << '\n';
	do
	{
		for (int i = 0; i < 3; i++)
		{
			if (id[i] > 0)
			{
				std ::cout << "Item#" << i + 1 << " is a/an " << obj->itemname(type[i], id[i]) << " for " << prices[i] << " batteries." << '\n';
			}
		}
		std ::cout << "\nDo you want to make a purchase? (1:Item#1 || 2:Item#2 || 3: Item#3 || 0: None)" << '\n';
		int choice = -1;
		do
		{
			cin >> choice;
		} while (choice != 1 && choice != 2 && choice != 3 && choice != 0);
		if (choice == 1)
		{
			if (obj->getbatt() < prices[0])
			{
				std ::cout << "Sadly, you do not have enough batteries to purchase this item" << '\n';
			}
			else if (id[0] == 0)
			{
				std ::cout << "You already purchased this item" << '\n';
			}
			else
			{
				obj->setbatt((obj->getbatt()) - prices[0]);
				obj->insert(type[0], id[0]);
				std ::cout << "You got a/an " << obj->itemname(type[0], id[0]) << "! You have " << obj->getbatt() << " batteries remaining." << '\n';
				id[0] = 0;
			}
		}
		else if (choice == 2)
		{
			if (obj->getbatt() < prices[1])
			{
				std ::cout << "Sadly, you do not have enough batteries to purchase this item" << '\n';
			}
			else if (id[1] == 0)
			{
				std ::cout << "You already purchased this item" << '\n';
			}
			else
			{
				obj->setbatt((obj->getbatt()) - prices[1]);
				obj->insert(type[1], id[1]);
				std ::cout << "You got a/an " << obj->itemname(type[1], id[1]) << "! You have " << obj->getbatt() << " batteries remaining." << '\n';
				id[1] = 0;
			}
		}
		else if (choice == 3)
		{
			if (obj->getbatt() < prices[2])
			{
				std ::cout << "Sadly, you do not have enough batteries to purchase this item" << '\n';
			}
			else if (id[2] == 0)
			{
				std ::cout << "You already purchased this item" << '\n';
			}
			else
			{
				obj->setbatt((obj->getbatt()) - prices[2]);
				obj->insert(type[2], id[2]);
				std ::cout << "You got a/an " << obj->itemname(type[2], id[2]) << "! You have " << obj->getbatt() << " batteries remaining." << '\n';
				id[2] = 0;
			}
		}
		else
		{
			std ::cout << "You choose not to purchase anything, and continue on your way." << '\n';
			c = 'n';
		}
		if (c != 'n')
		{
			std ::cout << "Continue shopping? (y:yes || n:no)" << '\n';
			do
			{
				cin >> c;
			} while (c != 'y' && c != 'n');
		}
	} while (c != 'n');
	next(obj);
	return;
}

void Event ::genranditem(char &type, int &id)
{
	type = randitem();
	switch (type)
	{
	case 'S':
		id = randn(1, 5);
		break;
	default:
		id = randn(1, 3);
		break;
	}
}

/*Lighthouse Function: Player explores a lighthouse of random floor height, each floor has 5 different events that can occur within.  */
void Event ::lighthouse(Player *obj)
{
	bool abom = 0;
	bool done = 0;
	int floors = randn(4, 8);
	char c = 'm';
	char choice = 'm';
	int luck = 0;
	ascilighthouse();
	std ::cout << "\nYou approach what seems to be an abandoned lighthouse. It is at least " << floors << " floors and  " << floors * 10 << " meters tall, and it appears to be in a horrid state of disrepair. Despite all of this, you get the sense that you could find something very useful inside." << '\n';
	std ::cout << "Would you like to enter the lighthouse? (y:yes || n:no)" << '\n';
	do
	{
		cin >> c;
	} while (c != 'y' && c != 'n');
	if (c == 'y')
	{
		int i = 0;
		do
		{
			if (i == 0)
			{
				std ::cout << "You decide to enter the lighthouse; the bottom floor of the lighthouse seemed to infer the whole thing may be dillapidated, and permeated with an overwhelming scent of rot" << '\n';
			}
			else if (i == floors)
			{
				char buf = ' ';
				char type;
				int id = 0;
				genranditem(type, id);
				std ::cout << "\nYou made it to the top of the lighthouse, the view from up here is astounding!" << '\n';
				std ::cout << "You stare at the ocean around you, so entraced you dont even notice the " << obj->itemname(type, id) << " on the ground right next to you!" << '\n';
				buffer('.');
				cin >> buf;
				obj->insert(type, id);
				done = 1;
			}
			else
			{
				std ::cout << "You ascend to floor #" << i << "..." << '\n';
				//The 5 options for what could happen on any given floor.
				if (luck < 20)
				{
					std ::cout << "This room is empty, long since abandoned by any living soul. Cockroaches scurry at your feet as you walk through the room, and you know there cant possibly be anything of value to you here." << '\n';
					luck = randn(1, 100);
				}
				else if (luck > 20 && luck < 40)
				{
					luck = randn(1, 100);
					int chance = randn(1, 99);
					int book = 0;
					std ::cout << "This room is almost empty, with the exception of an oddly pristine bookcase laid up against one of the walls of the room." << '\n';
					std ::cout << "Every other surface in the room is filthy and rotten, but the bookcase looks almost untouched, freshly cleaned even." << '\n';
					std ::cout << "Three books are ajar from the other, and something tells you you need to pull out one of those books, but you are not sure which." << '\n';
					std ::cout << "Which book do you take? (1: Book #1 || 2:Book #2 || 3:Book #3)" << '\n';
					do
					{
						cin >> book;
					} while (book != 1 && book != 2 && book != 3);
					//Book chances
					switch (book)
					{
					case 1:
						if (chance < 33)
						{
							int bat = randn(1, 3);
							obj->setbatt(obj->getbatt() + bat);
							std ::cout << "You pull the book from the shelf, and open it up. Inside you find that the pages have been carved out and someone has stashed " << bat << " batteries) inside!" << '\n';
							std ::cout << "You now have " << obj->getbatt() + bat << "batteries." << '\n';
							std ::cout << "You attempt to place the book back in the bookshelf, and to your suprise you notice the entire thing has vanished." << '\n';
						}
						else if (chance > 33 && chance < 66)
						{
							std ::cout << "You pull the book from the shelf, and open it up. It's an old horror novel, something about strange colors in a well and infected agriculture. You feel a sense of dread wash over you, something horrible is waiting for you here." << '\n';
							abom = 1;
						}
						else
						{
							std ::cout << "You pull the book from the shelf, and open it to find all the pages in the book empty, but at the very end of the book someone left a bandage. Only slightly used, so you decide to patch yourself up.(Hp +1)" << '\n';
							obj->sethp(obj->gethp() + 1);
						}
						break;
					case 2:
						if (chance < 33)
						{
							char type = randitem();
							char id = randn(1, 3);
							std ::cout << "You pull the book from it's shelf, and behind it you find a/an " << obj->itemname(type, id) << "!" << '\n';
							obj->insert(type, id);
						}
						else if (chance > 33 && chance < 66)
						{
							std ::cout << "You pull the book from the shelf, and open it to find all the pages in the book empty, but at the very end of the book someone left a bandage. Only slightly used, so you decide to patch yourself up.(Hp +1)" << '\n';
							obj->sethp(obj->gethp() + 1);
						}
						else
						{
							int dmg = randn(3, 5);
							std ::cout << "You pull the book from the shelf, but upon doing so the entire shelf collapses on top of you,and you fall unconcious. When you come to the bookshelf is no where to be found, but your body aches and you struggle to get up. (Hp -" << dmg << ")" << '\n';
							obj->sethp(obj->gethp() - dmg);
						}
						break;
					case 3:
						if (chance < 33)
						{
							std ::cout << "You pull the book from the shelf, and open it up. It's an old horror novel, something about strange colors in a well and infected agriculture. You feel a sense of dread wash over you, something horrible is waiting for you here." << '\n';
							abom = 1;
						}
						else if (chance > 33 && chance < 66)
						{
							std ::cout << "You pull the book from the shelf, and open it up. The book appears the be a cooking book of some kind, but none of the recipies make any sense. Calling for things like, Pride in one self, and Zest for Life." << '\n';
						}
						else
						{
							int bat = randn(1, 3);
							obj->setbatt(obj->getbatt() + bat);
							std ::cout << "You pull the book from the shelf, and open it up. Inside you find that the pages have been carved out and someone has stashed " << bat << " batteries) inside!" << '\n';
							std ::cout << "You now have " << obj->getbatt() + bat << "batteries." << '\n';
							std ::cout << "You attempt to place the book back in the bookshelf, and to your suprise you notice the entire thing has vanished." << '\n';
						}
						break;
					default:
						std ::cerr << "ERROR: Book # non-existant, ending game!" << '\n';
						exit(1);
						break;
					};
				}
				else if (luck > 40 && luck < 60)
				{
					luck = randn(1, 100);
					if (abom)
					{
						std ::cout << "An unearthly chill comes over you, unlike anything you have ever felt before. You feel eyes on you, but these eyes see more than any other, you know you have walked into your doom." << '\n';
						obj->setsecr(obj->getsecr() * -1);
						battle(obj, 999);
					}
					else
					{
						std ::cout << "You cannot be sure what, but something is in this room, and its coming right at you!" << '\n';
						battle(obj, 0);
					}
				}
				else if (luck > 60 && luck < 80)
				{
					luck = randn(1, 100);
					char type = randitem();
					int id = 0;
					if (type == 'S')
					{
						id = randn(1, 5);
					}
					else
					{
						id = randn(1, 3);
					}
					std ::cout << "You enter the room, and it is largely in disrepair much like all the others. In the center of the room however there is a " << obj->itemname(type, id) << " sitting on a nearly collapsed table." << '\n';
					obj->insert(type, id);
				}
				else
				{
					luck = randn(1, 100);
					int chance = randn(1, 100);
					char d = 'm';
					std ::cout << "You enter the room, and the first thing you notice is the smell. The entire lighthouse has a foul odor, but in this room its was inescapable. The stench was so overpowering you almost failed to notice a chest in the center of the room. There is something ominous about this chest, but you cant help but feel there might be something useful inside" << '\n';
					std ::cout << "Open the chest? (y:yes || n:no)" << '\n';
					do
					{
						cin >> d;
					} while (d != 'y' && d != 'n');
					if (d == 'y')
					{
						if (chance > 70)
						{
							char type = randitem();
							int id = 0;
							if (type == 'S')
							{
								id = randn(1, 5);
							}
							else
							{
								id = randn(1, 3);
							}
							std ::cout << "You open up the chest, and inside you find a/an" << obj->itemname(type, id) << "!" << '\n';
							obj->insert(type, id);
						}
						else if (chance < 70 && chance > 40)
						{
							std ::cout << "You open up the chest, and find nothing but cobwebs" << '\n';
						}
						else
						{
							std ::cout << "You open up the chest...." << '\n';
							battle(obj, 0);
						}
					}
					else
					{
						std ::cout << "You chose not to open it, this lighthouse is full of dangers and that chest could just have well been another trap." << '\n';
					}
				}
			}

			i++;
			if (i < floors - 1 && done == 0 && obj->gethp() > 0)
			{
				std ::cout << "Keep ascending the lighthouse? (y:yes || n:no)" << '\n';
				do
				{
					cin >> choice;
				} while (choice != 'y' && choice != 'n');
				if (choice == 'n')
				{
					std ::cout << "You exit the lighthouse. You cannot afford to take any more risks." << '\n';
					i = i + floors;
					done = 1;
				}
			}
		} while (i < floors && choice != 'n' && done != 1 && obj->gethp() > 0);
	}
	else
	{
		std ::cout << "You decide against entering the lighthouse. There could have been something valuable in there, but the dangers within could prove fatal." << '\n';
	}
	next(obj);
	return;
}

void Event ::mansion(Player *obj)
{
	//Variables
	char enter = ' ';
	int x = 0;
	char type = 'n';
	int id = 0;
	char buf;
	string room = "hall";
	int searchluck[20];
	for (int i = 0; i < 20; i++)
	{
		searchluck[i] = randn(1, 100);
	}
	//Block of text and asci function to give info to player
	ascimansion();
	std ::cout << "Along your journey you come across a massive mansion sitting on the shore. It appears abandoned, and parts of it have already begun to decay and fall into the sea below" << '\n';
	std ::cout << "You walk up to the front door of the mansion, the eerieness of the place not eluding you for a second." << '\n';
	std ::cout << "The door is unlocked, would you like to enter (y:yes || n:no)" << '\n';
	//Determines whether player will enter mansion or not
	do
	{
		cin >> enter;
	} while (enter != 'y' && enter != 'n');

	//Player chose to enter mansion
	if (enter == 'y')
	{
		do
		{
			//Create a random item
			genranditem(type, id);
			//If there has been no loop yet, this block will run.
			if (x == 0)
			{
				std ::cout << "You enter the mansion, you find yourself in the great hall of the building. The smell is overwhelming, and the decay and rot is everywhere." << '\n';
			}
			//If player is on the first floor, this block will run.
			if (room == "hall")
			{
				std ::cout << "From The Great Hall there are the entrances to the kitchen, and the dining room on your left; guest bedroom, and living room on your right; or you could go upstairs." << '\n';
				std ::cout << "Where would you like to go? (kitchen || dining_room || guest_bedroom || living_room || upstairs || leave)" << '\n';
				do
				{
					getline(cin, room);
				} while (room != "kitchen" && room != "dining_room" && room != "guest_bedroom" && room != "living_room" && room != "upstairs" && room != "leave");
			}
			//If player is on the second floor, this block will run.
			else if (room == "floor2")
			{
				std ::cout << "From upstairs there are entrances to the bathroom, and the study on your left; master bedroom, and bedroom on your right; or you could go back downstairs to The Great Hall." << '\n';
				std ::cout << "Where would you like to go? (bathroom || study || master_bedroom || bedroom || downstairs || leave)" << '\n';
				do
				{
					getline(cin, room);
				} while (room != "bathroom" && room != "study" && room != "master_bedroom" && room != "bedroom" && room != "downstairs" && room != "leave");
			}
			//Downstairs condition.
			else if (room == "downstairs")
			{
				std ::cout << "You head back down the stairs to The Great Hall, the ancient steps creaking under your weight" << '\n';
				room = "hall";
			}
			//Upstairs Conditon.
			else if (room == "upstairs")
			{
				std ::cout << "You walk up the stairs of the mansion, noticing some wallpaper peeling off to reveal the mold growing underneath." << '\n';
				room = "floor2";
			}
			//Leave condition.
			else if (room == "leave")
			{
				std ::cout << "You decide to get out of this mansion. You havent felt safe for a single moment you've been inside, and whatever else you could have found is not worth your life" << '\n';
			}
			//Kitchen condition
			else if (room == "kitchen")
			{
				string search;
				int y = 0;
				do
				{
					//Text block to print when player first enters room.
					if (y == 0)
					{
						std ::cout << "\nYou enter the kitchen; what was once clearly an amazing kitchen capable of producing fine dishes is now nothing but a putrid pile or rot." << '\n';
					}
					std ::cout << "It remains difficult to determine if you would find anything in here. Inside the kitchen there remains a fridge, a pantry, an oven, and a dishwasher." << '\n';
					std ::cout << "Would you like to search something? (fridge || pantry || oven || dishwasher || leave)" << '\n';
					do
					{
						getline(cin, search);
					} while (search != "fridge" && search != "pantry" && search != "oven" && search != "dishwasher" && search != "leave");

					if (DEBUG)
						std ::cout << "[Event]DEBG:Player is in kitchen, loops so far " << y << " search variable is " << search << "." << '\n';

					//Player searches fridge
					if (search == "fridge")
					{
						if (searchluck[0] == 0)
						{
							std ::cout << "You have already searched this." << '\n';
							buffer('.');
							cin >> buf;
						}
						else if (searchluck[0] > 65)
						{
							genranditem(type, id);
							std ::cout << "You reach inside of the fridge and found a/an " << obj->itemname(type, id) << "!" << '\n';
							searchluck[0] = 0;
						}
						else
						{
							std ::cout << "You reach into the fridge, and found nothing but old rotten food." << '\n';
							searchluck[0] = 0;
						}
					}
					//Player searches pantry
					else if (search == "pantry")
					{
						if (searchluck[1] == 0)
						{
							std ::cout << "You have already searched this." << '\n';
							buffer('.');
							cin >> buf;
						}
						else if (searchluck[1] > 85)
						{
							genranditem(type, id);
							std ::cout << "You search inside the pantry and find a/an " << obj->itemname(type, id) << "!" << '\n';
							searchluck[1] = 0;
						}
						else if (searchluck[1] < 85 && searchluck[1] > 55)
						{
							int HPup = randn(1, 3);
							std ::cout << "You search inside the pantry, and much to your suprise you find a pastry that is not rotten!" << '\n';
							std ::cout << "You eat the pastry and it gives you (Hp +" << HPup << ")" << '\n';
							obj->sethp(obj->gethp() + HPup);
							searchluck[1] = 0;
						}
						else
						{
							std ::cout << "You reach into the pantry, and found nothing but old rotten food" << '\n';
							searchluck[1] = 0;
						}
					}
					//Player searches oven
					else if (search == "oven")
					{
						if (searchluck[2] == 0)
						{
							std ::cout << "You have already searched this." << '\n';
							buffer('.');
							cin >> buf;
						}
						else if (searchluck[2] > 75)
						{
							genranditem(type, id);
							std ::cout << "You open up the oven, and found a/an " << obj->itemname(type, id) << "!" << '\n';
							searchluck[2] = 0;
						}

						else if (searchluck[2] < 75 && searchluck[2] > 40)
						{
							int dmg = randn(1, 4);
							std ::cout << "You grab the oven handle to open it up, but for some reason it is scorching hot." << '\n';
							std ::cout << "You pull your hand away as fast you can, but it still managed to burn you (Hp -" << dmg << ")" << '\n';
							obj->sethp(obj->gethp() - dmg);
							searchluck[2] = 0;
						}
						else
						{
							std ::cout << "You open up the oven, and find nothing" << '\n';
							searchluck[2] = 0;
						}
					}
					//Player searches dishwasher
					else if (search == "dishwasher")
					{
						if (searchluck[3] == 0)
						{
							std ::cout << "You have already searched this." << '\n';
							buffer('.');
							cin >> buf;
						}
						else if (searchluck[3] > 85)
						{
							genranditem(type, id);
							std ::cout << "You search inside the dishwasher and find a/an " << obj->itemname(type, id) << "!" << '\n';
							searchluck[3] = 0;
						}
						else if (searchluck[1] < 85 && searchluck[1] > 55)
						{
							int batt = randn(1, 3);
							std ::cout << "You search inside of the dishwasher, and to your ruprise you find " << batt << "batteries!" << '\n';
							obj->setbatt(obj->getbatt() + batt);
							searchluck[3] = 0;
						}
						else
						{
							std ::cout << "You open up the dishwasher and find nothing but old broken plates." << '\n';
							searchluck[3] = 0;
						}
					}
					else if (search == "leave")
					{
						std ::cout << "You exit the kitchen, and return to The Great Hall" << '\n';
						room = "hall";
					}
					//Variable to track "time" in kitchen
					y++;
				} while (search != "leave" && y < MAX_LOOP);
				if (y >= MAX_LOOP)
				{
					std ::cerr << "ERROR:In mansion function, Kitchen loop exceeded max alllowed loops. Killing program." << '\n';
					exit(1);
				}
			}
			//Dining room condition
			else if (room == "dining_room")
			{
				//Player has already been in here
				if (searchluck[4] == 0)
				{
					std ::cout << "You've already searched this room" << '\n';
					buffer('.');
					cin >> buf;
					room = "hall";
				}
				//Player gets battle
				else if (searchluck[4] > 50)
				{
					std ::cout << "As soon as you enter this room, you feel a sense of doom wash over you" << '\n';
					buffer('_');
					cin >> buf;
					battle(obj, 0);
					searchluck[4] = 0;
					room = "hall";
				}
				//Player gets nothing
				else
				{
					std ::cout << "You walk into the dining room. It is just as decayed as the rest of the manor, furniture strewn about and rotting, and an overhwlming feeling of dread no matter where you look" << '\n';
					std ::cout << "There is clearly nothing for you here, so you decide to make your way back to The Great Hall" << '\n';
					buffer('.');
					cin >> buf;
					searchluck[4] = 0;
					room = "hall";
				}
			}
			//Guest bedroom conditiion
			else if (room == "guest_bedroom")
			{
				string search;
				int y = 0;
				do
				{
					//Starting text block
					if (y == 0)
					{
						std ::cout << "\nThe guest bedroom is littered with clothing, both women's and men's. Every article of clothing is in tatters" << '\n';
						std ::cout << "The rest of the bedroom is falling apart, there are holes in the walls you can see the ocean through, and there is an overwhelming sense that the whole thing may just collapse in on itself at any moment" << '\n';
						std ::cout << "Inside of the bedroom there are some things more intact than others. A nightstand, a closet, and a dresser." << '\n';
					}
					std ::cout << "Would you like to search something? (nightstand || closet || dresser || leave)" << '\n';
					do
					{
						getline(cin, search);
					} while (search != "nightstand" && search != "closet" && search != "dresser" && search != "leave");

					if (DEBUG)
						std ::cout << "[Event]DEBUG:Player is in guest bedroom, loops so far " << y << " search variable is " << search << "." << '\n';

					//Player chose to search nightstand
					if (search == "nightstand")
					{
						//Player has already searched
						if (searchluck[5] == 0)
						{
							std ::cout << "You've already searched this" << '\n';
							cin >> buf;
						}
						//Player gets item
						else if (searchluck[5] > 85)
						{
							genranditem(type, id);
							std ::cout << "You pull open the drawer on the nightstand, and inside of it you find a/an " << obj->itemname(type, id) << "!" << '\n';
							searchluck[5] = 0;
						}
						//Player gets batteries
						else if (searchluck[5] < 85 && searchluck[5] > 45)
						{
							int batt = randn(1, 3);
							std ::cout << "You open up the drawer on the nightstand, and inside ypu find " << batt << " batteries!" << '\n';
							obj->setbatt(obj->getbatt() + batt);
							searchluck[5] = 0;
						}
						//Player gets nothing
						else
						{
							std ::cout << "You open up the drawer on the nightstand and found, nothing." << '\n';
							searchluck[5] = 0;
						}
					}
					//Player chose to search closet
					else if (search == "closet")
					{
						//Player has already searched closet
						if (searchluck[6] == 0)
						{
							std ::cout << "You've already searched this" << '\n';
							buffer('_');
							cin >> buf;
						}
						//Player gets item
						else if (searchluck[6] > 75)
						{
							genranditem(type, id);
							std ::cout << "You walk into the closet, and inside of it you find a/an " << obj->itemname(type, id) << "!" << '\n';
							searchluck[6] = 0;
						}
						//Player enters battle
						else if (searchluck[6] < 75 && searchluck[6] > 45)
						{
							std ::cout << "You open up the closet, and instantly you regret it." << '\n';
							buffer('_');
							cin >> buf;
							battle(obj, 0);
							searchluck[6] = 0;
						}
						//Player gets nothing
						else
						{
							std ::cout << "You walk into the closet, and inside you find nothing." << '\n';
							searchluck[6] = 0;
						}
					}
					//Player searches dresser
					else if (search == "dresser")
					{
						//Player has already searched dresser
						if (searchluck[7] == 0)
						{
							std ::cout << "You've already searched this" << '\n';
							buffer('_');
							cin >> buf;
						}
						//Player gets +Hp
						else if (searchluck[7] > 75)
						{
							int HPup = randn(1, 3);
							std ::cout << "You open up the dresser, and inside of it you find a partially used bandage (Hp +" << HPup << ")" << '\n';
							obj->sethp(obj->gethp() + HPup);
							searchluck[7] = 0;
						}
						//Player gets nothing
						else
						{
							std ::cout << "You open up the dresser, and inside you find nothing." << '\n';
							searchluck[7] = 0;
						}
					}
					//Leave condition
					else if (search == "leave")
					{
						std ::cout << "You exit the guest bedroom, and return to The Great Hall" << '\n';
						room = "hall";
					}
					//Variable to track "time" in kitchen
					y++;
				} while (search != "leave" && y < MAX_LOOP);
				if (y >= MAX_LOOP)
				{
					std ::cerr << "ERROR:In mansion function, Kitchen loop exceeded max alllowed loops. Killing program." << '\n';
					exit(1);
				}
			}
			//Living room condition
			else if (room == "living_room")
			{
				//Player has already searched
				if (searchluck[8] == 0)
				{
					std ::cout << "You've already searched this room" << '\n';
					buffer('.');
					cin >> buf;
					room = "hall";
				}
				//Player gets battle
				else if (searchluck[8] > 65)
				{
					std ::cout << "Upon entering the living room, you begin to fear death." << '\n';
					buffer('_');
					cin >> buf;
					battle(obj, 0);
					searchluck[8] = 0;
					room = "hall";
				}
				//Player gets item
				else if (searchluck[8] < 65 && searchluck[8] > 35)
				{
					genranditem(type, id);
					std ::cout << "You enter the living room, it's entirely rotten and disgusting like everything else, but out of the corner of your eye you see something glistening" << '\n';
					std ::cout << "Its a/an " << obj->itemname(type, id) << "!" << '\n';
					buffer('.');
					cin >> buf;
					obj->insert(type, id);
					searchluck[8] = 0;
					room = "hall";
				}
				//Player gets nothing
				else
				{
					std ::cout << "The living room is just as disgusting as the rest of the house, nobody is or could be able live in this room" << '\n';
					std ::cout << "There is clearly nothing for you here, so you decide to make your way back to The Great Hall" << '\n';
					buffer('.');
					cin >> buf;
					searchluck[8] = 0;
					room = "hall";
				}
			}

			//Upstairs conditions

			//Master bedroom contion
			else if (room == "master_bedroom")
			{
				string search;
				char buf;
				int y = 0;
				std ::cout << "You enter the master bedroom, what was once a very luxurious space for the owner of the mansion, was now so far gone it was impossible to imagine anyone living here" << '\n';
				std ::cout << "Despite all of this rot, there are a few areas of the room that catch your eye. Those being the bed, the closet, the dresser, the wardrobe, and the desk." << '\n';
				do
				{
					std ::cout << "What would you like to search? (bed || closet || dresser || wardrobe || desk || leave)" << '\n';
					do
					{
						getline(cin, search);
					} while (search != "bed" && search != "closet" && search != "dresser" && search != "wardrobe" && search != "desk" && search != "leave");
					//Player chose to search bed
					if (search == "bed")
					{
						//Player has already searched
						if (searchluck[14] == 0)
						{
							std ::cout << "You already searched this" << '\n';
							buffer('.');
							cin >> buf;
						}
						//Player gets item
						else if (searchluck[14] > 75)
						{
							genranditem(type, id);
							std ::cout << "You search the bed, it is largely molding and you're sure it would be disgustingly squishy if you tried to lay on it; despite all of this under the sheets you find a/an" << obj->itemname(type, id) << "!" << '\n';
							obj->insert(type, id);
							searchluck[14] = 0;
						}
						//Player gets batteries
						else if (searchluck[14] < 75 && searchluck[14] > 35)
						{
							int batt = randn(1, 3);
							std ::cout << "As you pull back the sheets on the bed you find many indescribably horrible things, however you also manage to find " << batt << " batteries!" << '\n';
							obj->setbatt(obj->getbatt() + batt);
							searchluck[14] = 0;
						}
						//Player gets nothing
						else
						{
							std ::cout << "You found nothing" << '\n';
							buffer('.');
							searchluck[14] = 0;
						}
					}
					//Player chose to search closet
					else if (search == "closet")
					{
						//Player has already searched
						if (searchluck[15] == 0)
						{
							std ::cout << "You already searched this" << '\n';
							buffer('.');
							cin >> buf;
						}
						//Player gets item
						else if (searchluck[15] > 65)
						{
							genranditem(type, id);
							std ::cout << "You swing open the door to the closet, and inside you find a/an" << obj->itemname(type, id) << "!" << '\n';
							obj->insert(type, id);
							searchluck[15] = 0;
						}
						//Player gets battle
						else if (searchluck[15] < 65 && searchluck[14] > 25)
						{
							std ::cout << "You open the closet door, and before you even have time to react something jumps out at you!" << '\n';
							buffer('_');
							cin >> buf;
							battle(obj, 0);
							searchluck[15] = 0;
						}
						//Player gets nothing
						else
						{
							std ::cout << "You found nothing" << '\n';
							buffer('.');
							searchluck[15] = 0;
						}
					}
					//Player chose to search dresser
					else if (search == "dresser")
					{
						//Player has already searched
						if (searchluck[16] == 0)
						{
							std ::cout << "You already searched this" << '\n';
							buffer('.');
							cin >> buf;
						}
						//Player gets item
						else if (searchluck[16] > 85)
						{
							genranditem(type, id);
							std ::cout << "You start opening drawers on the dresser, most of them are empty, or just full of useless thing. However in the last drawer you find a/an " << obj->itemname(type, id) << "!" << '\n';
							obj->insert(type, id);
							searchluck[16] = 0;
						}
						//Player gets hp
						else if (searchluck[16] < 85 && searchluck[16] > 55)
						{
							int HPup = randn(1, 3);
							std ::cout << "You start opening drawers in the dresser, not many items are of use to you, but you do manage to find a mostly used bandage! (Hp +" << HPup << ")." << '\n';
							obj->sethp(obj->gethp() + HPup);
							searchluck[16] = 0;
						}
						//Player gets nothing
						else
						{
							std ::cout << "You found nothing" << '\n';
							buffer('.');
							searchluck[16] = 0;
						}
					}
					//Player chose to search wardrobe
					else if (search == "wardrobe")
					{
						//Player has already searched
						if (searchluck[17] == 0)
						{
							std ::cout << "You already searched this" << '\n';
							buffer('.');
							cin >> buf;
						}
						//Player gets item
						else if (searchluck[17] > 85)
						{
							genranditem(type, id);
							std ::cout << "You search the wardrobe, at first it seems empty and then you find a/an " << obj->itemname(type, id) << "!" << '\n';
							obj->insert(type, id);
							searchluck[17] = 0;
						}
						//Player gets nothing
						else
						{
							std ::cout << "You found nothing" << '\n';
							buffer('.');
							searchluck[17] = 0;
						}
					}
					//Player chose to search desk
					else if (search == "desk")
					{
						//Player has already searched
						if (searchluck[18] == 0)
						{
							std ::cout << "You already searched this" << '\n';
							buffer('.');
							cin >> buf;
						}
						//Player gets item
						else if (searchluck[18] > 85)
						{
							genranditem(type, id);
							std ::cout << "You search the desk, and you find a/an" << obj->itemname(type, id) << "!" << '\n';
							obj->insert(type, id);
							searchluck[14] = 0;
						}
						//Player gets batteries
						else if (searchluck[18] < 85 && searchluck[18] > 55)
						{
							int batt = randn(1, 3);
							std ::cout << "You search the desk, and find " << batt << "batteries! " << '\n';
							obj->setbatt(obj->getbatt() + batt);
							searchluck[18] = 0;
						}
						//Player gets hp
						else if (searchluck[16] < 55 && searchluck[16] > 25)
						{
							int HPup = randn(1, 3);
							std ::cout << "You start opening drawers in the desk, not many items are of use to you, but you do manage to find a mostly used bandage! (Hp +" << HPup << ")." << '\n';
							obj->sethp(obj->gethp() + HPup);
							searchluck[16] = 0;
						}
						//Player gets nothing
						else
						{
							std ::cout << "You found nothing" << '\n';
							buffer('.');
							searchluck[18] = 0;
						}
					}
					//Player chose to leave
					else if (search == "leave")
					{
						std ::cout << "You exit the master bedroom, and return to the upstairs hall" << '\n';
						room = "floor2";
					}
					y++;

				} while (search != "leave" && obj->gethp() > 0 && y < MAX_LOOP);
			}

			//Bathroom condition
			else if (room == "bathroom")
			{
				//Player has already searched
				if (searchluck[13] == 0)
				{
					std ::cout << "You've already searched this room" << '\n';
					buffer('.');
					cin >> buf;
					room = "floor2";
				}
				//Player gets battle
				else if (searchluck[13] > 75)
				{
					std ::cout << "You enter the bathroom, and you know you are not alone." << '\n';
					buffer('_');
					cin >> buf;
					battle(obj, 0);
					searchluck[13] = 0;
					room = "floor2";
				}
				//Player gets item
				else if (searchluck[13] < 75 && searchluck[13] > 45)
				{
					genranditem(type, id);
					std ::cout << "The bathroom is horrid, but you're eyes land on something not sp horrid in the bathtub" << '\n';
					std ::cout << "Its a/an " << obj->itemname(type, id) << "!" << '\n';
					buffer('.');
					cin >> buf;
					obj->insert(type, id);
					searchluck[13] = 0;
					room = "floor2";
				}
				//Player gets nothing
				else
				{
					std ::cout << "The bathroom is covered in black mold, and rot. The smell is unberable and the stains on the walls are unthinkable" << '\n';
					std ::cout << "There is clearly nothing for you here, so you decide to make your way back to the upstairs hall" << '\n';
					buffer('.');
					cin >> buf;
					searchluck[13] = 0;
					room = "floor2";
				}
			}

			//Bedroom condtion
			else if (room == "bedroom")
			{
				//Player has already searched
				if (searchluck[12] == 0)
				{
					std ::cout << "You've already searched this room" << '\n';
					buffer('.');
					cin >> buf;
					room = "floor2";
				}
				//Player gets battle
				else if (searchluck[12] > 55)
				{
					std ::cout << "You enter the bedroom, and you know you are not alone." << '\n';
					buffer('_');
					cin >> buf;
					battle(obj, 0);
					searchluck[12] = 0;
					room = "floor2";
				}
				//Player gets item
				else if (searchluck[12] < 55 && searchluck[12] > 25)
				{
					genranditem(type, id);
					std ::cout << "The bedroom is so bland you hardly even notice it, as your attention is drawn away from the rooma nd towards the shiny thing on the bed." << '\n';
					std ::cout << "Its a/an " << obj->itemname(type, id) << "!" << '\n';
					buffer('.');
					cin >> buf;
					obj->insert(type, id);
					searchluck[12] = 0;
					room = "floor2";
				}
				//Player gets nothing
				else
				{
					std ::cout << "The bedroom is dillipidated, molding, and somehow has a worse smell than any other room in the house" << '\n';
					std ::cout << "There is clearly nothing for you here, so you decide to make your way back to the upstairs hall" << '\n';
					buffer('.');
					cin >> buf;
					searchluck[12] = 0;
					room = "floor2";
				}
			}
			//Study condition
			else if (room == "study")
			{
				string search;
				int y = 0;
				std ::cout << "You enter the study, and it is miraculously well kept. The walls are still rotten like the rest of the house, but it seems as though the furniture inside of the room has been made immune to the ravages of entropy." << '\n';
				//Player has mysterious key
				if (obj->doeshave('S', -1))
				{
					char open = 'm';
					std ::cout << "You are drawn to a door in the room you did not see at first. It appears ancient in origin, and covered in writing in a language you do not understand." << '\n';
					std ::cout << "The key you found earlier is getting lighter somehow; almost as if the door is pulling it out of your pocket." << '\n';
					std ::cout << "You arent sure how you know, but you're certain this door can be opened with the Mysterious Key" << '\n';
					std ::cout << "Open the door? (y:yes||n:no)" << '\n';
					do
					{
						cin >> open;
					} while (open != 'y' && open != 'n');
					//Player has chosen to fight Kali
					if (open == 'y')
					{
						std ::cout << "You take the key out of your pocket and bring it to the lock. You insert the key into the lock and turn it" << '\n';
						std ::cout << "Upon turning the lock, the room fills with thousands of screams, the writing on the door begins to glow, and in your mind all you can see is the cosmos itself gasping it's last breath before being snuffed out by whatever is in that room" << '\n';
						std ::cout << R"(C̶͕̥̗̿̽̈́̾͊̌͒̈́͋ͅǫ̵̼̺̟̣͉̫̖̇͂̈́͂̀͝ņ̶̖͚̮͍͕̭̼͉͂̓̐̑́̽͋̇̚ẗ̴̯̙̤̥́̀̓i̸̮̘̿n̶̪̥̓̒̒̑͋̄̋̃̉̕ű̴̢̲̜̟̻̤͙̓ḙ̸͉̮̣̟̥̐͊͘.̶̙̺̣̌̾̽͊͝.̶̧̤̲͖̗̞͚̤͖̲͐̈́̎͐͌̀͝.̷̳͔̦͇̜̜̰͚͔̿́ͅ.̴̢̻̳͈͊(̷̡̘̼͙̹̯̟̰̻̔̋͐͑A̴̧̡͉͕͈̖̻̜̒͋n̵̰̫͌̅͋̈͗͑̒͠ỳ̷̫͍̬͎̼̝̞͚́ͅ ̸̻͕̳͓͔̫̒ͅḵ̶́̇è̵͙̜̺̺͖̄̌̾͌̀͝y̸̜̟̪̱͇̬̼͎̅̄́̈́)̴̥̯͇̳͑͗̄̉)" << '\n';
						cin >> buf;
						obj->setsecr(obj->getsecr() * 2);
						battle(obj, 13);
					}
					//Player avoided kali at all kallosts
					else
					{
						std ::cout << "You decide against opening the door, anything could be beyond that and you dont have a good feeling about it." << '\n';
					}
				}
				std ::cout << "Inside this room you find your attenton drawn to a few key things.Those being The desk, the bookshelf, and the cabinet" << '\n';
				do
				{
					std ::cout << "What would you like to search? (desk || bookshelf || cabinet || leave)" << '\n';
					do
					{
						getline(cin, search);
					} while (search != "desk" && search != "bookshelf" && search != "cabinet" && search != "leave");
					if (search == "desk")
					{
						//Player already searched this
						if (searchluck[9] == 0)
						{
							std ::cout << "You've already searched this" << '\n';
							buffer('.');
							cin >> buf;
						}
						//Player gets an item
						else if (searchluck[9] > 75)
						{
							genranditem(type, id);
							std ::cout << "You rifle through the drawers in the desk, until you find a/an " << obj->itemname(type, id) << "!" << '\n';
							obj->insert(type, id);
							searchluck[9] = 0;
						}
						//Player gets nothing
						else
						{
							std ::cout << "You found nothing" << '\n';
							searchluck[9] = 0;
						}
					}
					else if (search == "bookshelf")
					{
						if (searchluck[10] == 0)
						{
							std ::cout << "You've already searched this" << '\n';
							buffer('.');
							cin >> buf;
						}
						//Player gets an item
						else if (searchluck[10] > 65)
						{
							genranditem(type, id);
							std ::cout << "You search every row of the bookshelf, until you find a/an " << obj->itemname(type, id) << "!" << '\n';
							obj->insert(type, id);
							searchluck[10] = 0;
						}
						//Player gets damaged
						else if (searchluck[10] < 65 && searchluck[10] > 25)
						{
							int dmg = randn(1, 4);
							std ::cout << "You search every inch of the bookshelf, but it was not as sturdy as you thought it was, adn the whole bookshelf collapses on top of you. (Hp -" << dmg << ")" << '\n';
							obj->sethp(obj->gethp() - dmg);
							searchluck[10] = 0;
						}
						//Player gets nothing
						else
						{
							std ::cout << "You found nothing" << '\n';
							searchluck[10] = 0;
						}
					}
					else if (search == "cabinet")
					{
						//Player has already searched this
						if (searchluck[11] == 0)
						{
							std ::cout << "You've already searched this" << '\n';
							buffer('.');
							cin >> buf;
						}
						//Player gets an item
						else if (searchluck[11] > 85)
						{
							genranditem(type, id);
							std ::cout << "You search every inch of the cabinet, until you find a/an " << obj->itemname(type, id) << "!" << '\n';
							obj->insert(type, id);
							searchluck[11] = 0;
						}
						else if (searchluck[11] < 85 && searchluck[11] > 55)
						{
							int batt = randn(1, 3);
							std ::cout << "You search every inch of the cabinet and manage to find " << batt << " batteries!" << '\n';
							obj->setbatt(obj->getbatt() + batt);
							searchluck[11] = 0;
						}
						//Player gets nothing
						else
						{
							std ::cout << "You found nothing" << '\n';
							searchluck[11] = 0;
						}
					}
					else if (search == "leave")
					{
						std ::cout << "You decide to leave the study, and return to the upstairs hall" << '\n';
						room = "floor2";
					}
					y++;
				} while (search != "leave" && y < MAX_LOOP);
				if (y >= MAX_LOOP)
				{
					std ::cerr << "ERROR: In study condition, MAX_LOOP has been reached. Killing program." << '\n';
					exit(1);
				}
			}

			if (DEBUG)
				std ::cout << "[Event]DEBUG:In mansion function, loops so far: " << x << " room is " << room << "." << '\n';
			//x keeps track of # of loops.
			x++;
		} while (room != "leave" && obj->gethp() > 0 && x < MAX_LOOP);

		//if x exceedes a given maximum, end the program; Prevents infinite loops.
		if (x >= MAX_LOOP)
		{
			std ::cerr << "ERROR: Mansion function exceeded maximum loop allowance, killing program" << '\n';
			exit(1);
		}
	}

	//Player chose not to enter mansion
	else
	{
		std ::cout << "For a moment you hesitate, and then come to your senses. You need to be getting to the ship, the last thing you need is to waste your time with creepy mansions." << '\n';
	}

	buffer('.');
	cin >> buf;

	//Move to next objext in list
	next(obj);
	return;
}

void Event ::pirateship(Player *obj)
{
	ascipirateship();
	int x = 0;
	char buf = ' ';
	bool out = 0;
	char type = 'n';
	int id = 0;
	int roomluck[5] = {0};
	for (int i = 0; i < 5; i++)
		roomluck[i] = randn(1, 100);
	string room = "lowdeck";
	//Block of text
	std ::cout << "As you continue on your way, you find your path blocked by a crashed ship. The ship appears very old, it's made of wood and the planks have clearly been rotting off of it for some time now. Its sails have been tattered and bleached beyond recognition, so this leaves you with very little indication of whose ship this was, or what it was used for." << '\n';
	std ::cout << "All that is abundantly clear is this ship will not be sailing, and you will have to go through it's wreckage to continue on your journey." << '\n';
	std ::cout << "Enter Ship (Any key)" << '\n';
	cin >> buf;
	std ::cout << "\nYou enter the ship through a hole in it's lower deck, and you notice the ship is mostly rotten or destroyed. You can't seem to find an obvious way out, it seems you will have to search for one. " << '\n';
	do
	{
		//Player is on the lower deck
		if (room == "lowdeck")
		{
			if (roomluck[0] == 0 && roomluck[1] == 0 && roomluck[2] == 0 && roomluck[3] == 0)
			{
				std ::cout << "You notice something on the lower deck that you had not seen before, a way out!" << '\n';
				std ::cout << "Exit ship (Any key)" << '\n';
				cin >> buf;
				out = 1;
				room = "none";
			}
			else
			{
				std ::cout << "The lower deck has been ravaged by the forces of decay; mold and barnacles own this ship now. " << '\n';
				std ::cout << "Three rooms however, the ktchen, a bedroom,and the storage room, still appear to be accessible. You could also go upstairs to the upper deck. " << '\n';
				std ::cout << "Where would you like to go? (kitchen || bedroom || storage_room ||upstairs)" << '\n';
				do
				{
					getline(cin, room);
				} while (room != "kitchen" && room != "bedroom" && room != "upstairs" && room != "storage_room");
			}
		}
		//Player is on the upper deck
		else if (room == "updeck")
		{
			if (roomluck[0] == 0 && roomluck[1] == 0 && roomluck[2] == 0 && roomluck[3] == 0)
			{
				std ::cout << "You notice something on the upper deck that you had not before, somehow there is a way out of this ship where before there was not." << '\n';
				std ::cout << "Exit ship (Any key)" << '\n';
				cin >> buf;
				out = 1;
				room = "none";
			}
			else
			{
				std ::cout << "The upper deck is collapsing into the lower deck; It does not seem safe to be up here" << '\n';
				std ::cout << "However you notice you could gain access to the captain's quarters from up here, or you could go back to the lower deck. " << '\n';
				std ::cout << "Where would you like to go? (downstairs || captain's_quarters)" << '\n';
				do
				{
					getline(cin, room);
				} while (room != "downstairs" && room != "captain's_quarters");
			}
		}
		//Player chose to go upstairs
		else if (room == "upstairs")
		{
			std ::cout << "You walk up the stairs to the upper deck the old rotten planks nearly breaking underneath your weight" << '\n';
			room = "updeck";
		}
		//Player chose to go downstairs
		else if (room == "downstairs")
		{
			std ::cout << "You walk back downstairs to the lower deck, the scent of must overpowering you as you descend" << '\n';
			room = "lowdeck";
		}
		//Bedroom  choice
		else if (room == "bedroom")
		{
			if (roomluck[0] == 0)
			{
				std ::cout << "You already searched this room" << '\n';
				buffer('.');
				cin >> buf;
			}
			else if (roomluck[0] > 85)
			{
				genranditem(type, id);
				std ::cout << "In the " << room << " you found a/an " << obj->itemname(type, id) << '\n';
				obj->insert(type, id);
				roomluck[0] = 0;
			}
			else if (roomluck[0] < 85 && roomluck[0] > 55)
			{
				int batt = randn(1, 3);
				std ::cout << "In the " << room << " you found " << batt << " batteries!" << '\n';
				obj->setbatt(obj->getbatt() + batt);
				roomluck[0] = 0;
			}
			else if (roomluck[0] < 55 && roomluck[0] > 25 && out == 0)
			{
				std ::cout << "In the " << room << " you found the way out of the ship!" << '\n';
				roomluck[0] = 0;
				out = 1;
			}
			else
			{
				std ::cout << "In the " << room << " you find nothing." << '\n';
				buffer('.');
				cin >> buf;
				roomluck[0] = 0;
			}
			room = "lowdeck";
		}
		else if (room == "kitchen")
		{

			if (roomluck[1] == 0)
			{
				std ::cout << "You already searched this room" << '\n';
				buffer('.');
				cin >> buf;
			}
			else if (roomluck[1] > 75)
			{
				genranditem(type, id);
				std ::cout << "In the " << room << " you found a/an " << obj->itemname(type, id) << '\n';
				obj->insert(type, id);
				roomluck[1] = 0;
			}
			else if (roomluck[1] < 75 && roomluck[1] > 45)
			{
				int batt = randn(1, 3);
				std ::cout << "In the " << room << " you found " << batt << " batteries!" << '\n';
				obj->setbatt(obj->getbatt() + batt);
				roomluck[1] = 0;
			}
			else if (roomluck[1] < 45 && roomluck[1] > 15 && out == 0)
			{
				std ::cout << "In the " << room << " you found the way out of the ship!" << '\n';
				roomluck[0] = 0;
				out = 1;
			}
			else
			{
				std ::cout << "In the " << room << " you find nothing." << '\n';
				buffer('.');
				cin >> buf;
				roomluck[1] = 0;
			}
			room = "lowdeck";
		}
		else if (room == "storage_room")
		{

			if (roomluck[2] == 0)
			{
				std ::cout << "You already searched this room" << '\n';
				buffer('.');
				cin >> buf;
			}
			else if (roomluck[2] > 85)
			{
				genranditem(type, id);
				std ::cout << "In the " << room << " you found a/an " << obj->itemname(type, id) << '\n';
				obj->insert(type, id);
				roomluck[2] = 0;
			}
			else if (roomluck[2] < 85 && roomluck[2] > 55)
			{
				battle(obj, 0);
				roomluck[2] = 0;
			}
			else if (roomluck[2] < 55 && roomluck[2] > 25 && out == 0)
			{
				std ::cout << "In the " << room << " you found the way out of the ship!" << '\n';
				roomluck[0] = 0;
				out = 1;
			}
			else
			{
				std ::cout << "In the " << room << " you find nothing." << '\n';
				buffer('.');
				cin >> buf;
				roomluck[2] = 0;
			}
			room = "lowdeck";
		}
		else if (room == "captain's_quarters")
		{

			if (roomluck[3] == 0)
			{
				std ::cout << "You already searched this room" << '\n';
				buffer('.');
				cin >> buf;
			}
			else if (roomluck[3] > 85)
			{
				genranditem(type, id);
				std ::cout << "In the " << room << " you found a/an " << obj->itemname(type, id) << '\n';
				obj->insert(type, id);
				roomluck[3] = 0;
			}
			else if (roomluck[3] < 85 && roomluck[3] > 55)
			{
				battle(obj, 0);
				roomluck[3] = 0;
			}
			else if (roomluck[3] < 55 && roomluck[3] > 25 && out == 0)
			{
				std ::cout << "In the " << room << " you found the way out of the ship!" << '\n';
				roomluck[3] = 0;
				out = 1;
			}
			else
			{
				std ::cout << "In the " << room << " you find nothing." << '\n';
				buffer('.');
				cin >> buf;
				roomluck[3] = 0;
			}
			room = "updeck";
		}
		if (DEBUG)
			std ::cout << "[Event]DEBUG:In pirate ship event: Loops so far " << x << " Room is " << room << "." << '\n';
		x++;
	} while (out == 0 && obj->gethp() > 0 && x < MAX_LOOP);
	if (x >= MAX_LOOP)
	{
		std ::cerr << "ERROR: In pirate ship function, MAX_LOOP has been reached. Killing program" << endl;
		exit(1);
	}
	next(obj);
	return;
}

/* Fishing event, player can choose to go the end of the dock and fish for either a bonus to Hp, an item, or an enemy encounter */
void Event ::fishing(Player *obj)
{
	char type = ' ';
	int id = 0;
	int luck = 0;
	char c;
	char buf;
	char d = 'y';
	std ::cout << "You find an abandoned dock on your journey. The dock has started rotting entirely; planks fallen into the sea." << '\n';
	std ::cout << "Strange enough however you notice at the end of the dock someone has left a fishing rod and bait" << '\n';
	std ::cout << "Would you like to go fishing? (y:yes || n:no)" << '\n';
	do
	{
		cin >> c;
	} while (c != 'n' && c != 'y');
	//Player chose to fish
	if (c == 'y')
	{
		//Variables
		int i = 1;
		int bait = randn(3, 6);
		//BLock of text to give info to player
		std ::cout << "You walk to the end to the dock; taking care to avoid stepping on any rotten planks and falling into the sea below." << '\n';
		std ::cout << "Whoever left the fishing pole here also left " << bait << " bait items, which means you can reel something in " << bait << " times." << '\n';
		buffer('_');
		cin >> buf;
		do
		{
			luck = randn(1, 99);
			std ::cout << "You cast line #" << i << "..." << '\n';
			//Events that can occur during fishing, 1/3 chance for each event
			if (luck < 33)
			{
				int HPup = randn(1, 4);
				std ::cout << "You reel in the line, and at the end of it you find a hearty fish!" << '\n';
				std ::cout << "You take the time to cook and prepare the fish, and after eating it your Hp goes up by " << HPup << " points! (Hp +" << HPup << ")" << '\n';
				obj->sethp(obj->gethp() + HPup);
			}
			else if (luck > 33 && luck < 66)
			{
				genranditem(type, id);
				std ::cout << "You reel in the line, and at the end of it you find a/an " << obj->itemname(type, id) << "!" << '\n';
				obj->insert(type, id);
			}
			else
			{
				std ::cout << "You reel in the line, and you find nothing at the end of it, but you sense something sneaking up behind you..." << '\n';
				buffer('_');
				cin >> buf;
				battle(obj, 0);
			}
			//If you have bait remaining, this block will run
			i++;
			bait--;
			if (bait > 0 && obj->gethp() > 0)
			{

				std ::cout << "You have " << bait << " bait items left" << '\n';
				std ::cout << "Continue fishing? (y:yes || n:no)" << '\n';
				do
				{
					cin >> d;
				} while (d != 'n' && d != 'y');

				//If player decided to quit, this block will run.
				if (d == 'n')
				{
					if (DEBUG)
						std ::cout << "[Event]DEBUG:Player chose to stop fishing" << '\n';
					std ::cout << "You decide to quit fishing, you reeled in the line " << i << " times already, and you don't want to risk it again." << '\n';
				}
			}
			else
			{
				std ::cout << "You have run out of bait" << endl;
				buffer('.');
				cin >> buf;
				d = 'n';
			}

		} while (d == 'y' && bait > 0 && obj->gethp() > 0);
	}
	//Player chose not to fish
	else
	{
		std ::cout << "You decide against fishing; the activity is more than time consuming and you need to catch up to the ship before it leaves." << '\n';
	}
	next(obj);
	return;
}

void Event ::end(Player *obj)
{
	char buf;
	cout << "You've finally made it, the cruise ship is within a kilometer of you! You run towards the dock, screaming and flailing about hoping to get someone's attention." << '\n';
	cout << "Then suddenly, the sky blackens, a thick fog rolls in, and you are filled with an immense dread. From the ground in front of you erupts a terrible nightmare, lying in wait for you." << '\n';
	buffer('_');
	cin >> buf;
	battle(obj, 20);
	if (obj->gethp() > 0)
	{
		cout << "As the beast falls, the sky clears around you, and you find yourself transported to the base of the ship. You dont remember much after that, foggy images of some kind crew members taking you aboard. When you next awaken you're safe and warm in a bed aboard the cruise ship." << '\n';
		buffer('.');
		cin >> buf;
	}
	return;
}

/* Function that operates the same as next, but without cout statements*/
void Event ::ghostnext(Player *obj, int dist)
{
	if (DEBUG)
		std ::cout << "[Event]DEBUG: Entering ghostnext function." << '\n';
	if (obj->gethp() > 0)
	{
		while (m_start->m_dist > dist)
		{
			Path *cur = m_start;
			m_start = m_start->m_next;
			delete cur;
		}
		if (DEBUG)
			std ::cout << "[Event]DEBUG:Exiting ghost next function, Player's path is " << obj->getpath() << " Current distance: " << m_start->m_dist << '\n';
		return;
	}

	return;
}

void Event ::next(Player *obj)
{
	if (obj->gethp() > 0)
	{
		std ::cout << "===============================" << '\n';
		std ::cout << "    Hp: " << obj->gethp() << '\n';
		std ::cout << "    Distance: " << m_start->m_dist << '\n';
		std ::cout << "    Batteries: " << obj->getbatt() << '\n';
		std ::cout << "    # of Items: " << obj->size() << '\n';
		std ::cout << "===============================" << '\n';
		promptitem(obj, 'H');
		promptitem(obj, 'S');
		buffer('.');

		if (DEBUG)
			std ::cout << "[Event]DEBUG:In next function. Current node has distance of " << m_start->m_dist << " and en event id of " << m_start->m_evt;
		Path *tmp = NULL;
		tmp = m_start;
		m_start = m_start->m_next;
		delete tmp;
		if (DEBUG)
			std ::cout << " New node has a distance of " << m_start->m_dist << ", and an event ID of " << m_start->m_evt << '\n'
					   << '\n';

		return;
	}
	else
	{
		return;
	}
}

/*Eventable: Handles all routing to event functions via the m_evt value stored in m_start's node. Uses a switch statement to call the correct functions for their Ids. Also reports back if the player if found dead */
int Event ::eventable(int Evt, Player *obj)
{
	int luck = randn(1, 99);
	if (DEBUG)
		std ::cout << "[Event]DEBUG: Called eventable for event Number:" << Evt << '\n';

	//If the player is detected as "dead", return -1 to main.
	if (obj->gethp() <= 0)
	{
		if (DEBUG)
			std ::cout << "[Event]DEBUG: Eventable detected player hp has fallen to or below 0; informing main" << '\n';
		return -1;
	}

	//Switch statement to reroute player to events based on ID
	switch (Evt)
	{
	case -2:
		end(obj);
		if (obj->gethp() > 0)
		{
			return 1;
		}
		else
		{
			return -1;
		}
		break;
	case -1:
		start(obj);
		break;
	case 1:
		unevent(obj);
		break;
	case 2:
		cave(obj);
		break;
	case 3:
		whalebones(obj);
		break;
	case 5:
		sharkordolphin(obj);
		break;
	case 6:
		outcrop(obj);
		break;
	case 7:
		oldman(obj);
		break;
	case 9:
		tree(obj);
		break;
	case 11:
		shop(obj);
		break;
	case 12:
		if (luck > 66)
		{
			cave(obj);
		}
		else if (luck < 66 && luck > 33)
		{
			whalebones(obj);
		}
		else
		{
			outcrop(obj);
		}

		break;
	case 13:
		lighthouse(obj);
		break;
	case 14:
		if (luck > 66)
		{
			pirateship(obj);
		}
		else if (luck < 66 && luck > 33)
		{
			tree(obj);
		}
		else
		{
			oldman(obj);
		}
		break;
	case 15:
		fishing(obj);
		break;
	case 17:
		pirateship(obj);
		break;
	case 19:
		mansion(obj);
		break;
	case 20:
		if (luck > 66)
		{
			mansion(obj);
		}
		else if (luck < 66 && luck > 33)
		{
			lighthouse(obj);
		}
		else
		{
			shop(obj);
		}
		break;
	default:
		fog(obj);
		break;
	}
	//Default return value if nothing is amiss.
	return 0;
}
