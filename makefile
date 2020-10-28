game:player.o event.o main.o 
	g++ -Wall -pedantic -g -o game player.o event.o main.o  
main.o: player.h event.h main.cpp header.h
	g++ -Wall -pedantic -g -std=c++1z -c main.cpp
player.o: player.h player.cpp header.h
	g++ -Wall -pedantic -g -std=c++1z -c player.cpp
event.h: event.o event.cpp player.h header.h 
	g++ -Wall -pedantic -g -std=c++1z -c event.cpp
clean: 
	rm -f game game.exe main.o player.o  a.out event.o
