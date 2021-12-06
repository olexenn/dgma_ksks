#ifndef Display_h
#define Display_h
#include "GraphicsLib.h"
#include "udp.h"

#define RGB(r, g, b) (((r & 0xF8) << 8) | ((g & 0xFC) << 3) | ((b & 0xF8) >> 3))

class Display : public GraphicsLib {
public:
  Display(uint_least16_t w, uint_least16_t h) : GraphicsLib(w, h){};

  void fillScreen(uint_least16_t color) {
    std::string col = rgbToHex(color);
    udp.send("clear_display " + col + "\n");
  }

  void drawText(int_least16_t x, int_least16_t y, uint_least16_t color,
                uint_least16_t font_number, uint_least16_t length,
                std::string text) {
    std::string col = rgbToHex(color);
    udp.send("draw_text " + std::to_string(x) + " " + std::to_string(y) + " " +
             col + " " + std::to_string(font_number) + " " +
             std::to_string(length) + " " + text + "\n");
  }

  void fillRoundedRect(int_least16_t x, int_least16_t y, uint_least16_t width,
                       uint16_t height, uint_least16_t radius,
                       uint_least16_t color) {
    std::string col = rgbToHex(color);
    udp.send("fill_rounded_rectangle " + std::to_string(x) + " " +
             std::to_string(y) + " " + std::to_string(width) + " " +
             std::to_string(height) + " " + std::to_string(radius) + " " + col +
             "\n");
  }

private:
  Udp udp;

  std::string rgbToHex(uint value) {
    unsigned r = (value & 0xF800) >> 11;
    unsigned g = (value & 0x07E0) >> 5;
    unsigned b = value & 0x001F;

    r = (r * 255) / 31;
    g = (g * 255) / 63;
    b = (b * 255) / 31;
    unsigned long d = r * 65536 + g * 256 + b;
    char hexcol[16];

    snprintf(hexcol, sizeof hexcol, "%02X%02X%02X", r, g, b);

    return hexcol;
  }
};

#endif
