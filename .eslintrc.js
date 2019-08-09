module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    quotes: [1, "double"],
    semi: [0, "always", { omitLastInOneLineBlock: true }],
    "space-before-function-paren": ["off", "always"]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
