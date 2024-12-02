import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      "react/prop-types": "off", // Desativa a regra de PropTypes
      "react/react-in-jsx-scope": "off", // Desativa a regra React em JSX
      "react/display-name": "off", // Desativa a regra React em JSX
      "@typescript-eslint/no-unused-vars": ["warn", {
        "argsIgnorePattern": "^_",
      }], // Desativa a regra React em JSX
      "@typescript-eslint/no-explicit-any": "off", // Desativa a regra React em JSX
    }
  }
];