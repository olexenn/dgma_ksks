import dgram, { Socket } from 'dgram'
import { AddressInfo } from 'net';
import Parser from './parser/Parser'
import { ParserOutput } from './types';

const PORT: number = 33333;
const HOST: string = '127.0.0.1';

const server: Socket = dgram.createSocket('udp4');

const parser: Parser = new Parser();

server.on('listening', () => {
  const address: AddressInfo = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.on('error', (err: Error) => {
  console.error(`Error: ${err}`);
  server.close();
})

server.on('message', (msg: Buffer, rinfo: dgram.RemoteInfo) => {
  console.log(`from ${rinfo.address}:${rinfo.port} server got: ${msg} `)
  const parsedCommand: ParserOutput = parser.parse(msg.toString());
  if (parsedCommand.status === -1) console.log("Format Error");
  else if (parsedCommand.status === -2) console.log("Bad Arguments");
  else if (parsedCommand.status === -3) console.log("Unknown Command");
  else console.log(parsedCommand)
})

server.bind(PORT, HOST);