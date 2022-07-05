import { Before } from '@cucumber/cucumber';
import memory from '@qavajs/memory';

/**
 * Before hook for saving user story file location in memory
 */
Before(function (scenario) {
  const { uri }: any = scenario.gherkinDocument;
  memory.setValue('usFolder', uri);
});
