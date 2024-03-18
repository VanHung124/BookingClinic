import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            console.log('check', action)
            return {
                ...copyState,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            console.log('check', action)
            return {

                ...state,

            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            console.log('check', action)
            return {
                ...state,

            }
        //position
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            console.log('checkp', action)
            return {

                ...state,

            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            console.log('checkp', action)
            return {
                ...state,

            }
            //roles
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {

                ...state,

            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles =[];
            return {
                ...state,

            }
        default:
            return state;
    }
}

export default adminReducer;