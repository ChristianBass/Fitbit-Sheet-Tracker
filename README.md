**Fitbit Calorie Tracker Script**<br>

This project is a custom Google Sheets script that integrates with the Fitbit API to fetch and display personal fitness data in real-time. The primary goal is to track calorie burn progress towards a specific weight loss goal.<br>

At the time of writing, Fitbit lacked a feature to set a total number of calories to burn for achieving a weight goal. This script fills that gap by allowing the user to input a target calorie burn, and it tracks progress based on Fitbit data.<br><br><br><br>



**Important Notice**<br>

This script is personalized to work exclusively with my Fitbit account and is not designed to handle data from other Fitbit accounts or large volumes of data. While others can replicate a similar setup for personal use, adjustments would need to be made to work with different Fitbit accounts and datasets.<br><br><br><br>



**Features**<br>

- Fetches real-time calorie burn data directly from Fitbit API.<br>
- Displays progress towards a custom calorie burn goal in Google Sheets.<br>
- Automatic updates every minute—no need for manual input.<br>
- Seamless integration with your existing Fitbit activity logs.<br><br><br><br>



**How It Works**<br>

- User Input: In the top right corner of the Google Sheet (marked by a red box), the user inputs the total number of calories they aim to burn.<br>
- Automatic Sync: Once connected to your Fitbit account, the script automatically fetches your calorie burn data from Fitbit and updates the sheet every minute.<br>
- Progress Tracker: The sheet displays your progress, including the number of calories burned so far and how many are left to reach your goal.<br><br><br><br>



**Setup Instructions**<br>

**#Prerequisites:**<br>
- A Fitbit account with an active API setup.<br>
- Access to Google Sheets and the Google Apps Script Editor.<br>
- Fitbit API credentials (Client ID, Client Secret, and Access Token) from the Fitbit Developer Portal.<br><br><br>


**#Step-by-Step Setup:**<br>
**### 1. Clone the Script:**<br>
- Open your Google Sheet and navigate to Extensions > Apps Script.<br>
- Create multiple .gs files within the Google Apps Script editor (e.g., config.gs, fitbitApi.gs, sheetOperations.gs).<br>
- Copy and paste the provided JavaScript code into these separate files as instructed in the project structure, or paste it all into one .gs file.<br><br><br>


**### 2. Fitbit API Credentials:**<br>
- Set up a Fitbit Developer account to obtain your API credentials.<br>
- In the config.gs file, replace the placeholders for Client ID, Client Secret, and Access Token with your Fitbit API credentials.<br><br><br>


**### 3. Copy the Google Sheet Template:**<br>
- You can make a copy of the pre-formatted Google Sheet template using the link below:<br>
[Google Sheets Template](https://docs.google.com/spreadsheets/d/11y6_4ZInAUm7ZKJNgqzD3NZfKYIyQGbDEOCBuaRaHZ8/edit?usp=sharing)<br>

**Important:** When copying manually, make sure to replicate the **column widths** by following these steps:<br>
   1. **Right-click** the column headers in the original sheet.<br>
   2. Select **"Resize column"** to note the width.<br>
   3. In the new sheet, right-click the target column and enter the same width to match the original layout.<br><br><br>


**### 4. Input Your Calorie Goal:**<br>
- In the Google Sheet, input your desired total calories to burn in the red box at the top right.<br><br><br>


**### 5. Run the Script:**<br>
- Once everything is set up, you can run the main() function from the Apps Script editor to start fetching data. The script will automatically fetch data from Fitbit and update your progress every minute.<br><br><br><br>



**Usage**<br>

- Simply log your activity and calories as you normally would in the Fitbit app. The script will take care of fetching the data and displaying your progress in the Google Sheet.<br>
- No manual entry of calorie data is required on the sheet.<br><br><br><br>



**Future Enhancements**<br>

- Adding more fitness metrics such as steps, heart rate, and sleep tracking.<br>
- Customizable update intervals.<br>
- Graphical representation of progress using charts.<br><br><br><br>



**License**<br>

This project is open source and available under the MIT License.