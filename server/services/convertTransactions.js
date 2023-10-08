const config = require('../config/mappingConfig.json');
const utils = require('./utils');
const transactionController = require('../controllers/transactionController')

module.exports = (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Extract the file and selected platform from response
  const uploadedFile = req.files.file;
  const platform = req.body.platform

  try {
    // Get the first sheet
    const workbook = utils.readSheet(uploadedFile.data);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Prevent wrong '!ref' in the uploaded file 
    sheet['!ref'] = 'A1:P1000';

    // Initialize an array to store processed records
    const processedTransactions = [];

    // Get mapping rules from the config file
    const columnMapping = config[platform].columnMapping;
    const startIndex = config[platform].startIndex;
    // Split currency from netAmount
    const netAmountSlitting = config[platform].netAmountSlitting;

    // Convert the sheet to an array of rows without headers
    const dataRows = utils.convertSheetToJson(sheet, { header: 1, blankrows: false });

    // Extract the header row based on the startIndex
    const headerRow = dataRows[startIndex - 1];

    // Skip the header row and convert the data rows to JSON
    const dataWithoutHeader = dataRows.slice(startIndex);

    dataWithoutHeader.forEach((row) => {

      const record = {};

      // (Temp Solution) Map columns to properties based on the mapping configuration
      Object.keys(columnMapping).forEach((columnName) => {
        propertyName = columnMapping[columnName]
        if (netAmountSlitting && columnName == 'Net') {
          // Split the currency
          originalValue = row[headerRow.indexOf(columnName)]
          record[propertyName] = originalValue ? originalValue.slice(0, -3) : null;
          record['netCurrency'] = originalValue ? originalValue.slice(-3) : null;
        } else if (propertyName == 'bankAccount') {
          // Mask the bank data
          record[propertyName] = (row[headerRow.indexOf(columnName)]) ? ('*' + row[headerRow.indexOf(columnName)].slice(-4)) : null
        } else {
          record[propertyName] = row[headerRow.indexOf(columnName)] ? row[headerRow.indexOf(columnName)] : null
        }
      });

      processedTransactions.push(record);
    });

    // Create transactions in database, slice the array temporarily because
    transactionController.createTransactions(processedTransactions.slice(0,12))
      .then(result => {
        console.log("Response returned:", result)
        res.json(result);
      })
      .catch(error => {
        console.error('Error creating transactions:', error);
        res.status(500).json({ error: 'An error occurred while creating transactions' });
      });

  } catch (error) {
    console.error('Error reading the Excel file:', error);
    res.status(500).json({ error: 'An error occurred while processing the Excel file' });
  }
};