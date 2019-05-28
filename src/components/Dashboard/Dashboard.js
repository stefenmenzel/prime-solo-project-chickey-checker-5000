import React, {Component} from 'react'
import {connect} from 'react-redux';

class Dashboard extends Component{

    render(){
        return(
            <div>Here beith the dashboard</div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return { reduxState };
}

export default connect(mapStateToProps)(Dashboard);