import { jest, test, expect } from '@jest/globals';

jest.mock('@cucumber/cucumber', () => ({
  Given: jest.fn(),
  When: jest.fn(),
  Then: jest.fn(),
  Before: jest.fn(),
  After: jest.fn(),
  defineParameterType: jest.fn(),
}));

test('import steps', () => {
  const importer = () => {
    import('../index.js');
  };
  expect(importer).not.toThrow();
});
