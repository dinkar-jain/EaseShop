import axios from "../../Axios";

export const fetchProductsAction = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/API/Products");
        dispatch({ type: "FETCH_PRODUCTS", payload: data });
    } catch (error) {
        return error;
    }
}