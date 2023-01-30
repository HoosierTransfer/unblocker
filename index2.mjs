import createBareServer from "@tomphttp/bare-server-node";
import express from "express";
import cookieParser from 'cookie-parser'
import { createClient } from '@supabase/supabase-js';
import { body, validationResult} from 'express-validator';
import { createServer } from "node:http";
import { hostname } from "node:os";

const supabase = createClient(
  'https://hxyegpdslremfvirwunq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4eWVncGRzbHJlbWZ2aXJ3dW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3NzM0NjEsImV4cCI6MTk3OTM0OTQ2MX0.h0EMF5FCpam2-IpzANEozOv1WOQXzGNwI32QyG1ELjE'
)

async function keyExists(key) {
  const { data, error} = await supabase.from('keys').select()
  for(var i = 0; i < data.length; i++) {
    if(key === data[i].key) {
      return true;
    }
  }
}

async function createUser(email, password, key, res) {
//   if(!keyExists(key)) {
//     return "Key doesnt exist";
//   }
  const { user, session, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
    data: {
      secret_key: key
    }
  }
})
const now = new Date();
const time = now.getTime() + 3600 * 1000 * 24;
now.setTime(time);

res.cookie("data", session.access_token, { expires: now.toUTCString() })
res.cookie("refToken", session.refresh_token, { expires: now.toUTCString() })
}


const bare = createBareServer("/bare/");
const app = express();


app.use(express.urlencoded({
  extended: true
}))

app.use(cookieParser());

app.use(express.static("static/"));

app.post('/signup', body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 8 }), (req, res) => {
  const errors = validationResult(req);
  res.cookie("data", 'a')
  if(true) {
    const email = req.body.email;
    console.log(email)
    createUser(res.body.email, res.body.password, res.body.key, res)
  }
  res.end()
})

// app.use((req, res) => {
//     res.status(404);
//     // res.sendFile("static/404/index.html");
// });

const server = createServer();

server.on("request", (req, res) => {
    if (bare.shouldRoute(req)) {
      bare.routeRequest(req, res);
    } else {
      app(req, res);
    }
});

server.on("upgrade", (req, socket, head) => {
    if (bare.shouldRoute(req)) {
      bare.routeUpgrade(req, socket, head);
    } else {
      socket.end();
    }
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8080;

server.on("listening", () => {
  const address = server.address();

  // by default we are listening on 0.0.0.0 (every interface)
  // we just need to list a few
  console.log("Listening on:");
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  console.log(
    `\thttp://${
      address.family === "IPv6" ? `[${address.address}]` : address.address
    }:${address.port}`
  );
});

server.listen({
  port,
});

