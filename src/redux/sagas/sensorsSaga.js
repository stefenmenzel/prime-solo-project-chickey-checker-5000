import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

function* getSensors(action){
    try{
        const config = {
            headers: { 'Content-type': 'applicationa/json'},
            withCredentials: true,
        };

        const sensorData = yield axios.get("/api/data/sensors", config);
        console.log("sensor data:", sensorData.data);
        yield put({ type: 'SET_SENSORS', payload: sensorData.data });
        // yield put({type: 'SET_SENSORS', payload: sensorData.data});
    }catch(err){
        console.log('Error in GETting sensor data:', err);
    }
}

function* sensorSaga(){
    yield takeLatest('FETCH_SENSORS', getSensors);
}

export default sensorSaga