var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/tsup/assets/esm_shims.js
var init_esm_shims = __esm({
  "node_modules/tsup/assets/esm_shims.js"() {
  }
});

// src/index.ts
import path from "path";
var require_src = __commonJS({
  "src/index.ts"(exports, module) {
    init_esm_shims();
    var SONARQUBE_SEVERITY = {
      warning: "MINOR",
      error: "CRITICAL"
    };
    var SONARQUBE_TYPE = {
      warning: "CODE_SMELL",
      error: "BUG"
    };
    var formatter = (results) => {
      const issues = [];
      if (Array.isArray(results) && results.length > 0) {
        for (const result of results) {
          let relativePath = typeof result.source !== "undefined" ? path.relative(process.cwd(), result.source) : "";
          for (const warning of result.warnings) {
            issues.push({
              engineId: "stylelint",
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
                  endColumn: warning.column
                }
              }
            });
          }
        }
      }
      return JSON.stringify({ issues }, null, 2);
    };
    module.exports = formatter;
  }
});
export default require_src();
