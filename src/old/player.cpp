#include <iostream>
#include <iomanip>
#include "player.h"
#include "header.h"
using namespace std;
Player ::Player()
{
	if (DEBUG)
		std ::cout << "[Player]DEBUG:Constructing player object" << '\n';
	hp = 10;
	dist = 0;
	delta = 0;
	batt = 3;
	path = -1;
	m_head = NULL;
	dmg = 1;
	secr = 1;
	dfc = 1;
}
Player::~Player()
{
	if (DEBUG)
		std ::cout << "[Player]DEBUG:Destroying player object" << '\n';
	Player ::Item *tmp = NULL;
	while (m_head)
	{
		tmp = m_head;
		m_head = m_head->m_next;
		delete tmp;
	}
}

//Function that returns true if the list is empty, and false if it has Item.

bool Player ::empty()
{
	if (Player ::m_head == NULL)
	{
		return 1;
	}
	else
	{
		return 0;
	}
}

// Insert Function

void Player ::insert(char type, int val)
{
	if (DEBUG)
		std ::cout << "[Player]DEBUG: Inserting a/an " << itemname(type, val) << " into Item." << '\n';
	//If the type passed in is acceptable, this block will run
	if (type == 'S' || type == 'D' || type == 'O' || type == 'H')
	{
		Player ::itemnode x;
		x.type = type;
		x.val = val;
		if (!m_head)
		{
			if (DEBUG)
				std ::cout << "[Player]DEBUG: Adding itemnode to the front of the list" << endl;
			Player ::m_head = new Player ::Item(x, m_head);
			return;
		}
		else
		{
			Player ::Item *tmp;
			tmp = m_head;
			while (tmp->m_next != NULL)
			{
				tmp = tmp->m_next;
			}
			if (tmp->m_next == NULL)
			{
				if (DEBUG)
					std ::cout << "[Player]DEBUG: Adding itemnode to the back of the list" << endl;
				tmp->m_next = new Player ::Item(x, tmp->m_next);
				return;
			}
			else
			{
				cerr << "[Player]ERROR:Could not add itemn to end of list; Killing program." << endl;
				exit(1);
			}
		}
	}
	//If the type passed in is not acceptable, the program will die.
	else
	{
		cerr << "[Player]ERROR:Invalid item type given to player insert. Type given :" << type << "; Killing program" << '\n';
		exit(1);
	}
}

/* Removes specified itemnode from the list, can remove from anywhere in the list. */
bool Player ::remove(char c, int value)
{
	Item *cur = m_head; 
	if (DEBUG)
		std ::cout << "[Player]DEBUG: Remove function called for " << itemname(c, value) << "." << '\n';

	//If list is empty this condition will run. 
	if (m_head == NULL)
	{
		if (DEBUG)
			std :: cout << "[Player]DEBUG:Calling remove on an empty list, returning 0" << '\n';
		return 0;
	}
	//If the list is not empty, and the item type and value match the first item in the list, remove the first item and make the second item the new first tem. 
	else if (m_head->m_item.val == value && m_head->m_item.type == c)
	{
		if (DEBUG)
			std ::cout << "[Player]DEBUG:Removing first itemnode in Item list" << '\n';
		m_head = m_head->m_next;
		delete cur;
		return 1;
	}
	//If the itemnode is not first in the list; remove will search for it
	else if (m_head != NULL)
	{
		if(DEBUG)
		std ::cout << "[Player]DEBUG: itemnode not first, searching the rest of the list...." << '\n';
		
		while (cur)
		{
			if (DEBUG)
				std ::cout << "...";
				//If current item type matches type given 
			if (cur->m_item.type == c)
			{
				if (cur->m_item.val == value)
				{

					//If the itemnode is the last one in the list, then remove will delete it
					if (cur->m_next == NULL)
					{
						if (DEBUG)
							cout << itemname(c, value) << " was at end of list, removing..." << '\n';
						delete cur;
						return 1;
					}
					//If itemnode is further than first or second, remove will do some patchwork to delete it from the list, and maintain continiuty.
					else
					{
						if (DEBUG)
							cout << itemname(c, value) << " was in the middle of list, removing with pathwork..." << '\n';
						Item *tmp = cur;
						cur = cur->m_next;
						delete tmp;
						return 1;
					}
				}
				else 
				{
					cur = cur -> m_next; 
				}
			}
			else
			{
					cur = cur->m_next;
			}
			if (DEBUG)
				std ::cout << "...";
		}
	}
	if (DEBUG)
		cout << "[Player]DEBUG:Remove function could not find " << itemname(c, value) << '\n';

	return 0;
}

/* Returns size of whole list, does not care about itemnode type or value */
int Player ::size()
{
	int x = 0;
	Item *tmp;
	tmp = m_head;
	while (tmp)
	{
		tmp = tmp->m_next;
		x++;
	}
	return x;
}

/* Gives the name of specified item*/
string Player ::itemname(char c, int val)
{
	switch (c)
	{
		//Offence items case
	case 'O':
		switch (val)
		{
		case 1:
			return "Knife";
			break;

		case 2:
			return "Sword";
			break;

		case 3:
			return "Gun";
			break;
		}
		//Defense items case
	case 'D':
		switch (val)
		{
		case 1:
			return "Leather Jacket";
			break;
		case 2:
			return "Chainmail";
			break;
		case 3:
			return "Knight Armor";
			break;
		}
		//Health items case
	case 'H':
		switch (val)
		{
		case 1:
			return "Bandage";
			break;
		case 2:
			return "Medkit";
			break;
		case 3:
			return "Stem Cells";
			break;
		}
		break;
		//Special items case
	case 'S':
		switch (val)
		{
		case 1:
			return "Battery Box";
			break;
		case 2:
			return "Mystery Box";
			break;
		case 3:
			return "Wormhole Box";
			break;
		case 4:
			return "Battle Box";
			break;
		case 5:
			return "Path Switcher";
			break;
		case -1:
			return "Mysterious Key";
			break;
		}
		break;
	default:
		cerr << "[Player]ERROR: Attempting to get name of item that does not exist. Trying to find || type: " << c << " || Id: " << val << "." << '\n';
		exit(1);
	}
	//If itemnode is not in the list, this will return. Program will not break
	return "ITEM_NULL";
}

/* Returns the number of Item in the list with the specified type. */
int Player ::typepresent(char c)
{

	Item *tmp = m_head;
	int num = 0;
	while (tmp)
	{
		if (tmp->m_item.type == c && tmp->m_item.val > 0)
		{
			num = num + 1;
		}
		tmp = tmp->m_next;
	}
	if (DEBUG)
		std ::cout << "[Player]DEBUG:In Type Present for type " << c << "Type present are " << num << '\n';
	return num;
}

/*Returns number of Item in the list with specified type AND value. */
int Player ::givenum(char c, int x)
{
	Item *tmp;
	tmp = m_head;
	int num = 0;
	while (tmp)
	{
		if (tmp->m_item.type == c)
		{
			if (x == tmp->m_item.val)
			{
				num++;
			}
		}
		tmp = tmp->m_next;
	}
	return num;
}

/* Returns true if an itemnode in the list exists with specified type AND value. */
bool Player ::doeshave(char c, int val)
{
	if (DEBUG)
		std ::cout << "[Player]DEBUG:Entering doeshave for " << itemname(c, val) << '\n';
	Item *tmp;
	tmp = m_head;
	while (tmp)
	{
		if (c == tmp->m_item.type)
		{
			if (val == tmp->m_item.val)
			{
				return true;
			}
		}
		tmp = tmp->m_next;
	}
	return false;
}

/*Damage function that takes a player's armor into consideration; to be used for battle. */
void Player ::damage(int x)
{
	static_cast<double>(x);
	if (DEBUG)
		std ::cout << "[Player]DEBUG:In damage function. Defence rating is: " << dfc << " Incoming Damage: " << x << " Adjusted Damage: " << dfc * x << "." << '\n';
	hp = hp - (dfc * x);
}

/* Setters & Getters */
void Player ::setpath(int x)
{
	path = x;
}
int Player::getpath()
{
	return path;
}
void Player ::setdelta(int x)
{
	delta = x;
}
int Player ::getdelta()
{
	return delta;
}
void Player ::sethp(float x)
{
	if (x < 35)
	{
		hp = x;
		return;
	}
	else
	{
		hp = 35;
		return;
	}
}

float Player ::gethp()
{
	return hp;
}
void Player ::setdfc(float x)
{
	dfc = x;
}
void Player ::setsecr(int x)
{
	secr = x;
}
int Player::getsecr()
{
	return secr;
}

float Player ::getdfc()
{
	return dfc;
}
void Player ::setdmg(int x)
{
	dmg = x;
}
int Player ::getdmg()
{
	return dmg;
}
void Player ::setdist(int y)
{
	dist = y;
}
int Player ::getdist()
{
	return dist;
}

void Player ::setbatt(int z)
{
	batt = z;
}
int Player ::getbatt()
{
	return batt;
}
