const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://marvel-qa-cademy.herokuapp.com',
    video: false
  },
});
