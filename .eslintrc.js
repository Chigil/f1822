module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "prettier"
  ],
  extends: [
    "react-app",
    "react-app/jest",
    "plugin:import/typescript",
    "plugin:prettier/recommended"
  ],

  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "react/react-in-jsx-scope": ["off"],
    "react/jsx-uses-react": ["off"],
    "react/jsx-props-no-spreading": ["warn"],
    "react/no-unescaped-entities": ["off"]
  }
};