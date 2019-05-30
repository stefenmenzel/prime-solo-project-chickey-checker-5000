import React, {Component} from 'react'
import {connect} from 'react-redux';

class Dashboard extends Component{

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_CURRENT_DATA'});
    }

    render(){        
        return(
            <div>                
                <pre>{JSON.stringify(this.props.currentData.data)}</pre>
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