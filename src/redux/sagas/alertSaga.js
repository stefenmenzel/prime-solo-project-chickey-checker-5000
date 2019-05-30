import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

function* getCurrentAlerts(action){
    try{
        const config = {
            headers: { 'Content-type': 'application/json'},
            withCredentials: true,
        };

        const currentAlerts = yield axios.get("/api/alerts", config);
        yield put({type: 'SET_ALERTS', payload: currentAlerts.data});
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

function* toggleAlert(action){
    try{
        const config = {
            headers: { 'Content-type': 'application/json'},
            withCredentials: true,
        };

        yield axios.put('/api/alerts/toggle', action.payload, config);
        yield put({type: 'FETCH_ALERTS'})
    }catch(err){
        console.log('Error in TOGGLE_ALERT', err);
    }
}

function* deleteAlert(action){
    try{
        const config = {
            headers: { 'Content-type': 'application/json'},
            withCredentials: true
        };

        yield axios.delete(`/api/alerts/delete?idToDelete=${action.payload.id}`, config);
        yield put ({type: 'FETCH_ALERTS'});
    }catch(err){
        console.log('Error in DELETE alert request:', err);
    }
}

function* alertSaga(){
    yield takeLatest('FETCH_ALERTS', getCurrentAlerts);
    yield takeLatest('ADD_ALERT', addAlert);
    yield takeLatest('TOGGLE_ALERT', toggleAlert);
    yield takeLatest('DELETE_ALERT', deleteAlert);
}

export default alertSaga;