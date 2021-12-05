import { ParserOutput } from "../types";
import { Status } from "./Status";

class Parser {
  readonly commands = [
    "clear_display",
    "draw_pixel",
    "draw_line",
    "draw_rectangle",
    "fill_rectangle",
    "draw_ellipse",
    "fill_ellipse",
    "draw_circle",
    "fill_circle",
    "draw_rounded_rectangle",
    "fill_rounded_rectangle",
    "draw_text",
    "draw_image",
    "set_orientation",
    "get_width",
    "get_height",
  ];

  funcs = [
    this.parseClearDisplay,
    this.parseDrawPixel,
    this.parseDrawLine,
    this.parseDrawRectangle,
    this.parseFillRectangle,
    this.parseDrawEllipse,
    this.parseFillEllipse,
    this.parseDrawCircle,
    this.parseFillCircle,
    this.parseDrawRoundedRectangle,
    this.parseFillRoundedRectangle,
    this.parseDrawText,
    this.parseDrawImage,
    this.parseSetOrientation,
    this.parseGetWidth,
    this.parseGetHeight,
  ]

  parse(message: string): ParserOutput {
    const cmd: Array<string> = message.split(" ");
    if (this.commands.includes(cmd[0])) {
      return this.funcs[this.commands.indexOf(cmd[0])](cmd);
    }
    return Parser.genOutput(Status.CMD_NOT_FOUND, cmd, 0);
  }

  private static properArgType(arg: string): number|string {
    if (isNaN(Number(arg))) {
      return arg;
    } 
    return Number(arg);
  }

  private static genOutput(status: Status, cmd: Array<string>, num: number): ParserOutput {
    if (status !== Status.OK) {
      return { status: status };
    } else {
      const args: Array<string|number> = [];
      for (let i = 1; i < num; i++) {
        args.push(Parser.properArgType(cmd[i]));
      }

      return {
        status: status,
        cmd: cmd[0],
        args: args
      };
    }
  }

  private static wrongCmdLen(cmd: Array<string>, num: number): boolean {
    return cmd.length !== num ? true : false;
  }

  private static checkReg(cmd: Array<string>, reg: RegExp): boolean {
    return cmd.join(" ").match(reg) ? true : false;
  }

  private parseClearDisplay(cmd: Array<string>): ParserOutput {
    if (Parser.wrongCmdLen(cmd, 2)) return Parser.genOutput(Status.BAD_ARGS, cmd, 0);
    else if (Parser.checkReg(cmd, /^clear_display [A-F0-9]{6}$/)) {
      return Parser.genOutput(Status.OK, cmd, 2)
    }
    return Parser.genOutput(Status.CMD_FORMAT_ERROR, cmd, 0)
  }

  private parseDrawPixel(cmd: Array<string>): ParserOutput {
    if (Parser.wrongCmdLen(cmd, 4)) return Parser.genOutput(Status.BAD_ARGS, cmd, 0);
    else if (Parser.checkReg(cmd, /^draw_pixel [0-9]{1,6} [0-9]{1,6} [A-F0-9]{6}$/)) {
      return Parser.genOutput(Status.OK, cmd, 4)
    }
    return Parser.genOutput(Status.CMD_FORMAT_ERROR, cmd, 0)
  }

  private parseDrawLine(cmd: Array<string>): ParserOutput {
    if (Parser.wrongCmdLen(cmd, 6)) return Parser.genOutput(Status.BAD_ARGS, cmd, 0);
    else if(Parser.checkReg(cmd, /^draw_line [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [A-F0-9]{6}$/)) {
      return Parser.genOutput(Status.OK, cmd, 6);
    }
    return Parser.genOutput(Status.CMD_FORMAT_ERROR, cmd, 0)
  }

  private parseDrawRectangle(cmd: Array<string>): ParserOutput {
    if (Parser.wrongCmdLen(cmd, 6)) return Parser.genOutput(Status.BAD_ARGS, cmd, 0);
    else if(Parser.checkReg(cmd, /^draw_rectangle [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [A-F0-9]{6}$/)) {
      return Parser.genOutput(Status.OK, cmd, 6);
    }
    return Parser.genOutput(Status.CMD_FORMAT_ERROR, cmd, 0)
  }

  private parseFillRectangle(cmd: Array<string>): ParserOutput {
    if (Parser.wrongCmdLen(cmd, 6)) return Parser.genOutput(Status.BAD_ARGS, cmd, 0);
    else if (Parser.checkReg(cmd, /^fill_rectangle [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [A-F0-9]{6}$/)) {
      return Parser.genOutput(Status.OK, cmd, 6);
    }
    return Parser.genOutput(Status.CMD_FORMAT_ERROR, cmd, 0)
  }

  private parseDrawEllipse(cmd: Array<string>): ParserOutput {
    if (Parser.wrongCmdLen(cmd, 6)) return Parser.genOutput(Status.BAD_ARGS, cmd, 0);
    else if (Parser.checkReg(cmd,  /^draw_ellipse [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [A-F0-9]{6}$/)) {
      return Parser.genOutput(Status.OK, cmd, 6);
    }
    return Parser.genOutput(Status.CMD_FORMAT_ERROR, cmd, 0)
  }

  private parseFillEllipse(cmd: Array<string>): ParserOutput {
    if (Parser.wrongCmdLen(cmd, 6)) return Parser.genOutput(Status.BAD_ARGS, cmd, 0);
    else if (Parser.checkReg(cmd, /^fill_ellipse [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [A-F0-9]{6}$/)) {
      return Parser.genOutput(Status.OK, cmd, 6);
    }
    return Parser.genOutput(Status.CMD_FORMAT_ERROR, cmd, 0)
  }

  private parseDrawCircle(cmd: Array<string>): ParserOutput {
    if (Parser.wrongCmdLen(cmd, 5)) return Parser.genOutput(Status.BAD_ARGS, cmd, 0);
    else if (Parser.checkReg(cmd, /^draw_circle [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [A-F0-9]{6}$/)) {
      return Parser.genOutput(Status.OK, cmd, 5);
    }
    return Parser.genOutput(Status.CMD_FORMAT_ERROR, cmd, 0)
  }

  private parseFillCircle(cmd: Array<string>): ParserOutput {
    if (Parser.wrongCmdLen(cmd, 5)) return Parser.genOutput(Status.BAD_ARGS, cmd, 0);
    else if (Parser.checkReg(cmd, /^fill_circle [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [A-F0-9]{6}$/)) {
      return Parser.genOutput(Status.OK, cmd, 5);
    }
    return Parser.genOutput(Status.CMD_FORMAT_ERROR, cmd, 0)
  }

  private parseDrawRoundedRectangle(cmd: Array<string>): ParserOutput {
    if (Parser.wrongCmdLen(cmd, 7)) return Parser.genOutput(Status.BAD_ARGS, cmd, 0);
    else if (Parser.checkReg(cmd, /^draw_rounded_rectangle [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [A-F0-9]{6}$/)) {
      return Parser.genOutput(Status.OK, cmd, 7);
    }
    return Parser.genOutput(Status.CMD_FORMAT_ERROR, cmd, 0)
  }

  private parseFillRoundedRectangle(cmd: Array<string>): ParserOutput {
    if (Parser.wrongCmdLen(cmd, 7)) return Parser.genOutput(Status.BAD_ARGS, cmd, 0);
    else if (Parser.checkReg(cmd, /^fill_rounded_rectangle [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [A-F0-9]{6}$/)) {
      return Parser.genOutput(Status.OK, cmd, 7);
    }
    return Parser.genOutput(Status.CMD_FORMAT_ERROR, cmd, 0)
  }

  private parseDrawText(cmd: Array<string>): ParserOutput {
    if (Parser.wrongCmdLen(cmd, 7)) return Parser.genOutput(Status.BAD_ARGS, cmd, 0);
    else if (Parser.checkReg(cmd,  /^draw_text [0-9]{1,6} [0-9]{1,6} [A-F0-9]{6} [0-9]{1,6} [0-9]{1,6} .+$/)) {
      return Parser.genOutput(Status.OK, cmd, 7);
    }
    return Parser.genOutput(Status.CMD_FORMAT_ERROR, cmd, 0)
  }

  private parseDrawImage(cmd: Array<string>): ParserOutput {
    if (cmd.length < 6) return Parser.genOutput(Status.BAD_ARGS, cmd, 0);
    if (Parser.checkReg(cmd, /^draw_image [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [0-9]{1,6} [A-F0-9]{6}(?: [A-F0-9]{6})*$/)) {
      const num: number = Number(cmd[3]) * Number(cmd[4]) + 5;
      if (Parser.wrongCmdLen(cmd, num)) return Parser.genOutput(Status.BAD_ARGS, cmd, 0);
      return Parser.genOutput(Status.OK, cmd, cmd.length);
    }
    return Parser.genOutput(Status.CMD_FORMAT_ERROR, cmd, 0)
  }

  private parseSetOrientation(cmd: Array<string>): ParserOutput {
    if (Parser.wrongCmdLen(cmd, 2)) return Parser.genOutput(Status.BAD_ARGS, cmd, 0);
    else if (Parser.checkReg(cmd, /^set_orientation [0-3]$/)) {
      return Parser.genOutput(Status.OK, cmd, 2);
    }
    return Parser.genOutput(Status.CMD_FORMAT_ERROR, cmd, 0)
  }

  private parseGetWidth(cmd: Array<string>): ParserOutput {
    if (Parser.wrongCmdLen(cmd, 1)) return Parser.genOutput(Status.BAD_ARGS, cmd, 0)
    else if (Parser.checkReg(cmd, /^get_width$/)) return Parser.genOutput(Status.OK, cmd, 0);
    return Parser.genOutput(Status.CMD_FORMAT_ERROR, cmd, 0)
  }

  private parseGetHeight(cmd: Array<string>): ParserOutput {
    if (Parser.wrongCmdLen(cmd, 1)) return Parser.genOutput(Status.BAD_ARGS, cmd, 0)
    else if (Parser.checkReg(cmd, /^get_height/)) return Parser.genOutput(Status.OK, cmd, 0);
    return Parser.genOutput(Status.CMD_FORMAT_ERROR, cmd, 0)
  }
}

export default Parser;
