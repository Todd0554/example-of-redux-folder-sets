import {
    createStore, 
    combineReducers, 
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { 
    productDetailReducer, 
    productListReducer
} from './reducers/productReducer'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,

})
// get the login user
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogIn: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store