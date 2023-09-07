const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 832,
  e2e: {
    baseUrl:'https://front.renaceia.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
