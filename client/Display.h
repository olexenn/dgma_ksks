#ifndef Display_h
#define Display_h
#include "GraphicsLib.h"
#include "udp.h"

class Display : public GraphicsLib {
public:
  Display(uint_least16_t w, uint_least16_t h) : GraphicsLib(w, h){};

  void fillScreen(uint_least16_t color) {
    udp.send("clear_display " + rgbToHex(color) + "\n");
  }

  void drawPixel(int_least16_t x0, int_least16_t y0, uint_least16_t color) {
    udp.send("draw_pixel " + std::to_string(x0) + " " + std::to_string(y0) +
             " " + rgbToHex(color));
  }

  void drawLine(int_least16_t x0, int_least16_t y0, int_least16_t x1,
                int_least16_t y1, uint_least16_t color) {
    udp.send("draw_line " + std::to_string(x0) + " " + std::to_string(y0) +
             " " + std::to_string(x1) + " " + std::to_string(y1) + " " +
             rgbToHex(color));
  }

  void drawRect(int_least16_t x0, int_least16_t y0, int_least16_t w,
                int_least16_t h, uint_least16_t color) {
    udp.send("draw_rectangle " + std::to_string(x0) + " " + std::to_string(y0) +
             " " + std::to_string(w) + " " + std::to_string(h) + " " +
             rgbToHex(color));
  }

  void fillRect(int_least16_t x0, int_least16_t y0, int_least16_t w,
                int_least16_t h, uint_least16_t color) {
    udp.send("fill_rectangle " + std::to_string(x0) + " " + std::to_string(y0) +
             " " + std::to_string(w) + " " + std::to_string(h) + " " +
             rgbToHex(color));
  }

  void drawEllipse(int_least16_t x0, int_least16_t y0, int_least16_t r_x,
                   int_least16_t r_y, uint_least16_t color) {
    udp.send("draw_ellipse " + std::to_string(x0) + " " + std::to_string(y0) +
             " " + std::to_string(r_x) + " " + std::to_string(r_y) + " " +
             rgbToHex(color));
  }

  void fillEllipse(int_least16_t x0, int_least16_t y0, int_least16_t r_x,
                   int_least16_t r_y, uint_least16_t color) {
    udp.send("fill_ellipse " + std::to_string(x0) + " " + std::to_string(y0) +
             " " + std::to_string(r_x) + " " + std::to_string(r_y) + " " +
             rgbToHex(color));
  }

  void drawText(int_least16_t x, int_least16_t y, uint_least16_t color,
                uint_least16_t font_number, uint_least16_t length,
                std::string text) {
    std::cout << color << std::endl;
    udp.send("draw_text " + std::to_string(x) + " " + std::to_string(y) + " " +
             rgbToHex(color) + " " + std::to_string(font_number) + " " +
             std::to_string(length) + " " + text);
  }

  void fillRoundedRect(int_least16_t x, int_least16_t y, uint_least16_t width,
                       uint16_t height, uint_least16_t radius,
                       uint_least16_t color) {
    std::cout << color << std::endl;
    udp.send("fill_rounded_rectangle " + std::to_string(x) + " " +
             std::to_string(y) + " " + std::to_string(width) + " " +
             std::to_string(height) + " " + std::to_string(radius) + " " +
             rgbToHex(color));
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
    // unsigned long d = r * 65536 + g * 256 + b;
    char hexcol[16];

    snprintf(hexcol, sizeof hexcol, "%02X%02X%02X", r, g, b);

    return hexcol;
  }
};

#endif
