import dgram, { Socket } from "dgram";

class Server {
  private PORT: number;
  private HOST: string;

  private server: Socket;

  constructor() {
    this.PORT = 33333;
    this.HOST = "127.0.0.1";
    this.server = dgram.createSocket("udp4");

    this.server.bind(this.PORT, this.HOST);
  }

  getServer(): Socket {
    return this.server;
  }
}

export default Server;
