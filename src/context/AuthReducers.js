const AuthReducer = (state, action)=>{
    switch(action.type){
        case "LOGIN_START": return{
            user: null,
            isFetching: true,
            success : false
        };

        case "LOGIN_SUCCESS": return{
            user: action.payload,
            isFetching: false,
            success : true
        };

        case "LOGIN_FAILURE": return{
            user: null,
            isFetching: false,
            success : false
        };
        default:
            return state;
    }
};
export default AuthReducer