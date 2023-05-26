module.exports = {
  preset: "js-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.js?$": "js-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["./jest.setup.js"],
};
