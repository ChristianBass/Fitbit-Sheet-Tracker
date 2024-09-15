// fitbitApi.js
function fetchFitbitData() {
    var accessToken = PropertiesService.getScriptProperties().getProperty('fitbitAccessToken') || INITIAL_ACCESS_TOKEN;
    var refreshToken = PropertiesService.getScriptProperties().getProperty('fitbitRefreshToken') || INITIAL_REFRESH_TOKEN;
    var url = 'https://api.fitbit.com/1/user/-/activities/date/today.json';
    var options = {
      'headers': {
        'Authorization': 'Bearer ' + accessToken
      }
    };
  
    try {
      var response = UrlFetchApp.fetch(url, options);
      if (response.getResponseCode() == 401) {
        Logger.log('Access token expired, refreshing token');
        accessToken = refreshAccessToken(refreshToken);
        if (!accessToken) {
          Logger.log('Failed to refresh access token.');
          return;
        }
        options.headers.Authorization = 'Bearer ' + accessToken;
        response = UrlFetchApp.fetch(url, options);
      }
  
      var data = JSON.parse(response.getContentText());
      Logger.log('API Response: ' + JSON.stringify(data));
  
      var caloriesBurned = data.summary.caloriesOut || 0;
      var caloriesLogged = fetchCaloriesLogged();
      Logger.log('Calories Logged: ' + caloriesLogged);
  
      caloriesBurned = parseFloat(caloriesBurned);
      caloriesLogged = parseFloat(caloriesLogged);
  
      updateSheet(caloriesBurned, caloriesLogged);
  
    } catch (e) {
      Logger.log('Error: ' + e.message);
    }
  }
  
  function refreshAccessToken(refreshToken) {
    var url = 'https://api.fitbit.com/oauth2/token';
    var payload = {
      client_id: CLIENT_ID,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    };
  
    var headers = {
      'Authorization': 'Basic ' + Utilities.base64Encode(CLIENT_ID + ':' + CLIENT_SECRET),
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  
    try {
      var response = UrlFetchApp.fetch(url, {
        method: 'post',
        headers: headers,
        payload: payload,
        muteHttpExceptions: true
      });
      var result = JSON.parse(response.getContentText());
  
      if (result.errors) {
        Logger.log('Error refreshing access token: ' + result.errors[0].message);
        return null;
      } else {
        var scriptProperties = PropertiesService.getScriptProperties();
        scriptProperties.setProperty('fitbitAccessToken', result.access_token);
        scriptProperties.setProperty('fitbitRefreshToken', result.refresh_token);
        Logger.log('Tokens refreshed successfully');
        return result.access_token;
      }
    } catch (e) {
      Logger.log('Error in refreshAccessToken: ' + e.message);
      return null;
    }
  }
  
  function fetchCaloriesLogged() {
    var accessToken = PropertiesService.getScriptProperties().getProperty('fitbitAccessToken');
    var refreshToken = PropertiesService.getScriptProperties().getProperty('fitbitRefreshToken');
    var url = 'https://api.fitbit.com/1/user/-/foods/log/date/today.json';
    var options = {
      'headers': {
        'Authorization': 'Bearer ' + accessToken
      }
    };
  
    try {
      var response = UrlFetchApp.fetch(url, options);
      if (response.getResponseCode() == 401) {
        Logger.log('Access token expired, refreshing token');
        accessToken = refreshAccessToken(refreshToken);
        if (!accessToken) {
          Logger.log('Failed to refresh access token.');
          return 0;
        }
        options.headers.Authorization = 'Bearer ' + accessToken;
        response = UrlFetchApp.fetch(url, options);
      }
  
      var data = JSON.parse(response.getContentText());
      Logger.log('API Response: ' + JSON.stringify(data));
  
      var caloriesLogged = data.summary.calories || 0;
      Logger.log('Parsed Calories Logged: ' + caloriesLogged);
  
      return caloriesLogged;
  
    } catch (e) {
      Logger.log('Error: ' + e.message);
      return 0;
    }
  }  