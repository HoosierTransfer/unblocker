import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    'https://hxyegpdslremfvirwunq.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4eWVncGRzbHJlbWZ2aXJ3dW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3NzM0NjEsImV4cCI6MTk3OTM0OTQ2MX0.h0EMF5FCpam2-IpzANEozOv1WOQXzGNwI32QyG1ELjE'
)

import Server from 'bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';

import * as fs from 'fs';

function parseCookies (request) {
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return list;
}

async function keyExists(key) {
    const { data, error } = await supabase
    .from('secret')
    .select()
    for(var i = 0; i < data.length; i++) {
      if(key === data[i].secrets) {
        return true;
      }
    }
    return false;
  }

const PORT = process.env.PORT || 8080;
const bare = new Server('/bare/', '');
// const serveScience = new nodeStatic.Server('static/science');

const serve = new nodeStatic.Server('static/');
const fakeServe = new nodeStatic.Server('BlacklistServe/');
const server = http.createServer();
const scienceFiles = ['/index2.html', '/Signup.html', '/logon.html'];
console.log("working");

server.on('request', async (request, response) => {
    const accessToken = parseCookies(request).data;
    // console.log(accessToken)

    if(accessToken == null || accessToken == '' || accessToken == undefined) {
        response.writeHead(200, { 'content-type': 'text/html' })
        fs.createReadStream('static/index2.html').pipe(response)
    }

    const { data: { user } } = await supabase.auth.getUser(accessToken)

    const key = user.user_metadata.secret_key;

    const key_valid = await keyExists(key)
    // console.log(scienceFiles.includes(request.rawHeaders[request.rawHeaders.indexOf('X-Original-URI')+1]))
    if(!key_valid) {

        if(!scienceFiles.includes(request.rawHeaders[request.rawHeaders.indexOf('X-Original-URI')+1])){
            request['url'] = '/index2.html'
        }

        // console.log(request)
        
        serve.serve(request, response)

    } else {

    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    // Code from NebulaServices
    var isLS = ip.startsWith('34.216.110') || ip.startsWith('54.244.51') || ip.startsWith('54.172.60') || ip.startsWith('34.203.250') || ip.startsWith('34.203.254');
    if (isLS)
        fakeServe.serve(request, response);
    else {
        
        if (bare.route_request(request, response))
            return true;
        try {
            serve.serve(request, response);
        } catch {
            serve404.serve(request, response);
        }
    }
}
});

server.listen(process.env.PORT || 8080);
