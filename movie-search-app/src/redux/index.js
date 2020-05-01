import {combineReducers} from 'redux';
import news from './news';

//루트리듀서 반환
const rootReducer=combineReducers({
    news,
})

export default rootReducer;