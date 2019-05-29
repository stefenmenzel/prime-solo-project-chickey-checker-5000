import React, {Component} from 'react';
import {connect} from 'react-redux';

import AlertItem from './AlertItem.js';

class Alerts extends Component{

    addAlert = () => {
        //go to new alert page.
        console.log('add a new alert');
        this.props.history.push('/newAlert');
    }


    render(){
        return(
            <div>
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
                        {this.props.alerts.map((alert) => {
                            return <AlertItem key={alert.id} alert={alert}/>
                        })}
                    </tbody>
                </table>
                <br />
                <button onClick={this.addAlert}>+ add alert</button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return { alerts: reduxState.alerts };
}

export default connect(mapStateToProps)(Alerts);