module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    sourceType: "module",
  },
  extends: ["eslint:recommended", "prettier"],
};
