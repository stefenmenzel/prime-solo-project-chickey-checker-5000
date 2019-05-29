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

function* alertSaga(){
    yield takeLatest('FETCH_ALERTS', getCurrentAlerts);
}

export default alertSaga;