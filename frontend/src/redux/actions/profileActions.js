import cookie from "js-cookie";
import axios from "axios";

export const updateProfileAction = (name, address, country, postalCode) => async (dispatch) => {
    try {
        const { data } = await axios.post("/API/Users/UpdateProfile", {
            name, address, country, postalCode
        }, {
            headers: {
                'authorization': cookie.getJSON("userInfo").token
            }
        });
        if (data.message === "Profile updated successfully") {
            dispatch({
                type: "SIGN_IN_SUCCESS", payload: data.user
            })
            cookie.set("userInfo", JSON.stringify(data.user));
            return ("Profile updated successfully");
        }
        else {
            dispatch({
                type: "SIGN_IN_FAIL", payload: data
            })
        }
    } catch (error) {
        dispatch({ type: "SIGN_IN_FAIL", payload: error.message })
    }
}