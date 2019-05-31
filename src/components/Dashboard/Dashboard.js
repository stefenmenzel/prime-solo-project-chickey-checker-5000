import React, {Component} from 'react'
import {connect} from 'react-redux';

class Dashboard extends Component{

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_CURRENT_DATA'});
        this.props.dispatch({ type: 'FETCH_ALERTS' });        
    }

    render(){        
        return(
            <div>    
                <h1>Dashboard</h1>            
                <pre>{JSON.stringify(this.props.currentData)}</pre>
                Here beith the dashboard
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return { 
        currentData: reduxState.currentData,
        alerts: reduxState.alerts,
        user: reduxState.user,
    };
}

export default connect(mapStateToProps)(Dashboard);