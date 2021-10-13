import dgram, { Socket } from 'dgram'
import { AddressInfo } from 'net';

const PORT: number = 33333;
const HOST: string = '127.0.0.1';

const server: Socket = dgram.createSocket('udp4');

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
})

server.bind(PORT, HOST);