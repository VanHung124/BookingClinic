
import bcrypt from 'bcryptjs';
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);
//truyền dữ liệu dc nhập vào data
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                positionId: data.positionId,
            })
           
            resolve('data');
        } catch (e) {
            reject(e);
        }
    })

}
// đổi định dạng pasword
let hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            let hashPassword = bcrypt.hashSync(password,salt)
            // let hashPassword = bcrypt.hashSync("B4c0/\/", salt)

            resolve(hashPassword);


        } catch (e) {
            reject(e);
        }

    })
}

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = db.User.findAll({
                raw: true,
            });
            resolve(user)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })

            if (user) {
                resolve(user)
            }
            else {
                resolve([])
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.email = data.email;
                user.password = data.password;
                user.firstName = data.firstName;
                user.lastName = data.lastName;;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                await user.save();

                let allUsers = await db.User.findAll();

                resolve(allUsers);
                resolve();
            }
            else {
                resolve();
            }
        } catch (e) {
            console.log(e)
        }
    })
}

let deleteUserById =(userId) =>{
    return new Promise(async(resolve, reject) =>{
        try{
            let user = await db.User.findOne({
                where: {id: userId},
            });
            if(user){
                user.destroy();
            }
            resolve();
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}