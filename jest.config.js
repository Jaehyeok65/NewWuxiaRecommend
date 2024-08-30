module.exports = {
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    transformIgnorePatterns: [
      "node_modules/(?!(axios|other-modules)/)"  // 필요한 모듈을 트랜스파일하도록 설정
    ],
    testEnvironment: "jsdom"  // React 테스트에 적합한 환경
  };