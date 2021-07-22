import { SIGN_UP_FAIL, SIGN_IN_SUCCESS, SIGN_IN_FAIL, PRODUCT_CREATE_FAIL, PRODUCTS_DATA_SUCCESS, PRODUCTS_DATA_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_UPDATE_FAIL, PRODUCT_DELETE_FAIL, CART_UPDATE_SUCCESS, CART_UPDATE_FAIL, CART_DELETE_SUCCESS, CART_DELETE_FAIL, USER_UPDATE_FAIL, USER_PASSWORD_UPDATE_SUCCESS, USER_PASSWORD_UPDATE_FAIL, SIGN_OUT_FAIL, SIGN_OUT_SUCCESS, ORDER_CREATE_FAIL, ORDER_DATA_SUCCESS, ORDER_DATA_FAIL, ORDER_DELETE_FAIL, SALES_DATA_SUCCESS, SALES_DATA_FAIL, ORDER_DISPATCH_FAIL } from "./Constants";
import Axios from "axios";
import Cookie from "js-cookie";

const ProductCreateAction = (Category, Image, Name, Size, Price, Stock, Description, Seller_id, Seller_name) => async (Dispatch) => {
    try {
        const SignIn = Cookie.getJSON("SignInUserInfo");
        const { data } = await Axios.post("/API/Products/Create", { Category, Image, Name, Size, Price, Stock, Description, Seller_id, Seller_name }, {
            headers: {
                'authorization': SignIn.Token
            }
        });

        if (data.Seller_id !== undefined) {
            window.location.reload(false);
        }

        else {
            alert(data);
        }

    } catch (error) {
        Dispatch({
            type: PRODUCT_CREATE_FAIL, Payload: error.message
        })
    }
}

const ProductsDataAction = () => async (Dispatch) => {
    try {
        const { data } = await Axios.get("/API/Products")
        Dispatch({ type: PRODUCTS_DATA_SUCCESS, Payload: data })

    } catch (error) {
        Dispatch({ type: PRODUCTS_DATA_FAIL, Payload: error.message })
    }
}

const ProductDetailsAction = (ProductId) => async (Dispatch) => {
    try {
        const { data } = await Axios.get("/API/Products/" + ProductId)
        Dispatch({ type: PRODUCT_DETAILS_SUCCESS, Payload: data })
    }

    catch (error) {
        Dispatch({ type: PRODUCT_DETAILS_FAIL, Payload: error.message })
    }
}

const ProductUpdateAction = (_id, Category, Image, Name, Size, Price, Stock, Description) => async (Dispatch) => {
    try {
        const SignIn = Cookie.getJSON("SignInUserInfo");
        const { data } = await Axios.post("/API/Products/Update/" + _id, { Category, Image, Name, Size, Price, Stock, Description }, {
            headers: {
                'authorization': SignIn.Token
            }
        });

        if (data === "Product Updated") {
            window.location.reload(false);
        }

        else {
            alert(data);
        }

    } catch (error) {
        Dispatch({ type: PRODUCT_UPDATE_FAIL, Payload: error.message })
    }
}

const ProductDeleteAction = (ProductId) => async (Dispatch) => {
    try {
        const SignIn = Cookie.getJSON("SignInUserInfo");
        await Axios.get("/API/Products/Delete/" + ProductId, {
            headers: {
                'authorization': SignIn.Token
            }
        })

    } catch (error) {
        Dispatch({ type: PRODUCT_DELETE_FAIL, Payload: error.message })
    }
}

const CartUpdateDetailsAction = (ProductId, ProductQty) => async (Dispatch, getState) => {
    try {
        const { data } = await Axios.get("/API/Products/" + ProductId)
        Dispatch({
            type: CART_UPDATE_SUCCESS, Payload: {
                _id: data._id,
                Seller_id: data.Seller_id,
                Name: data.Name,
                Size: data.Size,
                Image: data.Image,
                Price: data.Price,
                Stock: data.Stock,
                Qty: ProductQty
            }
        });

        const { CartDetails } = getState();
        Cookie.set("CartCurrentDetails", JSON.stringify(CartDetails));

    } catch (error) {
        Dispatch({ type: CART_UPDATE_FAIL, Payload: error.message })
    }
}

const CartDeleteDetailsAction = (ProductId) => async (Dispatch, getState) => {
    try {
        Dispatch({
            type: CART_DELETE_SUCCESS, Payload: ProductId
        })

        const { CartDetails } = getState();
        Cookie.set("CartCurrentDetails", JSON.stringify(CartDetails));

    } catch (error) {
        Dispatch({ type: CART_DELETE_FAIL, Payload: error.message })
    }
}

const OrderCreateAction = (Date, User_id, Name, Address, Products) => async (Dispatch) => {
    try {
        const SignIn = Cookie.getJSON("SignInUserInfo");
        Axios.post("/API/Orders/Create", { Date, User_id, Name, Address, Products }, {
            headers: {
                'authorization': SignIn.Token
            }
        });
        Cookie.remove("CartCurrentDetails");

    } catch (error) {
        Dispatch({ type: ORDER_CREATE_FAIL, Payload: error.message })
    }
}

const OrdersDataAction = (User_id) => async (Dispatch) => {
    try {
        const SignIn = Cookie.getJSON("SignInUserInfo");
        const { data } = await Axios.post("/API/Orders", { User_id }, {
            headers: {
                'authorization': SignIn.Token
            }
        })
        Dispatch({ type: ORDER_DATA_SUCCESS, Payload: data })

    } catch (error) {
        Dispatch({ type: ORDER_DATA_FAIL, Payload: error.message })
    }
}

const OrdersDispatchAction = (_id) => async (Dispatch) => {
    try {
        const SignIn = Cookie.getJSON("SignInUserInfo");
        await Axios.post("/API/Orders/Dispatch", { _id }, {
            headers: {
                'authorization': SignIn.Token
            }
        })

    } catch (error) {
        Dispatch({ type: ORDER_DISPATCH_FAIL, Payload: error.message })
    }
}

const OrderDeleteAction = (Order_id) => async (Dispatch) => {
    try {
        const SignIn = Cookie.getJSON("SignInUserInfo");
        await Axios.post("/API/Orders/Delete", { Order_id }, {
            headers: {
                'authorization': SignIn.Token
            }
        })

    } catch (error) {
        Dispatch({ type: ORDER_DELETE_FAIL, Payload: error.message })
    }
}

const SignUpAction = (FirstName, LastName, Email, Password, ReConfirm, IsAdmin) => async (Dispatch) => {
    try {
        const { data } = await Axios.post("/API/Users/SignUp", { FirstName, LastName, Email, Password, ReConfirm, IsAdmin });
        if (data._id) {
            window.location.replace("http://localhost:3000/SignIn")
        }

        else {
            alert(data)
        }
    } catch (error) {
        Dispatch({ type: SIGN_UP_FAIL, Payload: error.message })
    }
}

const SignInAction = (Email, Password) => async (Dispatch) => {
    try {
        const { data } = await Axios.post("/API/Users/SignIn", { Email, Password });
        if (data._id) {
            Dispatch({
                type: SIGN_IN_SUCCESS, Payload: data
            })
            Cookie.set("SignInUserInfo", JSON.stringify(data));
            window.location.reload(false);
            window.location.replace("http://localhost:3000")
        }

        else {
            Dispatch({
                type: SIGN_IN_FAIL, Payload: data
            })
        }
    } catch (error) {
        Dispatch({ type: SIGN_IN_FAIL, Payload: error.message })
    }
}

const SignOutAction = (Email) => async (Dispatch) => {
    try {
        const { data } = await Axios.post("/API/Users/SignIn", { Email });
        Dispatch({
            type: SIGN_OUT_SUCCESS, Payload: data
        })
        Cookie.set("SignInUserInfo", JSON.stringify(data));
        window.location.reload(false);
        window.location.replace("http://localhost:3000")

    } catch (error) {
        Dispatch({ type: SIGN_OUT_FAIL, Payload: error.message })
    }
}

const UpdateProfileAction = (_id, FirstName, LastName, PhoneNumber, Address, City, PostalCode, Country) => async (Dispatch) => {
    try {
        const { data } = await Axios.post("/API/Users/UpdateProfile", { _id, FirstName, LastName, PhoneNumber, Address, City, PostalCode, Country });
        if (data._id) {
            Cookie.set("SignInUserInfo", JSON.stringify(data));
            window.location.reload(false);
        }

        else {
            Dispatch({ type: USER_UPDATE_FAIL, Payload: data })
        }

    } catch (error) {
        Dispatch({ type: USER_UPDATE_FAIL, Payload: error.message })
    }
}

const UpdatePasswordAction = (_id, OldPassword, NewPassword, ReConfirmPassword) => async (Dispatch) => {
    try {
        const { data } = await Axios.post("/API/Users/UpdatePassword", { _id, OldPassword, NewPassword, ReConfirmPassword });
        Dispatch({ type: USER_PASSWORD_UPDATE_SUCCESS, Payload: data })

    } catch (error) {
        Dispatch({ type: USER_PASSWORD_UPDATE_FAIL, Payload: error.message })
    }
}

const SalesDataAction = () => async (Dispatch) => {
    try {
        const SignIn = Cookie.getJSON("SignInUserInfo");
        const { data } = await Axios.get("/API/Sales", {
            headers: {
                'authorization': SignIn.Token
            }
        })
        Dispatch({ type: SALES_DATA_SUCCESS, Payload: data })

    } catch (error) {
        Dispatch({ type: SALES_DATA_FAIL, Payload: error.message })
    }
}

export { CartUpdateDetailsAction, CartDeleteDetailsAction, OrderCreateAction, OrdersDataAction, OrdersDispatchAction, OrderDeleteAction, ProductsDataAction, ProductDetailsAction, ProductUpdateAction, ProductCreateAction, ProductDeleteAction, SignUpAction, SignInAction, SignOutAction, UpdateProfileAction, UpdatePasswordAction, SalesDataAction };