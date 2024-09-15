// sheetOperations.js
function updateSheet(caloriesBurned, caloriesLogged) {
    var netCalories = caloriesLogged - caloriesBurned;
  
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var currentDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    var currentTime = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'HH:mm:ss');
  
    Logger.log('Current Date: ' + currentDate);
    Logger.log('Current Time: ' + currentTime);
  
    var lastRow = sheet.getLastRow();
    var dateRange = sheet.getRange('A2:A' + lastRow).getValues();
    var dateExists = false;
    var rowIndex;
  
    for (var i = 0; i < dateRange.length; i++) {
      var sheetDate = Utilities.formatDate(new Date(dateRange[i][0]), Session.getScriptTimeZone(), 'yyyy-MM-dd');
      if (sheetDate == currentDate) {
        dateExists = true;
        rowIndex = i + 2;
        break;
      }
    }
  
    if (dateExists) {
      Logger.log('Updating existing row: ' + rowIndex);
      sheet.getRange(rowIndex, 2).setValue(String(caloriesBurned));
      sheet.getRange(rowIndex, 3).setValue(String(caloriesLogged));
      sheet.getRange(rowIndex, 4).setValue(String(netCalories));
      sheet.getRange(rowIndex, 6).setValue(currentTime);
    } else {
      Logger.log('Appending new row for date: ' + currentDate);
      rowIndex = lastRow + 1;
      var newRowData = [[currentDate, String(caloriesBurned), String(caloriesLogged), String(netCalories), "", currentTime]];
      sheet.getRange(rowIndex, 1, 1, 6).setValues(newRowData);
      scheduleMidnightUpdates();
    }
  
    updateRemainingCalories(rowIndex);
  }
  
  function updateRemainingCalories(rowIndex) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var initialGoal = sheet.getRange('I1').getValue() || 150000;
    var totalNetCalories = 0;
  
    for (var i = 2; i <= rowIndex; i++) {
      var netCal = parseFloat(sheet.getRange('D' + i).getValue());
      if (!isNaN(netCal)) {
        totalNetCalories += netCal;
        var remainingCalories = initialGoal + totalNetCalories;
        sheet.getRange('E' + i).setValue(String(remainingCalories));
      }
    }
  
    sheet.getRange('I2').setValue(String(initialGoal + totalNetCalories));
    sheet.getRange('I3').setValue(Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'));
  }  