import { defineParameterType } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import fse from 'fs-extra';
import { getTestDataFilePath } from './utils';

/**
 * Used for urls.
 * If string starts with 'http', will return string as it is.
 * Else will parse value and return it from apiData file
 *
 * @return {string}
 */
defineParameterType({
  regexp: /"([^"\\]*(\\.[^"\\]*)*)"/,
  name: 'landing-url',
  useForSnippets: false,
  transformer: (string: string) => {
    if (string.indexOf('http') === 0) {
      return string;
    }
    if (string.startsWith('$')) {
      return memory.getValue(string);
    }
  },
});

/**
 * Used for returning JSON
 *
 * If string ends with '.json' - parses the JSON file and returns JSON
 * if string stadrts with '$' - data will be parsed from memory
 *
 * @example
 * File location:
 * feature file name: api-test.feature
 *     test data dir: testData
 *         json-file: testData\test_data_file.json
 *
 * @return {JSON}
 */
defineParameterType({
  regexp: /"([^"\\]*(\\.[^"\\]*)*)"/,
  name: 'json',
  useForSnippets: false,
  transformer: (str: string) => {
    if (str.startsWith('$')) {
      return memory.getValue(str);
    }
    const filePath = getTestDataFilePath(str);
    const data = fse.readJSONSync(filePath);
    return data;
  },
});

/**
 * Used for returning JSON
 *
 * If string ends with '.json' - parses the JSON file and returns JSON
 *
 * @example
 * File location:
 * feature file name: api-test.feature
 *     test data dir: testData
 *         json-file: testData\test_data_file.json
 *
 * @return {JSON}
 */
defineParameterType({
  regexp: /| with headers "(.*)"/,
  name: 'headers',
  useForSnippets: false,
  transformer: (str: string) => {
    if (!str) {
      return {};
    }
    if (str.includes('$')) {
      return memory.getValue(str);
    }
    const filePath = getTestDataFilePath(str);
    const data = fse.readJSONSync(filePath);
    return data;
  },
});
