export const productsReducer = (state = { products: [] }, action) => {
    if (action.type === "FETCH_PRODUCTS") {
        return { products: action.payload };
    }
    else {
        return state;
    }
};