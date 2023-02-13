import cookie from "js-cookie";
import axios from "axios";

export const signInAction = (email, password) => async (dispatch) => {
    try {
        const { data } = await axios.post("/API/Users/SignIn", { email, password });
        if (data.message === "Sign in successfully") {
            dispatch({
                type: "SIGN_IN_SUCCESS", payload: data.user
            })
            cookie.set("userInfo", JSON.stringify(data.user));
            window.location.reload(false);
            window.location.replace("http://localhost:3000")
        }
        else {
            return data;
        }
    } catch (error) {
        return error;
    }
}