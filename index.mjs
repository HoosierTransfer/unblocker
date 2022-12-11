import Server from 'bare-server-node';
import http from 'http';
// import * as download from 'image-downloader'
import { createRequire, findSourceMap } from "module";
const require = createRequire(import.meta.url);
// const sharp = require('sharp');
const crypto = require('crypto')
import WebSocket, { WebSocketServer } from 'ws';
import nodeStatic from 'node-static';
var https = require('https');
var fs = require('fs');
var id = 0;
var lookup = {};
var users = {};
const algorithm = 'aes-192-cbc';


// async function chat(password, salt, text, client) {
//     //const encIv = crypto.createHash('sha256').update(iv).digest('hex').substring(0,16)
//     const salt_ = crypto.createHash('sha256').update(salt).digest('hex').substring(0,16)
//     var cipher;
//     const iv = Buffer.alloc(16, 0);
//     const key = crypto.scryptSync(password, salt_, 24);
//     cipher = crypto.createCipheriv(algorithm, key, iv);
//     var encrypted = cipher.update(text);
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
//     client.send(JSON.stringify({value: encrypted.toString('hex'), type: 'chat'}));
//     console.log(encrypted.toString('hex'))
//     return encrypted.toString('hex');
// }
async function chat(client, text) {
    client.send(JSON.stringify({value: text, type: 'chat'}));
}

// async function signUp(email_, password_, key) {
//     const { data_, error1 } = await supabase.from(keys).select();
//     var keys = [];
//     for(var i = 0; i < data_.data.length; i++) {
//         keys[i] = data_.data[i];
//     }
//     const { admin, error_admin } = await supabase.from(keys).select();
//     var admin_keys = [];
//     for(var i = 0; i < admin.data.length; i++) {
//         admin_keys[i] = admin.data[i];
//     }
//     const { usedKeys, error_used } = await supabase.from(keys).select();
//     var used_keys = [];
//     for(var i = 0; i < usedKeys.data.length; i++) {
//         used_keys[i] = usedKeys.data[i];
//     }
//     if((keys.includes(key) || admin_keys.includes(key) && !used_keys.includes(key))) {
//     const { data, error } = await supabase.auth.signUp({
//         email: email_,
//         password: password_,
//         options: {
//             data: {
//                 secret: key,
//             }
//           }
//     });
//     return true;
// }
//     return false;
// }

// var Stream = require('stream').Transform;

//     var downloadImageFromURL = async (url, filename, callback) => {

//     var client = http;
//     if (url.toString().indexOf("https") === 0) {
//         client = https;
//     }

//     client.request(url, function(response) {
//         var data = new Stream();

//         response.on('data', function(chunk) {
//             data.push(chunk);
//         });

//         response.on('end', function() {
//             fs.writeFileSync(filename, data.read());
//         });
//     }).end();
// };


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

// async function resizeAndSaveImage(url, path, file) {
//     await downloadImageFromURL(url, path + '_.png');
//     await sleep(1000);
//     var img = await sharp(path + '_.png');
//     var metadata = await img.metadata();
//     await img.resize({width: 150, height: 150}).png().toFile(path + '.png');
//     console.log("resize success");
//     fs.rmSync(path + '_.png');
//     fs.renameSync(path + ".png", 'static/img/games/' + file)
// }   

var wss = new WebSocketServer({ port: 8081 });

wss.on("connection", ws => {

    ws.id = id++;
    lookup[ws.id] = {socket: ws, username: 'anon'};
    // sending message
    ws.on("message", (data) => {
        var data_ = JSON.parse(data);
        if(`${data_.type}` == 'connected') {
            lookup[ws.id].username = `${data_.value}`;
        }
        if(`${data_.type}` == 'chat') {
        wss.clients.forEach(client=>{
            if(client.readyState === WebSocket.OPEN && `${data_.type}` == 'chat')
                // var enc = encrypted_chat(`${data_.value}`, '727wysi', `${data_.value}`, client); 
                chat(client, lookup[ws.id].username);
                // client.send(JSON.stringify({value: `${data_.value}`, type: 'chat'}));
                console.log(`${data_.value}`); 
        })
    }
        if(`${data_.type}` == 'game') {
            resizeAndSaveImage(`${data_.img}`,'tmp/img/' + `${data_.name}`, `${data_.name}` + ".png")
            var new_game = '<button class="web search imagebutton" style="background-image: url(./img/games/' + `${data_.name}` + '.png' + '); background-repeat: none;" type='button' onclick="location.href=__uv$config.prefix + __uv$config.encodeUrl(' + `'${data_.url}'` + '); timer()">' + `${data_.name}` + '</button>'
            // <button class="web search imagebutton" style="background-image: url(./img/games/impossiblequiz.jpg); background-repeat: none;" type='button' onclick="location.href=__uv$config.prefix + __uv$config.encodeUrl('https://krunker.io'); timer()">Impossible Quiz</button>
            fs.appendFileSync("static/g_files.html", new_game)
        }       
    });

    ws.on('close', function () {
        delete lookup[ws.id]
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
