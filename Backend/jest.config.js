export default {
  testEnvironment: "node", // Use Node.js environment
  setupFilesAfterEnv: ["./jest.setup.js"], // Use the setup file
  coveragePathIgnorePatterns: ["/node_modules/"], // Ignore node_modules for coverage
  transform: {}, // Disable transformation for ES modules
};
