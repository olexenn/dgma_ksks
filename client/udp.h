#ifndef udp_h
#define udp_h

#include <arpa/inet.h>
#include <iostream>
#include <netinet/in.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <unistd.h>

class Udp {
public:
  int sockfd;
  struct sockaddr_in servaddr;

  Udp() {
    if ((sockfd = socket(AF_INET, SOCK_DGRAM, 0)) < 0) {
      perror("Ошибка при создании Сокета");
      exit(EXIT_FAILURE);
    }
    // memset(&servaddr, 0, sizeof(servaddr));

    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(33333);
    servaddr.sin_addr.s_addr = INADDR_ANY;
  };

  void send(std::string message) {
    std::cout << message << std::endl;
    sendto(sockfd, &message[0], strlen(&message[0]), 0,
           (const struct sockaddr *)&servaddr, sizeof(servaddr));
  };
  ~Udp() { close(sockfd); };
};
#endif
