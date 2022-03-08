# stylelint-formatter-sonarqube

![CI Build](https://github.com/scalvert/stylelint-formatter-sonarqube/workflows/CI%20Build/badge.svg)
[![npm version](https://badge.fury.io/js/stylelint-formatter-sonarqube.svg)](https://badge.fury.io/js/stylelint-formatter-sonarqube)
[![License](https://img.shields.io/npm/l/stylelint-formatter-sonarqube.svg)](https://github.com/scalvert/stylelint-formatter-sonarqube/blob/master/package.json)
![Dependabot](https://badgen.net/badge/icon/dependabot?icon=dependabot&label)
![Volta Managed](https://img.shields.io/static/v1?label=volta&message=managed&color=yellow&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAeQC6AMEpK7AhAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH5AMGFS07qAYEaAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAFmSURBVDjLY2CgB/g/j0H5/2wGW2xyTAQ1r2DQYOBgm8nwh+EY6TYvZtD7f9rn5e81fAGka17GYPL/esObP+dyj5Cs+edqZsv/V8o//H+z7P+XHarW+NSyoAv8WsFszyKTtoVBM5Tn7/Xys+zf7v76vYrJlPEvAwPjH0YGxp//3jGl/L8LU8+IrPnPUkY3ZomoDQwOpZwMv14zMHy8yMDwh4mB4Q8jA8OTgwz/L299wMDyx4Mp9f9NDAP+bWVwY3jGsJpB3JaDQVCEgYHlLwPDfwYWRqVQJgZmHoZ/+3PPfWP+68Mb/Pw5sqUoLni9ipuRnekrAwMjA8Ofb6K8/PKBF5nU7RX+Hize8Y2DOZTP7+kXogPy1zrH+f/vT/j/Z5nUvGcr5VhJioUf88UC/59L+/97gUgDyVH4YzqXxL8dOs/+zuFLJivd/53HseLPPHZPsjT/nsHi93cqozHZue7rLDYhUvUAADjCgneouzo/AAAAAElFTkSuQmCC&link=https://volta.sh)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](#badge)

> A custom formatter for [`stylelint`](https://stylelint.io/) that will format the output in SonarQube's [generic issue format](https://docs.sonarqube.org/latest/analysis/generic-issue/).

## Install

```shell
npm i stylelint-formatter-sonarqube --save-dev

# or

yarn add stylelint-formatter-sonarqube --dev
```

Output will be in 'Generic Issue Format'.

```json
{
  "issues": [
    {
      "engineId": "stylelint",
      "ruleId": "property-no-unknown",
      "primaryLocation": {
        "message": "Unexpected unknown property \"foo\" (property-no-unknown)",
        "filePath": "foo.css",
        "textRange": {
          "startLine": 1,
          "startColumn": 17,
          "endLine": 1,
          "endColumn": 17
        }
      }
    },
    {
      "engineId": "stylelint",
      "ruleId": "block-no-empty",
      "primaryLocation": {
        "message": "Unexpected empty block (block-no-empty)",
        "filePath": "sub/bar.css",
        "textRange": {
          "startLine": 1,
          "startColumn": 5,
          "endLine": 1,
          "endColumn": 5
        }
      }
    }
  ]
}
```

## Usage

```shell
stylelint "**/*.css" --custom-formater node_modules/stylelint-formatter-sonarqube
```
