import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { SignUpReducer, SignInReducer, AdminProductReducer, CartUpdateReducer, UpdateProfileReducer, UpdatePasswordReducer, OrdersDataReducer, SalesDataReducer } from "./Reducer";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

const AdminProduct = { ProductsData: [] }
const CartDetails = Cookie.getJSON("CartCurrentDetails") || { CartDetails: [] };
const SignIn = { SignInDetails: Cookie.getJSON("SignInUserInfo") || {} };

const InitialState = { AdminProduct, CartDetails, SignIn };
const Reducer = combineReducers({
    SignUp: SignUpReducer,
    SignIn: SignInReducer,
    AdminProduct: AdminProductReducer,
    CartDetails: CartUpdateReducer,
    UpdatePassword: UpdatePasswordReducer,
    OrdersData: OrdersDataReducer,
    SalesData: SalesDataReducer,
    UpdateProfile: UpdateProfileReducer
});
const Store = createStore(Reducer, InitialState, compose(applyMiddleware(thunk)));

export default Store