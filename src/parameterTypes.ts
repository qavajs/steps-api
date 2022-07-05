import { defineParameterType } from '@cucumber/cucumber';
import { getTestDataFilePath } from '@utils';
import fse from 'fs-extra';

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
  transformer: (string) => {
    if (string.indexOf('http') === 0) {
      return string;
    }

    // TODO: Implement funcionality for getting API data from Test Data files
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
  regexp: /"([^"\\]*(\\.[^"\\]*)*)"/,
  name: 'json',
  useForSnippets: false,
  transformer: (str: string) => {
    const filePath = getTestDataFilePath(str);
    const data = fse.readJSONSync(filePath);
    return data;
  },
});
