const path = require("path");

const rootPath = process.cwd();
const srcPath = path.join(rootPath, "src");

module.exports = {
  roots: [srcPath],
  setupFiles: ["<rootDir>/jest.setup.js"],
  transform: {
    "\\.js$": "<rootDir>/jest.transformer.js"
  }
};
