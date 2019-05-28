import React, {Component} from 'react';
import {connect} from 'react-redux';

class HistoricData extends Component{

    render(){
        return(
            <div>You have reached the Historic Data page, sort of a museum of Chickeynfo</div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return { reduxState };
}

export default connect(mapStateToProps)(HistoricData);