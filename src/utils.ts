import path from 'path';
import memory from '@qavajs/memory';

/**
 * Sending http request
 *
 * @param {String} fileName - name of the test data file
 * @returns {String} path - path to the test data file
 */
function getTestDataFilePath(fileName: string): string {
  const testDir = path.parse(memory.getValue('usFolder')).dir;
  return path.join(testDir, 'testData', fileName);
}

export { getTestDataFilePath };
