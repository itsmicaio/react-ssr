import path from "path";
import fs from "fs";

import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";

import { App } from "../client/App";

const app = express();

app.get("/", (req, res) => {
  const appContent = ReactDOMServer.renderToString(React.createElement(App));
  const indexFile = path.resolve(`${__dirname}/../src/client/index.html`);
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Não foi possível carregar o app.");
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${appContent}</div>`
      )
    );
  });
});

app.use(express.static(path.join(__dirname, "public"), { maxAge: "30d" }));

app.listen(8080, () => {
  console.log(`App rodando na porta ${8080}`);
});