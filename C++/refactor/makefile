game: player.o event.o main.o map.o item.o enemy.o text.o
	g++ -Wall -pedantic -g -o game player.o event.o main.o 

main.o: player.h event.h map.h main.cpp enemy.h header.h
	g++ -Wall -pedantic -g -std=c++1z -c main.cpp

map.o: map.h map.cpp map.h enemy.h event.h
	g++ -Wall -pedantic -g -std=c++1z -c map.cpp

event.h: event.o event.cpp player.h enemy.h text.h header.h 
	g++ -Wall -pedantic -g -std=c++1z -c event.cpp

player.o: player.h player.cpp item.h header.h
	g++ -Wall -pedantic -g -std=c++1z -c player.cpp

item.o: item.h item.cpp header.h 
	g++ -Wall -pedantic -g -std=c++1z -c item.cpp

enemy.o: enemy.h enemy.cpp enemy.h header.h 
	g++ -Wall -pedantic -g -std=c++1z -c enemy.cpp

text.h: text.o text.cpp text.h header.h 
	g++ -Wall -pedantic -g -std=c++1z -c text.cpp

clean: 
	rm -f game game.exe main.o player.o  a.out event.o
