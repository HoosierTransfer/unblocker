import Server from 'bare-server-node';
import http from 'http';
import * as download from 'image-downloader'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const sharp = require('sharp');
import WebSocket, { WebSocketServer } from 'ws';
import nodeStatic from 'node-static';
var https = require('https');
var fs = require('fs');

var Stream = require('stream').Transform;

    var downloadImageFromURL = async (url, filename, callback) => {

    var client = http;
    if (url.toString().indexOf("https") === 0) {
        client = https;
    }

    client.request(url, function(response) {
        var data = new Stream();

        response.on('data', function(chunk) {
            data.push(chunk);
        });

        response.on('end', function() {
            fs.writeFileSync(filename, data.read());
        });
    }).end();
};


const PORT = process.env.PORT || 8080;
const bare = new Server('/bare/', '');

const serve = new nodeStatic.Server('static/');
const fakeServe = new nodeStatic.Server('BlacklistServe/');
const server = http.createServer();
// const ws = new WebSocket('ws://localhost:8080');
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

server.listen(process.env.PORT || 8080);

async function resizeAndSaveImage(url, path, file) {
    await downloadImageFromURL(url, path + '_.png');
    await sleep(1000);
    var img = await sharp(path + '_.png');
    var metadata = await img.metadata();
    await img.resize({width: 150, height: 150}).png().toFile(path + '.png');
    console.log("resize success");
    fs.rmSync(path + '_.png');
    fs.renameSync(path, 'static/img/games/' + file)
}   

var wss = new WebSocketServer({ port: 8081 });

wss.on("connection", ws => {
    // sending message
    ws.on("message", (data) => {
        var data_ = JSON.parse(data);
        if(`${data_.type}` == 'chat') {
        wss.clients.forEach(client=>{
            if(client.readyState === WebSocket.OPEN && `${data_.type}` == 'chat')
                client.send(`${data_.username}` + `: ` + `${data_.value}`);
        })
    }
        if(`${data_.type}` == 'game') {
            resizeAndSaveImage(`${data_.img}`,'tmp/img/' + `${data_.name}`, `${data_.name}` + ".png")
            var new_game = '<button class="web search imagebutton" style="background-image: url(./img/games/' + `${data_.name}` + '.png' + '); background-repeat: none;" onclick="location.href=__uv$config.prefix + __uv$config.encodeUrl("' + `${data_.url}` + '"); timer()">' + `${data_.name}` + '</button>'
            // <button class="web search imagebutton" style="background-image: url(./img/games/impossiblequiz.jpg); background-repeat: none;" onclick="location.href=__uv$config.prefix + __uv$config.encodeUrl('https://krunker.io'); timer()">Impossible Quiz</button>
            fs.appendFileSync("static/g_files.html", new_game)
        }
        
    });

    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
