// main.js
function main() {
    var scriptProperties = PropertiesService.getScriptProperties();
    var accessToken = scriptProperties.getProperty('fitbitAccessToken');
    var refreshToken = scriptProperties.getProperty('fitbitRefreshToken');
  
    if (!accessToken) {
      accessToken = fetchAccessToken();
    }
  
    if (!accessToken) {
      Logger.log('Failed to fetch access token.');
      return;
    }
  
    var url = 'https://api.fitbit.com/1/user/-/activities/date/today.json';
    var headers = {
      'Authorization': 'Bearer ' + accessToken
    };
  
    var options = {
      method: 'get',
      headers: headers,
      muteHttpExceptions: true
    };
  
    var response = UrlFetchApp.fetch(url, options);
    
    if (response.getResponseCode() === 401) { // Unauthorized, likely due to expired token
      Logger.log('Access token expired, refreshing token...');
      accessToken = refreshAccessToken(refreshToken);
  
      if (!accessToken) {
        Logger.log('Failed to refresh access token.');
        return;
      }
  
      headers = {
        'Authorization': 'Bearer ' + accessToken
      };
  
      options = {
        method: 'get',
        headers: headers,
        muteHttpExceptions: true
      };
  
      response = UrlFetchApp.fetch(url, options);
    }
  
    if (response.getResponseCode() === 200) {
      var result = JSON.parse(response.getContentText());
  
      if (result.errors) {
        Logger.log('Error fetching data: ' + result.errors[0].message);
      } else {
        Logger.log('Data fetched successfully: ' + JSON.stringify(result));
        fetchFitbitData(); // This will handle updating your sheet
      }
    } else {
      Logger.log('Failed to fetch data, response code: ' + response.getResponseCode());
    }
  }
  
  function fetchAccessToken() {
    var scriptProperties = PropertiesService.getScriptProperties();
    var accessToken = scriptProperties.getProperty('fitbitAccessToken');
    var refreshToken = scriptProperties.getProperty('fitbitRefreshToken');
  
    if (!accessToken || !refreshToken) {
      var code = AUTH_CODE;
      var url = 'https://api.fitbit.com/oauth2/token';
      var payload = {
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
        code: code
      };
  
      var headers = {
        'Authorization': 'Basic ' + Utilities.base64Encode(CLIENT_ID + ':' + CLIENT_SECRET),
        'Content-Type': 'application/x-www-form-urlencoded'
      };
  
      var options = {
        method: 'post',
        headers: headers,
        payload: payload,
        muteHttpExceptions: true
      };
  
      var response = UrlFetchApp.fetch(url, options);
      var result = JSON.parse(response.getContentText());
  
      if (result.errors) {
        Logger.log('Error fetching access token: ' + result.errors[0].message);
        return null;
      } else {
        scriptProperties.setProperty('fitbitAccessToken', result.access_token);
        scriptProperties.setProperty('fitbitRefreshToken', result.refresh_token);
        return result.access_token;
      }
    } else {
      return accessToken;
    }
  }  