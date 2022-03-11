import stylelint from 'stylelint';

declare const formatter: (results: stylelint.LintResult[]) => string;

export { formatter as default };
