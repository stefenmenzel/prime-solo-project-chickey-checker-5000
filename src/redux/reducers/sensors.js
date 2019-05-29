const sensors = (state = [], action) => {    
    switch (action.type) {        
        case 'SET_SENSORS':  
            console.log('set sensors payload:', action.payload);          
            return action.payload;            
    
        default:
            return state;
    }
};

export default sensors;