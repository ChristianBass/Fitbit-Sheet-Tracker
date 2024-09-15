// previousDayData.js
function updatePreviousDayData() {
    var accessToken = PropertiesService.getScriptProperties().getProperty('fitbitAccessToken') || INITIAL_ACCESS_TOKEN;
    var refreshToken = PropertiesService.getScriptProperties().getProperty('fitbitRefreshToken') || INITIAL_REFRESH_TOKEN;
    
    var previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 1);
    var previousDayFormatted = Utilities.formatDate(previousDay, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    
    var activitiesUrl = 'https://api.fitbit.com/1/user/-/activities/date/' + previousDayFormatted + '.json';
    var foodLogUrl = 'https://api.fitbit.com/1/user/-/foods/log/date/' + previousDayFormatted + '.json';
    var options = {
      'headers': {
        'Authorization': 'Bearer ' + accessToken
      }
    };
  
    try {
      var activitiesResponse = UrlFetchApp.fetch(activitiesUrl, options);
      if (activitiesResponse.getResponseCode() == 401) {
        Logger.log('Access token expired, refreshing token');
        accessToken = refreshAccessToken(refreshToken);
        if (!accessToken) {
          Logger.log('Failed to refresh access token.');
          return;
        }
        options.headers.Authorization = 'Bearer ' + accessToken;
        activitiesResponse = UrlFetchApp.fetch(activitiesUrl, options);
      }
      var activitiesData = JSON.parse(activitiesResponse.getContentText());
      Logger.log('Previous Day API Response: ' + JSON.stringify(activitiesData));
  
      var foodLogResponse = UrlFetchApp.fetch(foodLogUrl, options);
      if (foodLogResponse.getResponseCode() == 401) {
        Logger.log('Access token expired, refreshing token');
        accessToken = refreshAccessToken(refreshToken);
        if (!accessToken) {
          Logger.log('Failed to refresh access token.');
          return;
        }
        options.headers.Authorization = 'Bearer ' + accessToken;
        foodLogResponse = UrlFetchApp.fetch(foodLogUrl, options);
      }
      var foodLogData = JSON.parse(foodLogResponse.getContentText());
      Logger.log('Previous Day Food Log API Response: ' + JSON.stringify(foodLogData));
  
      var caloriesBurned = activitiesData.summary.caloriesOut || 0;
      var caloriesLogged = foodLogData.summary.calories || 0;
  
      updateSheetForPreviousDay(previousDayFormatted, caloriesBurned, caloriesLogged);
  
    } catch (e) {
      Logger.log('Error: ' + e.message);
    }
  }
  
  function updateSheetForPreviousDay(date, caloriesBurned, caloriesLogged) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
    var lastRow = sheet.getLastRow();
    var dateRange = sheet.getRange('A2:A' + lastRow).getValues();
    var rowIndex;
  
    for (var i = 0; i < dateRange.length; i++) {
      var sheetDate = Utilities.formatDate(new Date(dateRange[i][0]), Session.getScriptTimeZone(), 'yyyy-MM-dd');
      if (sheetDate == date) {
        rowIndex = i + 2;
        break;
      }
    }
  
    if (rowIndex) {
      sheet.getRange(rowIndex, 2).setValue(String(caloriesBurned));
      sheet.getRange(rowIndex, 3).setValue(String(caloriesLogged));
      var netCalories = caloriesLogged - caloriesBurned;
      sheet.getRange(rowIndex, 4).setValue(String(netCalories));
  
      updateRemainingCalories(rowIndex);
    }
  }  