import Server from 'bare-server-node';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import http from 'http';
const socketIO = require('socket.io');
import nodeStatic from 'node-static';
import { createClient } from '@supabase/supabase-js';
const WebSocket = require('ws');
var supabase;

const clients = new Map();

//24342
supabase = createClient('https://hxyegpdslremfvirwunq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4eWVncGRzbHJlbWZ2aXJ3dW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3NzM0NjEsImV4cCI6MTk3OTM0OTQ2MX0.h0EMF5FCpam2-IpzANEozOv1WOQXzGNwI32QyG1ELjE');
const PORT = process.env.PORT || 8080;
const bare = new Server('/bare/', '');

const wss = new WebSocket.Server({ port: 7071 });
const serve = new nodeStatic.Server('static/');
const fakeServe = new nodeStatic.Server('BlacklistServe/');
const server = http.createServer();
let io = socketIO(server)
io = require('socket.io').listen(server);
console.log("working");

server.on('request', (request, response) => {
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    // Code from NebulaServices
    var isLS = ip.startsWith('34.216.110') || ip.startsWith('54.244.51') || ip.startsWith('54.172.60') || ip.startsWith('34.203.250') || ip.startsWith('34.203.254');

    if (isLS)
        fakeServe.serve(request, response);
    else {
        
        if (bare.route_request(request, response))
            return true;

        serve.serve(request, response);
    }
});

io.on('connection', (socket)=>{
    console.log('New user connected');
});

server.listen(process.env.PORT || 8080);
