import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import execa from 'execa';
import Project from './utils/fake-project';

describe('SonarQube Formatter', () => {
  let project;

  beforeEach(() => {
    project = new Project('fake-project');
  });

  afterEach(() => {
    project.dispose();
  });

  it('can format output from no results', async () => {
    project.setConfig({
      rules: {
        'property-no-unknown': true,
      },
    });
    project.write({
      sub: {
        'foo.css': 'a { color: red; }',
      },
    });

    let result = await styleLint();

    expect(result.stdout).toMatchInlineSnapshot(`
      "{
        \\"issues\\": []
      }"
    `);
    expect(result.exitCode).toEqual(0);
  });

  it('can format output when there are errors', async () => {
    project.setConfig({
      rules: {
        'property-no-unknown': true,
        'block-no-empty': true,
      },
    });
    project.write({
      'foo.css': 'a { color: red; colir: blue; }',
      sub: {
        'bar.css': 'div {}',
      },
    });

    let result = await styleLint();

    expect(result.stdout).toMatchInlineSnapshot(`
      "{
        \\"issues\\": [
          {
            \\"engineId\\": \\"stylelint\\",
            \\"ruleId\\": \\"property-no-unknown\\",
            \\"primaryLocation\\": {
              \\"message\\": \\"Unexpected unknown property \\\\\\"colir\\\\\\" (property-no-unknown)\\",
              \\"filePath\\": \\"foo.css\\",
              \\"textRange\\": {
                \\"startLine\\": 1,
                \\"startColumn\\": 17,
                \\"endLine\\": 1,
                \\"endColumn\\": 17
              }
            }
          },
          {
            \\"engineId\\": \\"stylelint\\",
            \\"ruleId\\": \\"block-no-empty\\",
            \\"primaryLocation\\": {
              \\"message\\": \\"Unexpected empty block (block-no-empty)\\",
              \\"filePath\\": \\"sub/bar.css\\",
              \\"textRange\\": {
                \\"startLine\\": 1,
                \\"startColumn\\": 5,
                \\"endLine\\": 1,
                \\"endColumn\\": 5
              }
            }
          }
        ]
      }"
    `);
    expect(result.exitCode).not.toEqual(0);
  });

  function styleLint(argumentsOrOptions, options) {
    if (arguments.length > 0) {
      if (arguments.length === 1) {
        options = Array.isArray(argumentsOrOptions) ? {} : argumentsOrOptions;
      }
    } else {
      argumentsOrOptions = [];
      options = {};
    }

    return execa(
      process.execPath,
      [
        require.resolve('../node_modules/stylelint/bin/stylelint.js'),
        '**/*.css',
        '--custom-formatter',
        require.resolve('..'),
        ...argumentsOrOptions,
      ],
      {
        reject: false,
        cwd: project.baseDir,
        ...options,
      }
    );
  }
});
