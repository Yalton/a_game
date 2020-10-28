#ifndef EVENT_H
#define EVENT_H
#include "player.h"
#include "header.h"
using namespace std;
class Event
{
private:
	typedef struct monster
	{
		string name;
		int hp = 0;
		int dmg = 0;
	};
	class Path
	{
	public:
		Path(int dist, int evt, int weath, Path *next)
		{
			m_dist = dist;
			m_evt = evt;
			m_weath = weath;
			m_next = next;
		}
		int m_dist;
		int m_evt;
		int m_weath;
		Path *m_next;
	};
	Path *m_start;

public:
	//List Functions
	Event();
	~Event();
	void buildpath(Player *obj);
	int getdist();
	bool empty();
	int getevt();

	//Supporter Event functions
	void itemeffect(char type, int x, Player *obj);
	int useitem(char type, Player *obj);
	int promptitem(Player *obj, char type);
	void print();
	monster monstinfo(int id);
	int Decider(int umove, int enmove, int adv, int dmg, Player *you, monster *enem);
	void getitem(Player *obj);
	char randitem();
	void next(Player *obj);
	void genranditem(char &type, int &id);
	void wormhole(int x, Player *obj);
	void ghostnext(Player *obj, int dist);

	// Event Functions
	int eventable(int Evt, Player *obj);
	void cave(Player *obj);
	void start(Player *obj);
	void whalebones(Player *obj);
	void fog(Player *obj);
	void shop(Player *obj);
	void lighthouse(Player *obj);
	void fishing(Player *obj);
	void unevent(Player *obj);
	void battle(Player *obj, int Id);
	void sharkordolphin(Player *obj);
	void outcrop(Player *obj);
	void oldman(Player *obj);
	void tree(Player *obj);
	void mansion(Player *obj);
	void pirateship(Player *obj);
	void end(Player *obj); 

	//Unfinished Event functions
	void shippingcon(Player *obj);
	void well(Player *obj);
};
#endif
