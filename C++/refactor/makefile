game:player.o event.o main.o map.o
	g++ -Wall -pedantic -g -o game player.o event.o main.o  
main.o: player.h event.h main.cpp header.h
	g++ -Wall -pedantic -g -std=c++1z -c main.cpp
player.o: player.h player.cpp header.h
	g++ -Wall -pedantic -g -std=c++1z -c player.cpp
item.o: item.h item.cpp header.h
	g++ -Wall -pedantic -g -std=c++1z -c item.cpp
map.o: map.h map.cpp map.h
	g++ -Wall -pedantic -g -std=c++1z -c map.cpp
event.h: event.o event.cpp player.h header.h 
	g++ -Wall -pedantic -g -std=c++1z -c event.cpp
text.h: text.o text.cpp text.h header.h 
	g++ -Wall -pedantic -g -std=c++1z -c text.cpp
clean: 
	rm -f game game.exe main.o player.o  a.out event.o
