const express = require("express");
const path = require("path");
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

// 1. Create and configure the LiveReload server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "src"));

// Ping the browser when files change
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const app = express();
const PORT = 3500;

// 2. Add the LiveReload middleware to Express (MUST be before serving static files)
app.use(connectLiveReload());

// 3. Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "src")));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
