// triggers.js
function initialSetup() {
    createTimeDrivenTrigger();
  }
  
  function createTimeDrivenTrigger() {
    var triggers = ScriptApp.getProjectTriggers();
    var triggerExists = triggers.some(trigger => trigger.getHandlerFunction() === 'main');
    
    if (!triggerExists) {
      ScriptApp.newTrigger('main')
        .timeBased()
        .everyMinutes(1)
        .create();
    }
  }
  
  function scheduleTrigger(functionName, minutesAfterMidnight) {
    var now = new Date();
    var midnight = new Date(now);
    midnight.setHours(0, 0, 0, 0);
    var triggerTime = new Date(midnight.getTime() + minutesAfterMidnight * 60 * 1000);
  
    ScriptApp.newTrigger(functionName)
      .timeBased()
      .at(triggerTime)
      .create();
  }
  
  function scheduleMidnightUpdates() {
    Logger.log('Scheduling updates based on midnight');
  
    var triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === 'updatePreviousDayData') {
        ScriptApp.deleteTrigger(trigger);
      }
    });
  
    scheduleTrigger('updatePreviousDayData', 0);
    scheduleTrigger('updatePreviousDayData', 10);
    scheduleTrigger('updatePreviousDayData', 20);
  }  