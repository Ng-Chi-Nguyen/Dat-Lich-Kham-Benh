import { and } from "sequelize";
import userServices from "../services/userServices";

let handleLogin = async (req, res) => {
   let email = req.query.email;
   let password = req.query.password;
   if (!email || !password) {
      return res.status(500).json({
         errCode: 1,
         message: "Chua Nhap email hoac passowrd",
      })
   }
   let userData = await userServices.userLogin(email, password)
   return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMessage,
      userData

   })
}

let handleGetAllUesr = async (req, res) => {
   let id = req.query.id; // All, id
   let users = await userServices.getAllUesr(id);
   // console.log(users)
   if (!id) {
      return res.status(200).json({
         errCode: 0,
         message: "Bạn chưa truyên vào id",
         users: []
      })
   }
   return res.status(200).json({
      errCode: 0,
      message: "OK",
      users
   })
}

let handleCreateNewUser = async (req, res) => {
   let message = await userServices.createNewUser(req.body);
   // console.log(message)
   return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
   let data = req.body;
   let message = await userServices.updateUserData(data);
   return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
   // console.log(req.body)
   if (!req.body.id) {
      return res.status(200).json({
         errCode: 1,
         message: "Thiếu tham số quy định, hãy kiểm tra lại!"
      })
   }
   let message = await userServices.deleteUser(req.body.id);
   // console.log(message)
   return res.status(200).json(message);
}

module.exports = {
   handleLogin: handleLogin,
   handleGetAllUesr: handleGetAllUesr,
   handleCreateNewUser: handleCreateNewUser,
   handleEditUser: handleEditUser,
   handleDeleteUser: handleDeleteUser
}