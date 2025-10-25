import { defineParameterType } from '@qavajs/core';

/**
 * Used for parsing responses body
 *
 * @returns {string}
 */
defineParameterType({
  name: 'bodyParsingType',
  regexp: /arrayBuffer|formData|blob|json|text/,
  transformer: (p) => p,
  useForSnippets: false,
});

/**
 * Used to initialize one of two possible GraphQl body properties
 *
 * @returns {string}
 */
defineParameterType({
  name: 'gqlRequestProperty',
  regexp: /query|variables/,
  transformer: s => s
});
