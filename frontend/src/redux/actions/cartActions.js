export const addToCartAction = (productsData, quantity, size) => async (dispatch, getState) => {
    try {
        dispatch({
            type: "ADD_TO_CART", payload: {
                _id: productsData._id,
                sellerId: productsData.sellerId,
                name: productsData.name,
                image: productsData.image,
                price: productsData.price,
                quantity: quantity,
                size: size,
            }
        });
        const { cart } = getState();
        window.localStorage.setItem("cart", JSON.stringify(cart));
        return "success";
    } catch (error) {
        return error;
    }
}

export const updateCartItemAction = (productId, data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: "UPDATE_CART_ITEM", payload: {
                productId: productId,
                ...data
            }
        });
        const { cart } = getState();
        window.localStorage.setItem("cart", JSON.stringify(cart));
        return "success";
    } catch (error) {
        return error;
    }
}

export const deleteFromCartAction = (productId, size) => async (dispatch, getState) => {
    try {
        dispatch({
            type: "DELETE_FROM_CART", payload: {
                id: productId,
                size: size
            }
        });
        const { cart } = getState();
        window.localStorage.setItem("cart", JSON.stringify(cart));
        return "success";
    } catch (error) {
        return error;
    }
}

export const clearCartAction = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: "CLEAR_CART"
        });
        const { cart } = getState();
        window.localStorage.setItem("cart", JSON.stringify(cart));
        return "success";
    } catch (error) {
        return error;
    }
}