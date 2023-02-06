/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  extensionsToTreatAsEsm: [".ts"],
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest.setup.js"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\.[jt]sx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};
