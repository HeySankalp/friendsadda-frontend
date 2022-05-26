export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
});

export const LoginFailure = (success) => ({
    type: "LOGIN_FAILURE",
    payload: success
});