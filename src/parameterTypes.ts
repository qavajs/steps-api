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
  name: 'landingUrl',
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
  transformer: (str: string) => memory.getValue(str),
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
  regexp: /| with headers "(.[^"]+)"/,
  name: 'headers',
  useForSnippets: false,
  transformer: (str: string) => {
    if (!str) {
      return {};
    }
    return memory.getValue(str);
  },
});

/**
 * Used for validation function
 *
 * @returns {string}
 */
defineParameterType({
  name: 'apiValidation',
  regexp:
    /((?:is |do |does |to )?(not |to not )?(?:to )?(?:be )?(equal|have member|match|contain|above|below|greater than|less than|have type)(?:s|es)?)/,
  transformer: (p) => p,
  useForSnippets: false,
});

/**
 * Used for getting response object from the memory
 */
defineParameterType({
  name: 'response',
  regexp: /"([^"\\]*(\\.[^"\\]*)*)"/,
  transformer: (response) => memory.getValue(response),
  useForSnippets: false,
});
