module.exports = {
  extends: 'airborne',
  rules: {
    // disable forcing type import to fix dependency injection
    // https://github.com/typescript-eslint/typescript-eslint/issues/2559
    '@typescript-eslint/consistent-type-imports': 'off',
  },
};
