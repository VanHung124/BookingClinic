
import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            let hashPassword = bcrypt.hashSync(password, salt)
            // let hashPassword = bcrypt.hashSync("B4c0/\/", salt)

            resolve(hashPassword);


        } catch (e) {
            reject(e);
        }

    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    raw: true,
                });
                if (user) {
                    let check = await bcrypt.compare(password, user.password);
                    console.log(check);
                    console.log(password);
                    console.log(user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok',
                            delete user.password;
                        userData.user = user;

                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Sai mật khẩu'
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = 'Tài khoản không tồn tại'
                }

            }
            else {
                userData.errCode = 1;
                userData.errMessage = 'tài khoản không xác định. vui lòng nhập lại'
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })

}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'All') {
                users = await db.User.findAll({
                    attributes: {
                        expires: ['password']
                    }

                })
            } if (userId && userId !== 'All') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        expires: ['password']
                    }
                })
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email đã tồn tại',
                })

            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar,
                })
            }

            resolve({
                errCode: 0,
                errMessage: 'Tạo thành công',
            });
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: { id: userId },
            raw: false,
        })
        if (!foundUser) {
            resolve({
                errCode: 2,
                errMessage: 'Người dùng không tồn tại',
            })
        }
        // if(user){

        //     await user.destroy();
        // }
        await db.User.destroy({
            where: { id: userId }
        });
        resolve({
            errCode: 0,
            errMessage: 'Xóa thành công',
        })
    })
}

let updateUserData = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    error: 2,
                    errMessage: 'Không hợp lệ'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (user) {

                // await db.User.save({
                //     email: data.email,
                //     password: data.password,
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     address: data.address,
                //     phonenumber: data.phonenumber,
                // }); 
                user.firstName = data.firstName;
                user.lastName = data.lastName;;
                user.address = data.address;
                user.gender = data.gender;
                user.positionId = data.positionId;
                user.roleId = data.roleId;
                user.phonenumber = data.phonenumber;
                if(data.avatar){

                    user.image = data.avatar;
                }
                await user.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update thành công'
                });
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Update không thành công'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu tham số sai'
                })
            } else {

                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
}