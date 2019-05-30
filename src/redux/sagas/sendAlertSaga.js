import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

function* sendMailAlert(action){
    try{
        const config = {
            headers: {'Content-type': 'application/json'},
            withCredentials: true,
        }

        yield axios.post('/api/sendAlert/mail', action.payload, config);
    }catch(err){
        console.log('error in sending email alert:', err);
    };
}

function* sendTextAlert(action){
    try{
        const config = {
            headers: { 'Content-type': 'application/json'},
            withCredentials: true,
        }

        yield axios.post('/api/sendAlert/text', action.payload, config);
    }catch(err){
        console.log('error in sending text alert:', err);
    }
}

function* sendAlertSaga(){
    yield takeLatest('SEND_MAIL_ALERT', sendMailAlert)
    yield takeLatest('SEND_TEXT_ALERT', sendTextAlert);
}

export default sendAlertSaga;