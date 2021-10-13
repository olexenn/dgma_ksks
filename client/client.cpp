#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <netinet/in.h>

#define PORT 33333
#define MAX_LINE 1024

int main()
{
  int sockfd;
  char buf[MAX_LINE];
  struct sockaddr_in servaddr;

  // Инициализируем токен
  if ((sockfd = socket(AF_INET, SOCK_DGRAM, 0)) < 0)
  {
    perror("Ошибка при создании Сокета");
    exit(EXIT_FAILURE);
  }

  memset(&servaddr, 0, sizeof(servaddr));

  servaddr.sin_family = AF_INET;
  servaddr.sin_port = htons(PORT);
  servaddr.sin_addr.s_addr = INADDR_ANY;

  // Вводим команды, пока не наступит "stop"
  while (1)
  {
    printf("Введите Команду для сервера: ");
    fgets(&buf[0], sizeof(buf) - 1, stdin);
    if (!strcmp(&buf[0], "stop\n"))
      break;
    sendto(sockfd, &buf[0], strlen(&buf[0]) - 1, 0, (const struct sockaddr *)&servaddr, sizeof(servaddr));
    printf("Команда была отправлена.\n");
  }

  close(sockfd);
  return 0;
}