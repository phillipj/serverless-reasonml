"use strict";

const child_process = require("child_process");

class ServerlessReasonMlPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.hooks = {
      "before:package:createDeploymentArtifacts": this.bsbMakeWorld.bind(this),
      "before:offline:start": this.bsbWatch.bind(this),
      "before:offline:start:init": this.bsbWatch.bind(this),
      "before:invoke:local:invoke": this.bsbMakeWorld.bind(this)
    };
  }

  bsbWatch() {
    return this.bsbMakeWorld().then(() => {
      this.serverless.cli.log("Watching for changes...");

      this._bsbWatcher = child_process.spawn(
        "./node_modules/.bin/bsb",
        ["-w"],
        { cwd: process.cwd(), stdio: "inherit" }
      );

      this._bsbWatcher.on("error", err => {
        console.error("Got bsb watching error!", err);
      });
    });
  }

  bsbMakeWorld() {
    return new Promise((resolve, reject) => {
      this.serverless.cli.log("Building reasonml files...");

      child_process
        .spawn("./node_modules/.bin/bsb", ["-make-world"], {
          cwd: process.cwd(),
          stdio: "inherit"
        })
        .on("error", err => reject(err))
        .on('close', exitCode => exitCode === 0 ? resolve() : reject(new Error('Failed with code ' + exitCode)));
    });
  }
}

module.exports = ServerlessReasonMlPlugin;
