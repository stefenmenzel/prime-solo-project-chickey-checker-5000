import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

function* getHistoricData(action){
    try{
        const config = {
            headers: { 'Content-type': 'application/json' },
            withCredentials: true
        };

        const historicData = yield axios.get('/api/historicData', config);
        yield put({type: 'SET_HISTORIC_DATA', payload: historicData.data});
    }catch(err){
        console.log('Error in GETting historic data:', err);
    };
}

function* historicDataSaga(){
    yield takeLatest('FETCH_HISTORIC_DATA', getHistoricData);
}

export default historicDataSaga;