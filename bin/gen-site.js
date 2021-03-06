
var cljsLoad = require("./cljs-load");

var srcFile = "pre-render/main.js";
var outputDirectory = "outsite/public/js/out";
var devFile = "reagenttest/runtests.js";

var beep = "\u0007";

if (typeof location === "undefined") {
    // figwheel wants js/location to exist, even if it doesn't run,
    // for some reason
    global.location = {};
}
var gensite = function () {
    console.log("Pre-rendering or testing...");
    var optNone = cljsLoad.load(srcFile, outputDirectory, devFile);
    sitetools.server.genpages({"opt-none": optNone});
}

var compileFail = function () {
  var msg = process.argv[process.argv.length - 1];
  if (msg && msg.match(/failed/)) {
    console.log("Compilation failed" + beep);
    return true;
  }
};

process.env.NODE_ENV = "production";

if (!compileFail()) {
  try {
    gensite();
  } catch (e) {
    console.log(e + beep);
    console.error(e.stack);
    process.exit(1);
  }
}
process.exit(0);
