import { defineConfig } from "cypress";

export default defineConfig({
  pageLoadTimeout: 100000,
  defaultCommandTimeout: 8000,

  retries: {
    runMode: 2,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
