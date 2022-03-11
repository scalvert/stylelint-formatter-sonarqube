import { fileURLToPath } from 'node:url';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import { createBinTester } from '@scalvert/bin-tester';
import Project from './utils/fake-project';

describe('SonarQube Formatter', () => {
  let project;
  let { setupProject, teardownProject, runBin } = createBinTester({
    binPath: fileURLToPath(new URL('../node_modules/stylelint/bin/stylelint.js', import.meta.url)),
    staticArgs: ['**/*.css', '--custom-formatter', fileURLToPath(new URL('..', import.meta.url))],
    projectConstructor: Project,
  });

  beforeEach(async () => {
    project = await setupProject('fake-project');
  });

  afterEach(() => {
    teardownProject();
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

    let result = await runBin();

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

    let result = await runBin();

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
});
