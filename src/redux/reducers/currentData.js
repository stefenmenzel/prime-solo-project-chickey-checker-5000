const currentData = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_DATA':
            return action.payload.data;
    
        default:
            return state;
    }
};

export default currentData;