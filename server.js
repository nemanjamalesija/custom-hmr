import fs from "node:fs/promises";
import path from "node:path";
import http from "node:http";

import express from "express";
import chokidar from "chokidar";
import { WebSocket, WebSocketServer } from "ws";
import { readFile } from "node:fs";
import esbuild from 'esbuild'

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

const watcher = chokidar.watch(path.join(process.cwd(), 'src'), {
  filter: (path) => path.endsWith('.js')
});

watcher.on('ready', () => {
  console.log('Initial scan complete. Files being watched:');
  const watched = watcher.getWatched();
});

watcher.on('add', path => console.log('File added:', path));

watcher.on('change', (filePath) => { // Rename the parameter to avoid shadowing
  console.log('File changed:', filePath, 'at', new Date().toISOString());

  // Calculate the relative path from the project root
  const relativePath = `/${path.relative(process.cwd(), filePath)}`;

  if (socket) {
    const payload = JSON.stringify({
      type: "file:changed",
      file: relativePath,
    });
    socket.send(payload);
  }
});


let analyze = async (entrypoint) => {
  let result = await esbuild.build({
    bundle: true,
    entryPoints: [entrypoint],
    metafile: true,
    write: false,
    platform: "node",
    logLevel: "silent",
    outdir: "dist",
  })

  let dependents = {}
  for (let [input, meta] of Object.entries(result.metafile.inputs)) {
    for (let imp of meta.imports) {
      let rImpPath = path.resolve(imp.path)
      dependents[rImpPath] = dependents[rImpPath] ?? []
      dependents[rImpPath].push(path.resolve(input))
    }
  }
  return dependents
}


/** @type {express.Handler} */
const hmrMiddleware = async (req, res, next) => {
  //

  if (!req.url.endsWith(".js")) {
    return next();
  }

  let client = await fs.readFile(path.join(process.cwd(), "client.js"), "utf8");
  let content = await fs.readFile(path.join(process.cwd(), req.url), "utf8");

    console.log("content:", content);

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
