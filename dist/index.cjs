var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// src/index.ts
var import_path = __toESM(require("path"), 1);
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
      let relativePath = typeof result.source !== "undefined" ? import_path.default.relative(process.cwd(), result.source) : "";
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
