module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    "class-methods-use-this": "off",
    "prettier/prettier": "error",
    "consistent-return": "off",
    "no-shadow": "off",
    camelcase: "off",
  },
};
