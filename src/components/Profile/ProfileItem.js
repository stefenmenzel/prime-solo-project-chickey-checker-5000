import React, {Component} from 'react';

class ProfileItem extends Component{
    state = {
        isClicked: false,        
    }

    toggleInput = () => {
        this.setState({
            ...this.state,
            isClicked: !this.state.isClicked
        })
    }

    render(){
        return(
            (this.state.isClicked) ?            
                <input placeholder={this.props.item} onChange={(e) => { this.props.handleChange(this.props.valueToChange, e) }} />            
            :
            <span onClick={this.toggleInput}>{(this.props.item) ? this.props.item: '*EMPTY*'}</span>
        )
    }
}

export default ProfileItem;