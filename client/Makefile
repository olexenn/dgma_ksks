CC=clang++

clean: client.out
	rm -rf *.o client.out

all: client.out
	./client.out

build: client.cpp udp.h Display.h GraphicsLib.h
	$(CC) -o client.out client.cpp

# client.o: client.cpp Display.h GraphicsLib.h
# 	$(CC) -c client.cpp

# udp.o: udp.cpp udp.h
# 	$(CC) -c udp.cpp
