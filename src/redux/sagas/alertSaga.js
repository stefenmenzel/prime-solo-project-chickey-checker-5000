import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

function* getCurrentAlerts(action){
    try{
        const config = {
            headers: { 'Content-type': 'application/json'},
            withCredentials: true,
        };

        const currentAlerts = yield axios.get("/api/alerts", config);
        yield put({type: 'SET_ALERTS', payload: currentAlerts});
    }catch(err){
        console.log('Error in GETting current alerts:', err);
    }
}

function* addAlert(action){
    try{
        const config = {
            headers: { 'Content-type': 'application/json'},
            withCredentials: true,
        };

        yield axios.post('/api/alerts/add',action.payload, config);
        yield put({type: 'FETCH_ALERTS'})
    }catch(err){
        console.log('Error in ADD_ALERT request:', err);
    };
}

function* alertSaga(){
    yield takeLatest('FETCH_ALERTS', getCurrentAlerts);
    yield takeLatest('ADD_ALERT', addAlert);
}

export default alertSaga;