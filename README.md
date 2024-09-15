**Fitbit Calorie Tracker Script**  
  
This project is a custom Google Sheets script that integrates with the Fitbit API to fetch and display personal fitness data in real-time. The primary goal is to track calorie burn progress towards a specific weight loss goal.
  
At the time of writing, Fitbit lacked a feature to set a total number of calories to burn for achieving a weight goal. This script fills that gap by allowing the user to input a target calorie burn, and it tracks progress based on Fitbit data.
  
    
   
**Important Notice**   
  
This script is personalized to work exclusively with my Fitbit account and is not designed to handle data from other Fitbit accounts or large volumes of data. While others can replicate a similar setup for personal use, adjustments would need to be made to work with different Fitbit accounts and datasets.
   
  
  
**Features**  
  
-Fetches real-time calorie burn data directly from Fitbit API.  
-Displays progress towards a custom calorie burn goal in Google Sheets.  
-Automatic updates every minute—no need for manual input.  
-Seamless integration with your existing Fitbit activity logs.  
  
  
  
**How It Works**  
  
-User Input: In the top right corner of the Google Sheet (marked by a red box), the user inputs the total number of calories they aim to burn.  
-Automatic Sync: Once connected to your Fitbit account, the script automatically fetches your calorie burn data from Fitbit and updates the sheet every minute.  
-Progress Tracker: The sheet displays your progress, including the number of calories burned so far and how many are left to reach your goal.  
  
  
  
**Setup Instructions**  
  
__Prerequisites:__  
-A Fitbit account with an active API setup.  
-Access to Google Sheets and the Google Apps Script Editor.  
-Fitbit API credentials (Client ID, Client Secret, and Access Token) from the Fitbit Developer Portal.  
  
__Step-by-Step Setup:__  
#Clone the Script:  
-Open your Google Sheet and navigate to Extensions > Apps Script.  
-Copy the provided JavaScript code into the Apps Script Editor.  
  
#Fitbit API Credentials:  
-Set up a Fitbit Developer account to obtain your API credentials.  
-In the script, configure your Client ID, Client Secret, and Access Token to authenticate with the Fitbit API.  
  
#Input Your Calorie Goal:  
-In the Google Sheet, input your desired total calories to burn in the red box at the top right.  
  
#Run the Script:  
-Once everything is set up, the script will automatically fetch data from Fitbit and update your progress every minute.  
  
  
  
**Usage**  
  
-Simply log your activity and calories as you normally would in the Fitbit app. The script will take care of fetching the data and displaying your progress in the Google Sheet.  
-No manual entry of calorie data is required on the sheet.  
  
  

**Future Enhancements**  
  
-Adding more fitness metrics such as steps, heart rate, and sleep tracking.  
-Customizable update intervals.  
-Graphical representation of progress using charts.  
  
  
  
**License**  
  
This project is open source and available under the MIT License.  