'use strict';

import { join } from 'node:path';
import { createRequire } from 'node:module';
import { BinTesterProject } from '@scalvert/bin-tester';

const require = createRequire(import.meta.url);

// this is the default .editorconfig file for new ember-cli apps, taken from:
// https://github.com/ember-cli/ember-new-output/blob/stable/.editorconfig
const DEFAULT_EDITOR_CONFIG = `
# EditorConfig helps developers define and maintain consistent
# coding styles between different editors and IDEs
# editorconfig.org

root = true

[*]
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
indent_style = space
indent_size = 2

[*.hbs]
insert_final_newline = false

[*.{diff,md}]
trim_trailing_whitespace = false
`;

// this is the default .stylelintrc.json used by ember-cli apps, taken from:
// https://github.com/ember-cli/ember-new-output/blob/stable/.stylelintrc.json
const DEFAULT_STYLELINTRC = `
{
  "extends": "stylelint-config-standard"
}
`;

export default class StyleLintProject extends BinTesterProject {
  constructor(name = 'fake-project', ...arguments_: any[]) {
    super(name, ...arguments_);
  }

  async setConfig(config: Record<string, any>) {
    let configFileContents =
      config === undefined
        ? DEFAULT_STYLELINTRC
        : // eslint-disable-next-line unicorn/no-null
          JSON.stringify(config, null, 2);

    this.files['.stylelintrc.json'] = configFileContents;

    await this.write();
  }

  get config() {
    return require(join(this.baseDir, '.stylelintrc.json'));
  }

  async setEditorConfig(value = DEFAULT_EDITOR_CONFIG) {
    this.files['.editorconfig'] = value;

    await this.write();
  }

  path(subPath: string) {
    return subPath ? join(this.baseDir, subPath) : this.baseDir;
  }
}
