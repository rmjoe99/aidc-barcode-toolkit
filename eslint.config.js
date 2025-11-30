export default [
  {
    files: ["lib/**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn"
    }
  }
];
