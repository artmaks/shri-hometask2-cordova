var initialState = {
    currentPage: 'Main'
};

export default(state = initialState, payload) => {
    switch (payload.type) {
        case 'add':
            return [...state, payload.item];
        default:
            return state;
    }
};