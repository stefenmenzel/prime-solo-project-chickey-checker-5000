import React from 'react';
import {connect} from 'react-redux';
import store from '../index.js';

export function checkAlerts(){
    let reduxState = store.getState();
    let alerts = reduxState.alerts;
    let user = reduxState.user;
    let currentData = reduxState.currentData;
    console.log('the current alerts from checkAlerts:', reduxState.alerts);
    console.log("the current user from store:", reduxState.user);
    console.log('the current data from store:', reduxState.currentData);    
}
