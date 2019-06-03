const currentHistoricData = (state = [], action) => {
    switch (action.type) {
        case 'SET_HISTORIC_DATA':
            return action.payload;            
    
        default:
            return state;
    }
};

export default currentHistoricData;