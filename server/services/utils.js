const XLSX = require('xlsx');

function convertSheetToJson(sheet, options) {
  return XLSX.utils.sheet_to_json(sheet, options);
}

function readSheet(sheet, options) {
  return XLSX.read(sheet, options);
}

module.exports = { convertSheetToJson, readSheet };