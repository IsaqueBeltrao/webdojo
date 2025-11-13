const { defineConfig } = require("cypress");

const { deleteUsersByEmail } = require('./cypress/support/database');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        deleteUser(email) {
          return deleteUsersByEmail(email);

        }
      })
    },
    baseUrl: 'http://localhost:3333',

  },
});
