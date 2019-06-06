// import store from '../index.js';


function checkAlerts(currentReading){
    const store = require('../index.js');
    let reduxState = store.getState();
    let alerts = reduxState.alerts;
    let user = reduxState.user;
    let currentData = reduxState.currentData;
    let dispatch = store.dispatch;
    console.log('the current alerts from checkAlerts:', alerts);
    console.log("the current user from store:", user);
    console.log('the current data from store:', currentData);
    // console.log('dispatch is:', store.dispatch());
    console.log("store is:", store);
    for(let i = 0; i < alerts.length; i++){
        switch (alerts[i].metric) {
            case 'temperature':
                if(alerts[i].active){
                    checkAlertCondition(currentReading.temp, alerts[i], user, dispatch);
                }                
                break;
            case 'humidity':
                if (alerts[i].active) {
                    checkAlertCondition(currentReading.humidity, alerts[i], user, dispatch);
                }
                break;
            case 'heatIndex':
                if (alerts[i].active) {
                    checkAlertCondition(currentReading.hi, alerts[i], user, dispatch);
                }
                break;
            case 'light':
                if (alerts[i].active) {
                    checkAlertCondition(currentReading.light, alerts[i], user, dispatch);
                }
                break;
        
            default:
                break;
        }
    }
}

function checkAlertCondition(reading, alert, user, dispatch){    
    switch (alert.condition) {
        case '<':
            if(reading < alert.value){
                sendMessage(alert, user, dispatch);
            }
            break;
        case '>':
            if(reading > alert.value){
                sendMessage(alert, user, dispatch);
            }
            break;
        case '<=':
            if(reading <= alert.value){
                sendMessage(alert, user, dispatch);
            }
            break;
        case '>=':
            if(reading >= alert.value){
                sendMessage(alert, user, dispatch);
            }
            break;
        default:
            break;
    }
}

function sendMessage(alert, user, dispatch){
    if(alert.email && alert.phone){
        dispatch({type:'SEND_MAIL_ALERT', payload: {user, alert}});
        dispatch({type: 'SEND_TEXT_ALERT', payload: {user, alert}});
    }
    else if(!alert.email && alert.phone){
        dispatch({type: 'SEND_TEXT_ALERT', payload: {user, alert}});
    }
    else if(alert.email && !alert.phone){
        dispatch({type: 'SEND_MAIL_ALERT', payload: {user, alert}});
    }
}

export default checkAlerts;
