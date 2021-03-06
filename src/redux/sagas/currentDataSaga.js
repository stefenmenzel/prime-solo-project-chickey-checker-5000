import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {checkAlerts} from '../../helpers/checkAlerts.js';

function* getCurrentData(action){    
    try{
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const currentData = yield axios.get("/api/data/currentData",config);
        console.log('current data retrieved:', currentData.data);
        // axios.post('/api/data/recordData', currentData.data);
        yield put({type: 'SET_CURRENT_DATA', payload: currentData.data});
        checkAlerts();
    }catch(err){
        console.log('Error in GETting current data:', err);
    }
}

function* currentDataSaga(){
    yield takeLatest('FETCH_CURRENT_DATA', getCurrentData);
}

export default currentDataSaga;