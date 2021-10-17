### Specification

---

Commands will be transferd via UDP socket(port - 33333).
One Command per packet.
Packet only use ASCII.

In each packet you can send command and it's arguments. List of commands and their parameters:

- `clear_display color`
- `draw_pixel x0 y0 color`
- `draw_line x0 y0 x1 y1 color`
- `draw_rectangle x0 y0 w h color`
- `fill_rectangle x0 y0 w h color`
- `draw_ellipse x0 y0 radius_x radius_y color`
- `fill_ellipse x0 y0 radius_x radius_y color`
- `draw_circle x0 x0 radius color`
- `fill_circle x0 y0 radius color`
- `draw_rounded_rectangle x0 y0 w h radius color`
- `fill_rounded_rectangle x0 y0 w h radius color`
- `draw_text x0 y0 color font_number length text`
- `draw_image x0 y0 w h data`
- `set_orientation orientation`
- `get_width`
- `get_height`

Last 2 commands don't have any parameters

---

Parameters' types:

- `color` - 6 symbols of color code of RGB888;
- `x0`, `y0`, `x1`, `y1`, `w`, `h`, `radius_x`, `radius_y`, `radius`, `length` - integer number [0 : 999999];
- `font_number` - integer number [0 : 999999];
- `text` - ASCII-symbols, that must be interpreted as array of ASCII-symbols with length `length`;
- `data` - ASCII-symbols, which element has type `color` - 6 symbols of color code of RGB888, number of elements is `w*h`,
- `orientation` - integer number [0 : 3], where 0 - 0 degrees, 1 - 90 degrees, 2 - 180 degrees, 3 - 270 degrees;

---

Commands `get_width` and `get_height` must return integer number [0 : 65535].

---

If there is a typo in command or unknown command server will return `-3` status code(which means `commad not found`)
If number of args differs from specification then server will return `-1` status code(which means `bad arguments`)
If type of argument is wrong server will return `-2` status code(which means `comamnd format error`)
If everything is ok then server will return `0` status code(which means `ok`)

---

Commands example:

- `clear_display FFAABB`
- `draw_pixel 100 100 FFAABB`
- `draw_line 100 100 120 120 FFAABB`
- `draw_rectangle 100 100 20 20 FFAABB`
- `fill_rectangle 100 100 20 20 FFAABB`
- `draw_ellipse 100 100 5 10 FFAABB`
- `fill_ellipse 100 100 5 10 FFAABB`
- `draw_circle 100 100 5 FFAABB`
- `fill_circle 100 100 5 FFAABB`
- `draw_rounded_rectangle 100 100 20 20 5 FFAABB`
- `fill_rounded_rectangle 100 100 20 20 5 FFAABB`
- `draw_text 100 100 FFAABB 0 6 hello!`
- `draw_image 100 100 1 2 [FFAABB, AAFFBB]`
- `set_orientation 0`
- `get_width`
- `get_height`

---
