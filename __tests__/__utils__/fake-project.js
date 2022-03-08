'use strict';

const path = require('path');
const Project = require('fixturify-project');

const ROOT = process.cwd();

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

module.exports = class FakeProject extends Project {
  static defaultSetup() {
    let project = new this();

    project.files['.stylelintrc.json'] = DEFAULT_STYLELINTRC;
    project.files['.editorconfig'] = DEFAULT_EDITOR_CONFIG;

    project.writeSync();

    return project;
  }

  constructor(name = 'fake-project', ...arguments_) {
    super(name, ...arguments_);
  }

  setConfig(config) {
    let configFileContents =
      config === undefined
        ? DEFAULT_STYLELINTRC
        : // eslint-disable-next-line unicorn/no-null
          JSON.stringify(config, null, 2);

    this.files['.stylelintrc.json'] = configFileContents;

    this.writeSync();
  }

  getConfig() {
    return require(path.join(this.baseDir, '.stylelintrc.json'));
  }

  setEditorConfig(value = DEFAULT_EDITOR_CONFIG) {
    this.files['.editorconfig'] = value;

    this.writeSync();
  }

  path(subPath) {
    return subPath ? path.join(this.baseDir, subPath) : this.baseDir;
  }

  // eslint-disable-next-line unicorn/prevent-abbreviations
  write(dirJSON) {
    Object.assign(this.files, dirJSON);
    this.writeSync();
  }

  chdir() {
    this._dirChanged = true;

    // ensure the directory structure is created initially
    this.writeSync();

    process.chdir(this.baseDir);
  }

  dispose() {
    if (this._dirChanged) {
      process.chdir(ROOT);
    }

    return super.dispose();
  }
}
