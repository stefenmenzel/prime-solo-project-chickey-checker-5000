import React, {Component} from 'react';
import {connect} from 'react-redux';

class Alerts extends Component{

    render(){
        return(
            <div>Ye hath found the Alerts page</div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return { reduxState };
}

export default connect(mapStateToProps)(Alerts);