// src/reducers/index.js
import glitch from './glitch';
import app from './app';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    glitch,
    app
});
export default rootReducer;