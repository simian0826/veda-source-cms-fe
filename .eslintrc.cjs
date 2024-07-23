// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },

  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
    jsxPragma: "react",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    //eslint
    "no-console": process.env.NODE_ENV === "prod" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "prod" ? "error" : "off",
    "no-var": "error", // Allows `let` and `const` declarations instead of `var`
    "no-unexpected-multiline": "error", // 禁止出现多行
    "no-useless-escape": "error", // Prevents common escape sequences
    "no-use-before-define": "off",

    //typeScript
    //"@typescript-eslint/ban-ts-comment": "off", // Prohibit the use of the ts-comment rules from Type
    "@tycpt-eslint/no-explicit-any": "off", // Prohibit explicit type annotations
    "@typescript-eslint/no-non-null-assertion": "off", // Prohibit `!` operator
    "@typescript-eslint/non-namespace": "off", // Prohibit namespace keywords
    "typescript-eslint/semi": "off", // Prohibit semicolons
    "@typescript-eslint/prefer-ts-expect-error": "off", // Prohibit expect error
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unnecessary-type-constraint": "off",

    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",

    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    // Vue
    "vue/multi-word-component-names": "off", // Prohibit using multi-word component names
    "vue/script-setup-uses-vars": "error", // Prohibit using vars from setup
    "vue/no-mutating-props": "error", // Prohibit mutating props in Vue components
    "vue/attribute-hyphenation": "off", // Prohibit hyphens in attribute names
    "vue/custom-event-name-casing": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "never",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
  },
};
