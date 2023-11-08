import { createBareServer } from '@tomphttp/bare-server-node';
import express from "express";
import { createServer } from "node:http";
import { hostname } from "node:os";
// import proxy from "express-http-proxy";
// import { createProxyMiddleware, responseInterceptor } from "http-proxy-middleware";

const bare = createBareServer("/bare/");
const app = express();

app.use(express.static("static/"));

const server = createServer();

// app.use(
//   "/",
//   proxy("http://localhost:8080", {
//     userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
//       // if (userResData && userResData.toString().includes("text/html")) {
//         // Modify the HTML response here by adding text to the top of the body
//         const modifiedHTML = "<h1>Injected Text</h1>" + userResData.toString();
//         return modifiedHTML;
//     },
//   })
// );

// app.use('/proxy', proxy('www.google.com', {
//   userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
//     return "hi";
//   }
// }));

// const injected_code = `<script>
// document.addEventListener('keydown', function (event) {
//   if (event.ctrlKey && event.shiftKey && event.key === 'ArrowLeft') {
//     // Simulate the browser's back functionality
//     window.history.back();
//   }
// });

// document.addEventListener('keydown', function (event) {
//   if (event.ctrlKey && event.shiftKey && event.key === 'ArrowRight') {
//     // Simulate the browser's back functionality
//     window.history.forward();
//   }
// });
// </script>`;

// const a = proxy('localhost:8080', {
//   userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
//     if (proxyRes.headers["content-type"] && proxyRes.headers["content-type"].includes("text/html")) {
//       let data = proxyResData.toString('utf8');
//       data = "<h1>Injected Text</h1>" + data;
//       const contentLength = Buffer.byteLength(data, 'utf8');
//       userRes.setHeader("Content-Length", contentLength);
//       console.log(data);
//       return data;
//     }
//     return proxyResData;
//   }
// })

// app.use(
//   "/sus",
//   proxy("http://localhost:8080", {
//     userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
//       if (proxyRes.headers["content-type"] && proxyRes.headers["content-type"].includes("text/html")) {
//         const originalResponse = proxyResData.toString();

//         // Check if the HTML response has a <body> tag
//         if (originalResponse.includes("<body>")) {
//           // Split the HTML into head and body parts
//           const [head, body] = originalResponse.split("<head>");
          
//           // Modify the HTML response by adding text to the top of the body
//           const modifiedHTML = `${head}<head>${injected_code}${body}`;

//          const contentLength = Buffer.byteLength(modifiedHTML, 'utf8');
//          userRes.setHeader("Content-Length", contentLength);
          
//           return modifiedHTML;
//         }
//       }
//       return proxyResData;
//     },
//   })
// );

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

