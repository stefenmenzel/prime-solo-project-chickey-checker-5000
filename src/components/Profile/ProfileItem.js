import React, {Component} from 'react';

class ProfileItem extends Component{
    // state = {
    //     isClicked: false,        
    // }

    // toggleInput = () => {
    //     this.setState({
    //         ...this.state,
    //         isClicked: !this.state.isClicked
    //     })
    // }

    render(){
        return(
            (this.props.isClicked) ?            
                <input placeholder={this.props.item} onChange={(e) => { this.props.handleChange(this.props.valueToChange, e) }} />            
            :
            <span onClick={this.props.toggleInput}>{(this.props.item) ? this.props.item: '*EMPTY*'}</span>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        user: reduxState.user
    };
}

export default ProfileItem;