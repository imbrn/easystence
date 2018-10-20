module.exports = require("babel-jest").createTransformer({
  presets: ["@babel/env"],
  sourceMaps: true,
  retainLines: true
});
