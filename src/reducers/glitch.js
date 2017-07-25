var initialState = {
    glitchInstance: 'aa123a'
};

export default(state = initialState, payload) => {
    switch (payload.type) {
        case 'init':
            return Object.assign({}, state, {
                glitchInstance: payload.glitchInstance
            });
        default:
            return state;
    }
};