import { defineParameterType } from '@cucumber/cucumber';

/**
 * Used for validation function
 *
 * @returns {string}
 */
defineParameterType({
  name: 'apiValidation',
  regexp:
    /((?:is |do |does |to )?(not |to not )?(?:to )?(?:be )?(equal|have member|match|contain|above|below|greater than|less than|have type|match schema)(?:s|es)?)/,
  transformer: (p) => p,
  useForSnippets: false,
});

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
