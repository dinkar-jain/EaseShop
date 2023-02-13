export const cartReducer = (state = {}, action) => {
    if (action.type === "ADD_TO_CART") {
        const newProduct = action.payload;
        const existingProduct = state.cart.find(product => product._id === newProduct._id);
        if (existingProduct && existingProduct.size === newProduct.size) {
            return { cart: state.cart.map(product => product._id === existingProduct._id ? newProduct : product) }
        }
        return { cart: [...state.cart, newProduct] }
    }

    else if (action.type === "UPDATE_CART_ITEM") {
        const { productId, quantity, size } = action.payload;
        return {
            cart: state.cart.map(product => product._id === productId ? {
                ...product,
                quantity: quantity ? quantity : product.quantity,
                size: size ? size : product.size
            } : product)
        }
    }

    else if (action.type === "DELETE_FROM_CART") {
        return { cart: state.cart.filter(product => product._id !== action.payload.id || product.size !== action.payload.size) };
    }

    else if (action.type === "CLEAR_CART") {
        return { cart: [] };
    }

    else {
        return state;
    }
};