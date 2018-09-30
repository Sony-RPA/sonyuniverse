import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import authReducer from "../reducers/authReducer"
import errorReducer from "../reducers/errorReducer"
import profileReducer from "../reducers/profileReducer"
import postReducer from "../reducers/postReducer"
import colleagueReducer from "../reducers/colleagueReducer"
import thunk from "redux-thunk"

const initialStoreState = {}

const store = createStore(combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer,
	post: postReducer,
	colleague: colleagueReducer
}), initialStoreState,
	compose(
		applyMiddleware(thunk),
		//need this for redux dev tools to work, should not be used in production
		process.env.NODE_ENV === "production" ? null : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)

export default store