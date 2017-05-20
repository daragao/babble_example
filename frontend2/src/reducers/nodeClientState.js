const initialState = {
};

const nodeClientState = (state = initialState, action) => {
    switch (action.type) {
        case 'REFRESH':
            console.log('REFRESHING!!!');
            return state;
        default:
            return state;
    }
};

export default nodeClientState;
