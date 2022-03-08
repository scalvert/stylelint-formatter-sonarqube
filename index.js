const path = require('path');

const SONARQUBE_SEVERITY = {
  1: 'MINOR', // warning
  2: 'CRITICAL', // error
};

const SONARQUBE_TYPE = {
  1: 'CODE_SMELL', // warning
  2: 'BUG', // error
};

function formatter(results) {
  const issues = [];

  if (Array.isArray(results) && results.length > 0) {
    for (const result of results) {
      let relativePath = path.relative(process.cwd(), result.source);

      for (const warning of result.warnings) {
        issues.push({
          engineId: 'stylelint',
          ruleId: warning.rule,
          severity: SONARQUBE_SEVERITY[warning.severity],
          type: SONARQUBE_TYPE[warning.severity],
          primaryLocation: {
            message: warning.text,
            filePath: relativePath,
            textRange: {
              startLine: warning.line,
              startColumn: warning.column,
              endLine: warning.line,
              endColumn: warning.column,
            },
          },
        });
      }
    }
  }

  // eslint-disable-next-line unicorn/no-null
  return JSON.stringify({ issues }, null, 2);
}

module.exports = formatter;
