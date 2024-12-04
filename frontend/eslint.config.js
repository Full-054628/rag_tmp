// @ts-check


/** @type {import('eslint').ESLint.ConfigData} */
export default {
  extends: [
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended", 
    "plugin:react-hooks/recommended",
    "plugin:security/recommended",
    "plugin:unicorn/recommended", 
    "plugin:prettier/recommended", 
  ],

  plugins: ["@typescript-eslint", "react", "react-hooks", "security", "unicorn", "prettier"],

  rules: {
    "prettier/prettier": "error", 
    "no-console": "warn", 
    eqeqeq: "error", 
    curly: ["error", "multi-line", "consistent"],
    "prefer-template": "error",
    "require-await": "error", 
    "@typescript-eslint/consistent-type-definitions": ["error", "type"], 
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }], 
    "@typescript-eslint/naming-convention": [
      "error",
      { selector: "default", format: ["strictCamelCase"], leadingUnderscore: "allow" },
      { selector: "typeLike", format: ["StrictPascalCase"], leadingUnderscore: "allow" },
    ],
    "@typescript-eslint/no-empty-object-type": "off", 
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unsafe-function-type": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // 未使用変数をエラー、名前が_で始まる引数は無視
    "@typescript-eslint/promise-function-async": "error", // Promiseを返す関数をasyncにする
    "@typescript-eslint/switch-exhaustiveness-check": "error", 
    "unicorn/consistent-function-scoping": ["error", { checkArrowFunctions: false }],
    "unicorn/filename-case": ["error", { cases: { camelCase: true, pascalCase: true } }],
    "react/react-in-jsx-scope": "off", 
    "react/prop-types": "off", 
  },

  settings: {
    react: {
      version: "detect",
    },
  },
};
