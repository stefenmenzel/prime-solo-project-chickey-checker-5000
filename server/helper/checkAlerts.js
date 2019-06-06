// import store from '../index.js';
const sendAlert = require('../routes/alert.send.router.js');
const pool = require('../modules/pool.js');


function checkAlerts(currentReading, user){

    let sqlQuery = `
        SELECT "alerts".id, "sensor_metrics".metric, "alerts".condition, "alerts".value,
        "alerts".active, "alerts".email, "alerts".phone, "user".email, "user".phone_number
        FROM "alerts"
        JOIN "sensor_metrics" on "alerts".metric_id = "sensor_metrics".id
        JOIN "user" on "alerts".user_id = "user".id
        ORDER BY "alerts".id;
    `
    pool.query(sqlQuery)
        .then((result) => {
            console.log('result from GET alerts:', result.rows);
            let alerts = result.rows;
            for (let i = 0; i < alerts.length; i++) {
                switch (alerts[i].metric) {
                    case 'temperature':
                        if (alerts[i].active) {
                            checkAlertCondition(currentReading.temp, alerts[i]);
                        }
                        break;
                    case 'humidity':
                        if (alerts[i].active) {
                            checkAlertCondition(currentReading.humidity, alerts[i]);
                        }
                        break;
                    case 'heatIndex':
                        if (alerts[i].active) {
                            checkAlertCondition(currentReading.hi, alerts[i]);
                        }
                        break;
                    case 'light':
                        if (alerts[i].active) {
                            checkAlertCondition(currentReading.light, alerts[i]);
                        }
                        break;

                    default:
                        break;
                }
            }
            res.send(result.rows);
        }).catch((error) => {
            console.log("error in GET alerts:", error);            
        });

    // for(let i = 0; i < alerts.length; i++){
    //     switch (alerts[i].metric) {
    //         case 'temperature':
    //             if(alerts[i].active){
    //                 checkAlertCondition(currentReading.temp, alerts[i], user, dispatch);
    //             }                
    //             break;
    //         case 'humidity':
    //             if (alerts[i].active) {
    //                 checkAlertCondition(currentReading.humidity, alerts[i], user, dispatch);
    //             }
    //             break;
    //         case 'heatIndex':
    //             if (alerts[i].active) {
    //                 checkAlertCondition(currentReading.hi, alerts[i], user, dispatch);
    //             }
    //             break;
    //         case 'light':
    //             if (alerts[i].active) {
    //                 checkAlertCondition(currentReading.light, alerts[i], user, dispatch);
    //             }
    //             break;
        
    //         default:
    //             break;
    //     }
    // }
}

function checkAlertCondition(reading, alert){    
    switch (alert.condition) {
        case '<':
            if(reading < alert.value){
                sendMessage(alert);
            }
            break;
        case '>':
            if(reading > alert.value){
                sendMessage(alert);
            }
            break;
        case '<=':
            if(reading <= alert.value){
                sendMessage(alert);
            }
            break;
        case '>=':
            if(reading >= alert.value){
                sendMessage(alert);
            }
            break;
        default:
            break;
    }
}

function sendMessage(alert){
    if(alert.email && alert.phone){
        sendAlert.sendMail({user: {email: alert.email, phone_number: alert.phone_number}, alert: alert});
        sendAlert.sendText({ user: { email: alert.email, phone_number: alert.phone_number }, alert:alert});
        // dispatch({type:'SEND_MAIL_ALERT', payload: {user, alert}});
        // dispatch({type: 'SEND_TEXT_ALERT', payload: {user, alert}});
    }
    else if(!alert.email && alert.phone){
        // dispatch({type: 'SEND_TEXT_ALERT', payload: {user, alert}});
        sendAlert.sendText({ user: { email: alert.email, phone_number: alert.phone_number }, alert: alert });
    }
    else if(alert.email && !alert.phone){
        // dispatch({type: 'SEND_MAIL_ALERT', payload: {user, alert}});
        sendAlert.sendMail({ user: { email: alert.email, phone_number: alert.phone_number }, alert: alert });
    }
}

module.exports = checkAlerts;
