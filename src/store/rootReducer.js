import {
    combineReducers
} from "redux";

import sectionsReducer from "./sections/sectionsReducers";

const rootReducer = combineReducers({
    sections: sectionsReducer
})

export default rootReducer