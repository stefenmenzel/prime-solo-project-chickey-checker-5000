import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, TableBody, TableCell, TableHead, TableRow, 
        Button, IconButton, Grid} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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
            <Grid container>                
                <Grid container justify="center">
                    <Grid item xs={11}>
                        <h1>Alerts</h1>
                    </Grid>                    
                    <Grid item xs={11}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Alert Metric</TableCell>
                                    <TableCell>Condition</TableCell>
                                    <TableCell>Contact Method</TableCell>
                                    <TableCell>Active</TableCell>
                                    <TableCell>Remove</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.alerts.length && this.props.alerts.map((alert) => {
                                    return <AlertItem key={alert.id} alert={alert} />
                                })}
                            </TableBody>
                        </Table>
                        <Grid container justify="flex-end">
                            <Grid item xs={10}></Grid>
                            <Grid item xs={1} style={{ marginTop: '20px' }} justify='flex-end'>
                                <IconButton color="inherit" aria-label="add new alert" onClick={this.addAlert}>
                                    <AddIcon color="primary" styles={{'background-color': 'blue'}} />
                                </IconButton>
                            </Grid>
                        </Grid>                        
                        <br />                        
                    </Grid>                
                </Grid>                                
                {/* <Button onClick={this.addAlert}>+ add alert</Button> */}
                {/* <button onClick={() => this.props.dispatch({type: 'SEND_MAIL_ALERT'})}>TEST SEND MAIL ALERT</button>
                <button onClick={() => this.props.dispatch({type: 'SEND_TEXT_ALERT'})}>TEST SEND TEXT ALERT</button> */}
            </Grid>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return { alerts: reduxState.alerts };
}

export default connect(mapStateToProps)(Alerts);