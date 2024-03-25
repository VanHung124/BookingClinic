import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService } from '../../services/userService';
import { ToastContainer, toast } from 'react-toastify';

//Gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e)
        }
    }
};
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// });
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});


//Position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchpositionFailed());
            }
        } catch (e) {
            dispatch(fetchpositionFailed());
            console.log('fetchGenderStart error', e)
        }
    }
};
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
});
export const fetchpositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});


//Roles
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchGenderStart error', e)
        }
    }
};
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});


export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);

            if (res && res.errCode === 0) {
                toast.success("Tạo người dùng thành công!");
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Tạo người dùng không thành công!");
                dispatch(saveUserFailed());
            }
        } catch (e) {
            toast.error("Tạo người dùng không thành công!");
            dispatch(saveUserFailed());
            console.log('fetchGenderStart error', e)
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});




export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("All");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            console.log('fetchGenderStart error', e)
        }
    }
};
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
});
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
});



export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);

            if (res && res.errCode === 0) {
                toast.success("Xóa người dùng thành công!");
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Xóa người dùng không thành công!");
                dispatch(saveUserFailed());
            }
        } catch (e) {
            toast.error("Xóa người dùng không thành công!");
            dispatch(saveUserFailed());
            console.log('fetchGenderStart error', e)
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);

            if (res && res.errCode === 0) {
                toast.success("Thay đổi người dùng thành công!");
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Thay đổi người dùng không thành công!");
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Thay đổi người dùng không thành công!");
            dispatch(editUserFailed());
            console.log('fetchGenderStart error', e)
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});
