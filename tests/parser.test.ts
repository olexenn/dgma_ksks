import Parser from ".././server/src/parser/Parser";
import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { expect } from "chai";
import {Status} from "../server/src/parser/Status";

_chai.should();
_chai.expect;

@suite class ParserTest {
  private SUT: Parser;

  before() {
    this.SUT = new Parser();
  }

  @test 'Clear Display success' () {
    expect(this.SUT.parse("clear_display FFAABB")).to.be.eql({
      status: Status.OK,
      cmd: "clear_display",
      args: ["FFAABB"]
    })
  }
  
  @test 'Draw Pixel success' () {
    expect(this.SUT.parse("draw_pixel 100 100 FFAABB")).to.be.eql({
      status: Status.OK,
      cmd: "draw_pixel",
      args: [100, 100, "FFAABB"]
    })
  }

  @test 'Draw Line success' () {
    expect(this.SUT.parse("draw_line 100 100 120 120 FFAABB")).to.be.eql({
      status: Status.OK,
      cmd: "draw_line",
      args: [100, 100, 120, 120, "FFAABB"]
    })
  }

  @test 'Draw Rectangle success' () {
    expect(this.SUT.parse("draw_rectangle 100 100 10 10 FFAABB")).to.be.eql({
      status: Status.OK,
      cmd: "draw_rectangle",
      args: [100, 100, 10, 10, "FFAABB"]
    })
  }

  @test 'Fill Rectangle success' () {
    expect(this.SUT.parse("fill_rectangle 100 100 10 10 FFAABB")).to.be.eql({
      status: Status.OK,
      cmd: "fill_rectangle",
      args: [100, 100, 10, 10, "FFAABB"]
    })
  }

  @test 'Draw Ellipse success' () {
    expect(this.SUT.parse("draw_ellipse 100 100 5 10 FFAABB")).to.be.eql({
      status: Status.OK,
      cmd: "draw_ellipse",
      args: [100, 100, 5, 10, "FFAABB"]
    })
  }

  @test 'Fill Ellipse success' () {
    expect(this.SUT.parse("fill_ellipse 100 100 5 10 FFAABB")).to.be.eql({
      status: Status.OK,
      cmd: "fill_ellipse",
      args: [100, 100, 5, 10, "FFAABB"]
    })
  }

  @test 'Draw Circle success' () {
    expect(this.SUT.parse("draw_circle 100 100 5 FFAABB")).to.be.eql({
      status: Status.OK,
      cmd: "draw_circle",
      args: [100, 100, 5, "FFAABB"]
    })
  }

  @test 'Fill Circle success' () {
    expect(this.SUT.parse("fill_circle 100 100 5 FFAABB")).to.be.eql({
      status: Status.OK,
      cmd: "fill_circle",
      args: [100, 100, 5, "FFAABB"]
    })
  }

  @test 'Draw Rounded Rectangle success' () {
    expect(this.SUT.parse("draw_rounded_rectangle 100 100 20 20 5 FFAABB")).to.be.eql({
      status: Status.OK,
      cmd: "draw_rounded_rectangle",
      args: [100, 100, 20, 20, 5, "FFAABB"]
    })
  }
  
  @test 'Fill Rounded Rectangle success' () {
    expect(this.SUT.parse("fill_rounded_rectangle 100 100 20 20 5 FFAABB")).to.be.eql({
      status: Status.OK,
      cmd: "fill_rounded_rectangle",
      args: [100, 100, 20, 20, 5, "FFAABB"]
    })
  }

  @test 'Draw Text success' () {
    expect(this.SUT.parse("draw_text 100 100 FFAABB 0 6 hello!")).to.be.eql({
      status: Status.OK,
      cmd: "draw_text",
      args: [100, 100, "FFAABB", 0, 6, "hello!"]
    })
  }

  @test 'Draw Image success' () {
    expect(this.SUT.parse("draw_image 100 100 1 2 FFAABB AAFFBB")).to.be.eql({
      status: Status.OK,
      cmd: "draw_image",
      args: [100, 100, 1, 2, "FFAABB", "AAFFBB"]
    })
  }

  @test 'Set Orientation success' () {
    expect(this.SUT.parse("set_orientation 0")).to.be.eql({
      status: Status.OK,
      cmd: "set_orientation",
      args: [0]
    })
  }

  @test 'Get Width success' () {
    expect(this.SUT.parse("get_width")).to.be.eql({
      status: Status.OK,
      cmd: "get_width",
      args: []
    })
  }

  @test 'Get Height success' () {
    expect(this.SUT.parse("get_height")).to.be.eql({
      status: Status.OK,
      cmd: "get_height",
      args: []
    })
  }


  @test 'Clear Display Bad_Args' () {
    expect(this.SUT.parse("clear_display FFAABB FFAABB")).to.be.eql({
      status: Status.BAD_ARGS,
    })
  }

  @test 'Draw Pixel Bad_Args' () {
    expect(this.SUT.parse("draw_pixel FFAABB FFAABB")).to.be.eql({
      status: Status.BAD_ARGS,
    })
  }

  @test 'Draw Line Bad_Args' () {
    expect(this.SUT.parse("draw_line 100")).to.be.eql({
      status: Status.BAD_ARGS,
    })
  }

  @test 'Draw Rectangle Bad_Args' () {
    expect(this.SUT.parse("draw_rectangle 100")).to.be.eql({
      status: Status.BAD_ARGS,
    })
  }

  @test 'Fill Rectangle Bad_Args' () {
    expect(this.SUT.parse("fill_rectangle 100")).to.be.eql({
      status: Status.BAD_ARGS,
    })
  }

  @test 'Draw Ellipse Bad_Args' () {
    expect(this.SUT.parse("draw_ellipse 100")).to.be.eql({
      status: Status.BAD_ARGS,
    })
  }

  @test 'Fill Ellipse Bad_Args' () {
    expect(this.SUT.parse("fill_ellipse 100")).to.be.eql({
      status: Status.BAD_ARGS,
    })
  }

  @test 'Draw Circle Bad_Args' () {
    expect(this.SUT.parse("draw_circle 100")).to.be.eql({
      status: Status.BAD_ARGS,
    })
  }

  @test 'Fill Circle Bad_Args' () {
    expect(this.SUT.parse("fill_circle 100")).to.be.eql({
      status: Status.BAD_ARGS,
    })
  }

  @test 'Draw Rounded Rectangle Bad_Args' () {
    expect(this.SUT.parse("draw_rounded_rectangle 100")).to.be.eql({
      status: Status.BAD_ARGS,
    })
  }

  @test 'Fill Rounded Rectangle Bad_Args' () {
    expect(this.SUT.parse("fill_rounded_rectangle 100")).to.be.eql({
      status: Status.BAD_ARGS,
    })
  }

  @test 'Draw Text Bad_Args' () {
    expect(this.SUT.parse("draw_text 100")).to.be.eql({
      status: Status.BAD_ARGS,
    })
  }

  @test 'Draw Image Bad_Args' () {
    expect(this.SUT.parse("draw_image 100")).to.be.eql({
      status: Status.BAD_ARGS,
    })
  }

  @test 'Set Orientation Bad_Args' () {
    expect(this.SUT.parse("set_orientation 100 100")).to.be.eql({
      status: Status.BAD_ARGS,
    })
  }

  @test 'Get Width Bad_Args' () {
    expect(this.SUT.parse("get_width 100")).to.be.eql({
      status: Status.BAD_ARGS,
    })
  }

  @test 'Get Height Bad_Args' () {
    expect(this.SUT.parse("get_height 100")).to.be.eql({
      status: Status.BAD_ARGS,
    })
  }

  @test 'Clear Display Format_Error' () {
    expect(this.SUT.parse("clear_display Fabb")).to.be.eql({
      status: Status.CMD_FORMAT_ERROR,
    })
  }

  @test 'Draw Pixel Format_Error' () {
    expect(this.SUT.parse("draw_pixel 100 100 FAB")).to.be.eql({
      status: Status.CMD_FORMAT_ERROR,
    })
  }

  @test 'Draw Line Format_Error' () {
    expect(this.SUT.parse("draw_line a 100 120 120 FFAABB")).to.be.eql({
      status: Status.CMD_FORMAT_ERROR,
    })
  }

  @test 'Draw Rectangle Format_Error' () {
    expect(this.SUT.parse("draw_rectangle 100 ten 20 20 FFAB")).to.be.eql({
      status: Status.CMD_FORMAT_ERROR
    })
  }

  @test 'Fill Rectangle Format_Error' () {
    expect(this.SUT.parse("fill_rectangle two 100 20 20 FFAABB")).to.be.eql({
      status: Status.CMD_FORMAT_ERROR
    })
  }

  @test 'Draw Ellipse Format_Error' () {
    expect(this.SUT.parse("draw_ellipse 8888888888 8888888888 5 10 FFAABB")).to.be.eql({
      status: Status.CMD_FORMAT_ERROR
    })
  }

  @test 'Fill Ellipse Format_Error' () {
    expect(this.SUT.parse("fill_ellipse 100 8888888888 5 10 FAABB")).to.be.eql({
      status: Status.CMD_FORMAT_ERROR
    })
  }

  @test 'Draw Circle Format_Error' () {
    expect(this.SUT.parse("draw_circle 100 100 5 FFABB")).to.be.eql({
      status: Status.CMD_FORMAT_ERROR
    })
  }

  @test 'Fill Circle Format_Error' () {
    expect(this.SUT.parse("fill_circle 8888888888 100 5 FFAAB")).to.be.eql({
      status: Status.CMD_FORMAT_ERROR
    })
  }

  @test 'Draw Rounded Rectangle Format_Error' () {
    expect(this.SUT.parse("draw_rounded_rectangle sss 100 20 20 5 FFABB")).to.be.eql({
      status: Status.CMD_FORMAT_ERROR
    })
  }

  @test 'Fill Rounded Rectangle Format_Error' () {
    expect(this.SUT.parse("fill_rounded_rectangle 100 100 20 20 5 FFABB")).to.be.eql({
      status: Status.CMD_FORMAT_ERROR
    })
  }

  @test 'Draw Text Format_Error' () {
    expect(this.SUT.parse("draw_text 100 100 FFABB 0 6 hello!")).to.be.eql({
      status: Status.CMD_FORMAT_ERROR
    })
  }

  @test 'Draw Image Format_Error' () {
    expect(this.SUT.parse("draw_image 8888888888 100 1 2 FFABB AAFFB")).to.be.eql({
      status: Status.CMD_FORMAT_ERROR
    })
  }

  @test 'Set Orientation Format_Error' () {
    expect(this.SUT.parse("set_orientation portain")).to.be.eql({
      status: Status.CMD_FORMAT_ERROR
    })
  }

  @test 'Clear Display Not Found' () {
    expect(this.SUT.parse("clear_displa FFAABB")).to.be.eql({
      status: Status.CMD_NOT_FOUND,
    })
  }
  
  @test 'Draw Pixel Not Found' () {
    expect(this.SUT.parse("draw_pixe 100 100 FFAABB")).to.be.eql({
      status: Status.CMD_NOT_FOUND,
    })
  }

  @test 'Draw Line Not Found' () {
    expect(this.SUT.parse("raw_line 100 100 120 120 FFAABB")).to.be.eql({
      status: Status.CMD_NOT_FOUND,
    })
  }

  @test 'Draw Rectangle Not FFAABB' () {
    expect(this.SUT.parse("drawrectangle 100 100 10 10 FFAABB")).to.be.eql({
      status: Status.CMD_NOT_FOUND,
    })
  }

  @test 'Fill Rectangle Not Found' () {
    expect(this.SUT.parse("fill_rctangle 100 100 10 10 FFAABB")).to.be.eql({
      status: Status.CMD_NOT_FOUND,
    })
  }

  @test 'Draw Ellipse Not Found' () {
    expect(this.SUT.parse("drw_ellipse 100 100 5 10 FFAABB")).to.be.eql({
      status: Status.CMD_NOT_FOUND,
    })
  }

  @test 'Fill Ellipse Not Found' () {
    expect(this.SUT.parse("fil_ellipse 100 100 5 10 FFAABB")).to.be.eql({
      status: Status.CMD_NOT_FOUND,
    })
  }

  @test 'Draw Circle Not Found' () {
    expect(this.SUT.parse("draw_cicle 100 100 5 FFAABB")).to.be.eql({
      status: Status.CMD_NOT_FOUND,
    })
  }

  @test 'Fill Circle Not Found' () {
    expect(this.SUT.parse("fill_cicle 100 100 5 FFAABB")).to.be.eql({
      status: Status.CMD_NOT_FOUND,
    })
  }

  @test 'Draw Rounded Rectangle Not Found' () {
    expect(this.SUT.parse("draw_rounded_ectangle 100 100 20 20 5 FFAABB")).to.be.eql({
      status: Status.CMD_NOT_FOUND,
    })
  }
  
  @test 'Fill Rounded Rectangle Not Found' () {
    expect(this.SUT.parse("fill_rounded_recangle 100 100 20 20 5 FFAABB")).to.be.eql({
      status: Status.CMD_NOT_FOUND,
    })
  }

  @test 'Draw Text Not Found' () {
    expect(this.SUT.parse("drawtext 100 100 FFAABB 0 6 hello!")).to.be.eql({
      status: Status.CMD_NOT_FOUND,
    })
  }

  @test 'Draw Image Not Found' () {
    expect(this.SUT.parse("drw_image 100 100 1 2 FFAABB AAFFBB")).to.be.eql({
      status: Status.CMD_NOT_FOUND,
    })
  }

  @test 'Set Orientation Not Found' () {
    expect(this.SUT.parse("set_orentation 0")).to.be.eql({
      status: Status.CMD_NOT_FOUND,
    })
  }

  @test 'Get Width Not Found' () {
    expect(this.SUT.parse("gt_width")).to.be.eql({
      status: Status.CMD_NOT_FOUND,
    })
  }

  @test 'Get Height Not Found' () {
    expect(this.SUT.parse("et_height")).to.be.eql({
      status: Status.CMD_NOT_FOUND,
    })
  }
}
