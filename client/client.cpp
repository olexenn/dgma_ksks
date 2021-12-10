#include "Display.h"
// #include "udp.h"

int main() {
  int counter = 0;
  Display display = Display(700, 450);

  display.drawText(125, 100, RGB(0, 0, 0), 50, 14, "Digital Clock");

  while (1) {
    time_t curTime;
    struct tm *localTime;

    time(&curTime);
    localTime = localtime(&curTime);

    int h = localTime->tm_hour;
    int m = localTime->tm_min;
    int c = localTime->tm_sec;
    int Y = localTime->tm_year + 1900;
    int M = localTime->tm_mon;
    int D = localTime->tm_mday;

    display.fillRoundedRect(100, 200, 500, 200, 20, RGB(255, 224, 46));

    std::string time =
        std::to_string(h) + ":" + std::to_string(m) + ":" + std::to_string(c);
    display.drawText(170, 310, RGB(0, 0, 0), 100, 14, time);
    std::string date =
        std::to_string(D) + "/" + std::to_string(M) + "/" + std::to_string(Y);
    display.drawText(250, 370, RGB(0, 0, 0), 50, 14, date);

    sleep(1);
  }

  return 0;
}
