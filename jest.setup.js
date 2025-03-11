// Setup fail-on-console to catch unwanted console outputs
import { failOnConsole } from 'jest-fail-on-console';

// Import Jest DOM extensions
import '@testing-library/jest-dom';

failOnConsole({
  shouldFailOnDebug: true,
  shouldFailOnError: true,
  shouldFailOnInfo: true,
  shouldFailOnLog: true,
  shouldFailOnWarn: true,
});
