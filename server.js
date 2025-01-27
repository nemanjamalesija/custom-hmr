import fs from "node:fs/promises";
import path from "node:path";
import http from "node:http";

import express from "express";
import chokidar from "chokidar";
import { WebSocket, WebSocketServer } from "ws";
import { readFile } from "node:fs";

const app = express();
const server = http.createServer(app);
const ws = new WebSocketServer({
  server,
});

/** @type {WebSocket} */
let socket;

ws.on("connection", (_socket) => {
  console.log("Connected...");
  socket = _socket;
});

const watchPath = path.join(process.cwd(), 'src');
console.log('Watching directory:', watchPath);

const watcher = chokidar.watch(watchPath, {
  persistent: true,
  ignoreInitial: false,
  followSymlinks: true,
  usePolling: true,
  interval: 100,
  depth: 1,
  awaitWriteFinish: {
    stabilityThreshold: 500,
    pollInterval: 100
  },
  ignored: /(^|[\/\\])\../,  // ignore dotfiles
  filter: (path) => path.endsWith('.js')
});

// Debug logging
watcher.on('ready', () => {
  console.log('Initial scan complete. Files being watched:');
  const watched = watcher.getWatched();
  Object.keys(watched).forEach(dir => {
    console.log(`Directory ${dir}:`, watched[dir]);
  });
});

watcher.on('add', path => console.log('File added:', path));
watcher.on('change', path => {
  console.log('File changed:', path, 'at', new Date().toISOString());
  if (socket) {
    const payload = JSON.stringify({
      type: "file:changed",
      file: `/${path}`,
    });
    socket.send(payload);
  }
});

/** @type {express.Handler} */
const hmrMiddleware = async (req, res, next) => {
  //

  if (!req.url.endsWith(".js")) {
    return next();
  }

  let client = await fs.readFile(path.join(process.cwd(), "client.js"), "utf8");
  let content = await fs.readFile(path.join(process.cwd(), req.url), "utf8");

  content = `
  ${client}

  hmrClient(import.meta)

  ${content}
  `;

  res.type(".js");
  res.send(content);
};

app.use(hmrMiddleware);
app.use(express.static(process.cwd()));

server.listen(8080, () => console.log("Listening on port 8080"));
