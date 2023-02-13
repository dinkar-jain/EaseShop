export const signInReducer = (state = {}, action) => {
    if (action.type === "SIGN_IN_SUCCESS") {
        return { userInfo: action.payload };
    }

    else {
        return state;
    }
};