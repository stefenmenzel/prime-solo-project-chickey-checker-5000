import React, {Component} from 'react';
import {connect} from 'react-redux';

import AlertItem from './AlertItem.js';

class Alerts extends Component{

    componentDidMount(){
        this.props.dispatch({type:'FETCH_ALERTS'});
    }

    addAlert = () => {
        //go to new alert page.
        console.log('add a new alert');
        this.props.history.push('/newAlert');
    }


    render(){
        return(
            <div>
                <h1>Alerts</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Alert Metric</th>
                            <th>Condition</th>
                            <th>Contact Method</th>
                            <th>Active</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.alerts.length && this.props.alerts.map((alert) => {
                            return <AlertItem key={alert.id} alert={alert}/>
                        })}
                    </tbody>
                </table>
                <br />
                <button onClick={this.addAlert}>+ add alert</button>
                <button onClick={() => this.props.dispatch({type: 'SEND_MAIL_ALERT'})}>TEST SEND MAIL ALERT</button>
                <button onClick={() => this.props.dispatch({type: 'SEND_TEXT_ALERT'})}>TEST SEND TEXT ALERT</button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return { alerts: reduxState.alerts };
}

export default connect(mapStateToProps)(Alerts);