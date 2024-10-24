import { createBareServer } from '@tomphttp/bare-server-node';
import express from 'express';
import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import { readFileSync } from 'fs';
import { hostname } from 'os';

const bare = createBareServer('/bare/');
const app = express();

app.use(express.static('static/'));

const httpServer = createHttpServer();

httpServer.on('request', (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

httpServer.on('upgrade', (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

let port = parseInt(process.env.PORT || '');

httpServer.on('listening', () => {
  const address = httpServer.address();

  console.log('HTTP Listening on:');
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  console.log(
    `\thttp://${address.family === 'IPv6' ? `[${address.address}]` : address.address}:${address.port}`
  );
});

httpServer.listen(9092, '0.0.0.0');
