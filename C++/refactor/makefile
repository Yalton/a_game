game: player.o event.o main.o map.o item.o enemy.o text.o
	g++ -Wall -pedantic -g -std=c++17 -o game player.o event.o main.o map.o item.o enemy.o text.o

main.o: player.h item.h event.h map.h main.cpp enemy.h header.h
	g++ -Wall -pedantic -g -std=c++17 -c main.cpp

map.o: map.h map.cpp map.h enemy.h event.h header.h
	g++ -Wall -pedantic -g -std=c++17 -c map.cpp

event.h: event.o event.cpp player.h enemy.h text.h header.h 
	g++ -Wall -pedantic -g -std=c++17 -c event.cpp

player.o: player.h player.cpp item.h header.h
	g++ -Wall -pedantic -g -std=c++17 -c player.cpp

item.o: item.h item.cpp header.h 
	g++ -Wall -pedantic -g -std=c++17 -c item.cpp

enemy.o: enemy.h enemy.cpp enemy.h header.h 
	g++ -Wall -pedantic -g -std=c++17 -c enemy.cpp

text.h: text.o text.cpp text.h header.h 
	g++ -Wall -pedantic -g -std=c++17 -c text.cpp

clean: 
	rm -f game player.o event.o main.o map.o item.o enemy.o text.o
