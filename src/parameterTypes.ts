import { defineParameterType } from '@cucumber/cucumber';
import memory from '@qavajs/memory';

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
  regexp: /| with headers ['"](.[^"]+)['"]/,
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
