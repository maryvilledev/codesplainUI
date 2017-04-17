module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest": true,
    "node": true
  },
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "rules": {
    "indent": [
        1,
        2
    ],
    "linebreak-style": [
        1,
        "unix"
    ],
    "quotes": [
        1,
        "single"
    ],
    "semi": [
        1,
        "always"
    ],
    "react/prop-types": [
      1,
      {
        "ignore": [
          "children",
          "dispatch",
          "router",
          "style"
        ]
      }
    ],
    "jsx-a11y/no-static-element-interactions": 0,
    "import/no-named-as-default": 0,
  }
};
