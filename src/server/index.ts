import path from "path";
import fs from "fs";

import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";

import { App } from "../client/App";

const app = express();

app.get('/', (req, res) => {
  res.socket.on('error', (error) => console.log('Fatal', error));

  let didError = false;
  const stream = ReactDOMServer.renderToPipeableStream(
      React.createElement(App),
      {
          bootstrapScripts: ['/bundle.js'],
          onShellReady: () => {
              res.statusCode = didError ? 500 : 200;
              res.setHeader('Content-type', 'text/html');
              stream.pipe(res);
          },
          onError: (error) => {
              didError = true;
              console.log(error);
          } 
      }
  );
});

app.use(express.static(path.join(__dirname, "public"), { maxAge: "30d" }));

app.listen(8080, () => {
  console.log(`App rodando na porta ${8080}`);
});
