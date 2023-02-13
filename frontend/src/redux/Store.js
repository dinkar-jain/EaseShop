import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { signInReducer } from "./reducers/authReducer";
import { cartReducer } from "./reducers/cartReducer";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

const cart = window.localStorage.getItem("cart") ? JSON.parse(window.localStorage.getItem("cart")) : { cart: [] };
const signIn = { userInfo: Cookie.getJSON("userInfo") || {} };

const InitialState = { cart, signIn };
const Reducer = combineReducers({
    signIn: signInReducer,
    cart: cartReducer,
});
const Store = createStore(Reducer, InitialState, compose(applyMiddleware(thunk)));

export default Store