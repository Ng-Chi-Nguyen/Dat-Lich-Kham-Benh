import db from "../models/index";
import bcrypt from "bcryptjs"; // hash password

const salt = bcrypt.genSaltSync(10);


let userLogin = (email, password) => {
   return new Promise(async (resolve, reject) => {
      try {
         let userData = {}
         let isExist = await checkUserEmail(email);
         if (isExist) {
            let user = await db.User.findOne({
               attributes: ['email', 'roleId', 'password'],
               where: { email: email }, // Bien phia sau gan gia tri cho bien phia truoc
               raw: true
            })
            if (user) {
               let check = await bcrypt.compareSync(password, user.password);
               if (check) {
                  userData.errCode = 0;
                  userData.errMessage = "OK";
                  delete user.password;
                  userData.user = user
               } else {
                  userData.errCode = 3;
                  userData.errMessage = "Wrong password";
               }
            } else {
               userData.errCode = 2;
               userData.errMessage = "User isn't notfound";
            }
         } else {
            userData.errCode = 1;
            userData.errMessage = `Email cua ban khong ton tai, hay thu bang email khac`;
         }
         resolve(userData)
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
            resolve(true)
         } else {
            resolve(false)
         }
      } catch (e) {
         reject(e);
      }
   })
}

let getAllUesr = (userId) => {
   return new Promise(async (resolve, reject) => {
      try {
         let users = '';
         if (userId === "ALL") {
            users = await db.User.findAll({
               attributes: {
                  exclude: ['password']
               }
            }); // Tìm tất cả
         }
         if (userId && userId !== "ALL") {
            users = await db.User.findOne({
               where: { id: userId }, // Truy vấn theo id
               attributes: {
                  exclude: ['password']
               }
            });
         }
         resolve(users);
      } catch (e) {
         reject(e);
      }
   });
};

let hashUserPassword = (Password) => {
   return new Promise(async (resolve, reject) => {
      try {
         var hashPassword = await bcrypt.hashSync(Password, salt);
         resolve(hashPassword);
      } catch (e) {
         reject(e);
      }

   })
}

let createNewUser = (data) => {
   return new Promise(async (resolve, reject) => {
      // Check email da ton tai chua
      // console.log(data)
      let check = await checkUserEmail(data.email);
      if (check === true) {
         resolve({
            errCode: 1,
            message: "Địa chỉ email đã được sữ dụng, hay đổi email khác!"
         })
         return
      }
      try {
         let hashPasswordFromBcrypt = await hashUserPassword(data.password);
         await db.User.create({
            email: data.email,
            password: hashPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender === '1' ? true : false,
            roleId: data.roleId,
         })

         resolve({
            errCode: 0,
            message: "Ok"
         });
      } catch (e) {
         reject(e)
      }
   })
}

let deleteUser = (userId) => {
   return new Promise(async (resolve, reject) => {
      let user = await db.User.findOne({
         where: { id: userId }
      })
      if (!user) {
         resolve({
            errCode: 2,
            message: "Người dùng không tồn tại"
         })
      }

      await user.destroy();
      resolve({
         errCode: 0,
         message: "Người dùng đã bị xóa"
      })
   })
}

let updateUserData = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         if (!data.id) {
            resolve({
               errCode: 2,
               message: "Tài khoản không tồn tại"

            })
         }
         let user = await db.User.findOne({
            where: { id: data.id },
            rew: false
         });
         if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            await user.save();
            // await db.User.save({
            //    firstName: data.firstName,
            //    lastName: data.lastName,
            //    address: data.address,
            // }, { where: { id: userId } });
            resolve({
               errCode: 0,
               message: "Cập nhật thông tin người dùng thành công"
            });
         } else {
            resolve({
               errCode: 1,
               message: "Không tìm thấy người dùng"
            });
         }
      } catch (e) {
         reject(e)
      }
   })
}

module.exports = {
   userLogin: userLogin,
   getAllUesr: getAllUesr,
   createNewUser: createNewUser,
   deleteUser: deleteUser,
   updateUserData: updateUserData
}