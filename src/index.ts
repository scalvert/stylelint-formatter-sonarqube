import path from 'path';
import stylelint, { Severity } from 'stylelint';

type PartialRecord<K extends keyof any, T> = {
  [P in K]: T;
};

const SONARQUBE_SEVERITY: PartialRecord<Severity, string> = {
  warning: 'MINOR',
  error: 'CRITICAL',
};

const SONARQUBE_TYPE: PartialRecord<Severity, string> = {
  warning: 'CODE_SMELL',
  error: 'BUG',
};

const formatter = (results: stylelint.LintResult[]) => {
  const issues = [];

  if (Array.isArray(results) && results.length > 0) {
    for (const result of results) {
      let relativePath =
        typeof result.source !== 'undefined' ? path.relative(process.cwd(), result.source) : '';

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
};

// @ts-ignore
export = formatter;
