import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import React from "react";
import App from "../../../client/App";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Request, Response } from "express";
import { BaseStore } from "../../../common/store/base";
import { publicConfig } from "../../../../configs/public";

let assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);

const scripts = Object.keys(assets)
  .reduce((files, key) => {
    const js = assets[key]?.js;
    if (Array.isArray(js)) {
      files = [...files, ...js];
    }
    if (typeof js == "string") {
      files.push(js);
    }
    return files;
  }, [])
  .reduce((script, file) => {
    return script + `<script src="${file}" defer crossorigin></script>`;
  }, "");
const css = Object.keys(assets).reduce((script, key) => {
  if (!assets[key]?.css) return script;
  return script + `<link rel="stylesheet" href="${assets[key].css}"></link>`;
}, "");
@Catch(NotFoundException)
export class SSRFilter implements ExceptionFilter {
  async catch(exception: NotFoundException, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const rootStore = {
      base: {
        ...publicConfig,
      } as Partial<BaseStore>,
    };
    const context = {};

    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );
    res.send(`<!doctype html>
    <html lang="">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet='utf-8' />
      <title>My Awesome IoTeX dApp!!</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <script>
        window.__ROOT__STORE__ = ${JSON.stringify(rootStore)};
      </script>
      <link rel="stylesheet" href="/tailwind.css">
      ${css}
      ${scripts}
    </head>
    <body>
      <div id="root">${markup}</div>
    </body>
  </html>`);
  }
}
