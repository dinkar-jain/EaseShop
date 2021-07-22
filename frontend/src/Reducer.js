import { SIGN_UP_FAIL, SIGN_IN_SUCCESS, SIGN_IN_FAIL, PRODUCT_CREATE_FAIL, PRODUCTS_DATA_SUCCESS, PRODUCTS_DATA_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_FAIL, CART_UPDATE_SUCCESS, CART_UPDATE_FAIL, CART_DELETE_SUCCESS, CART_DELETE_FAIL, PRODUCT_UPDATE_FAIL, USER_UPDATE_FAIL, USER_PASSWORD_UPDATE_SUCCESS, USER_PASSWORD_UPDATE_FAIL, SIGN_OUT_SUCCESS, SIGN_OUT_FAIL, ORDER_DATA_SUCCESS, ORDER_CREATE_FAIL, ORDER_DATA_FAIL, ORDER_DELETE_FAIL, SALES_DATA_SUCCESS, SALES_DATA_FAIL, ORDER_DISPATCH_FAIL } from "./Constants";

const SignUpReducer = (State = {}, Action) => {
    if (Action.type === SIGN_UP_FAIL) {
        return { error: Action.Payload };
    }

    else {
        return State;
    }
};

const SignInReducer = (State = {}, Action) => {
    if (Action.type === SIGN_IN_SUCCESS) {
        return { SignInDetails: Action.Payload };
    }

    else if (Action.type === SIGN_OUT_SUCCESS) {
        return { SignInDetails: Action.Payload };
    }

    else if (Action.type === SIGN_OUT_FAIL) {
        return { error: Action.Payload };
    }

    else if (Action.type === SIGN_IN_FAIL) {
        return { error: Action.Payload };
    }

    else {
        return State;
    }
};

const UpdateProfileReducer = (State = {}, Action) => {

    if (Action.type === USER_UPDATE_FAIL) {
        return { error: Action.Payload };
    }

    else {
        return State;
    }

}

const UpdatePasswordReducer = (State = {}, Action) => {
    if (Action.type === USER_PASSWORD_UPDATE_SUCCESS) {
        return { UpdatePasswordDetails: Action.Payload };
    }

    else if (Action.type === USER_PASSWORD_UPDATE_FAIL) {
        return { error: Action.Payload };
    }

    else {
        return State
    }
}

const AdminProductReducer = (State = {}, Action) => {
    if (Action.type === PRODUCTS_DATA_SUCCESS) {
        return { ProductsData: Action.Payload }
    }

    else if (Action.type === PRODUCTS_DATA_FAIL) {
        return { error: Action.Payload }
    }

    else if (Action.type === PRODUCT_DETAILS_SUCCESS) {
        return { ProductDetails: Action.Payload };
    }

    else if (Action.type === PRODUCT_DETAILS_FAIL) {
        return { error: Action.Payload };
    }

    else if (Action.type === PRODUCT_CREATE_FAIL) {
        return { error: Action.Payload };
    }

    else if (Action.type === PRODUCT_DELETE_FAIL) {
        return { error: Action.Payload };
    }

    else if (Action.type === PRODUCT_UPDATE_FAIL) {
        return { error: Action.Payload };
    }

    else {
        return State;
    }
};

const CartUpdateReducer = (State = {}, Action) => {
    if (Action.type === CART_UPDATE_SUCCESS) {
        const NewProduct = Action.Payload;
        const SameProduct = State.CartDetails.find(Product => Product._id === NewProduct._id);
        if (SameProduct) {
            return { CartDetails: State.CartDetails.map(Product => Product._id === SameProduct._id ? NewProduct : Product) }
        }
        return { CartDetails: [...State.CartDetails, NewProduct] }
    }

    else if (Action.type === CART_DELETE_SUCCESS) {
        return { CartDetails: State.CartDetails.filter(Product => Product._id !== Action.Payload) };
    }

    else if (Action.type === CART_DELETE_FAIL) {
        return { error: Action.Payload };
    }

    else if (Action.type === CART_UPDATE_FAIL) {
        return { error: Action.Payload };
    }

    else {
        return State;
    }
};

const OrdersDataReducer = (State = {}, Action) => {
    if (Action.type === ORDER_DATA_SUCCESS) {
        return { Orders: Action.Payload };
    }

    else if (Action.type === ORDER_CREATE_FAIL) {
        return { error: Action.Payload };
    }

    else if (Action.type === ORDER_DATA_FAIL) {
        return { error: Action.Payload };
    }

    else if (Action.type === ORDER_DISPATCH_FAIL) {
        return { error: Action.Payload };
    }

    else if (Action.type === ORDER_DELETE_FAIL) {
        return { error: Action.Payload };
    }

    else {
        return State;
    }
}

const SalesDataReducer = (State = {}, Action) => {
    if (Action.type === SALES_DATA_SUCCESS) {
        return { Orders: Action.Payload };
    }

    else if (Action.type === SALES_DATA_FAIL) {
        return { error: Action.Payload };
    }

    else {
        return State;
    }
}

export { SignUpReducer, SignInReducer, UpdateProfileReducer, UpdatePasswordReducer, AdminProductReducer, CartUpdateReducer, OrdersDataReducer, SalesDataReducer }