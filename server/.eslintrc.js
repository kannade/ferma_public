module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: './server/tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',

  },
};
