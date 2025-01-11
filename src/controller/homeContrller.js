import db from '../models/index';
import CRUDService from '../services/SRCUservices';

let getHomePage = async (req, res) => {
   try {
      let data = await db.User.findAll();
      console.log("-------------------------")
      console.log(data)
      console.log("-------------------------")
      return res.render('homepage.ejs', {
         data: JSON.stringify(data)
      });
   } catch (error) {
      console.log(error);
   }
}


let getAboutPage = (req, res) => {
   return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
   return res.render('test/crud.ejs');
}

let postCRUD = async (req, res) => {
   let message = await CRUDService.createNewUser(req.body);
   console.log(message);
   return res.send('post crud');
}

let displayGetCRUD = async (req, res) => {
   let data = await CRUDService.getAllUser();
   // console.log("================ GETALLUSER =================")
   // console.log(data)
   // console.log("=================================")
   return res.render("test/displayCRUD.ejs", {
      dataTable: data
   });
}

let getEditCRUD = async (req, res) => {
   let userId = req.query.id;
   if (userId) {
      let userData = await CRUDService.getUserInfoById(userId);
      // console.log("=============== USERDATA ==================")
      // console.log(userData)
      // console.log("=================================")
      return res.render("test/editCRUD.ejs", {
         user: userData
      })
   } else {
      return res.send("Helo not edit id")
   }
}

let putCRUD = async (req, res) => {
   let data = req.body;
   let newUser = await CRUDService.updateUserData(data);
   return res.render("test/displayCRUD.ejs", {
      dataTable: newUser
   });
}

let deleteCRUD = async (req, res) => {
   let id = req.query.id;
   if (id) {
      await CRUDService.deleteUserById(id);
      return res.send("Delete from")
   } else {
      return res.send("Delete from bot found")
   }

}

module.exports = {
   getHomePage: getHomePage,
   getAboutPage: getAboutPage,
   getCRUD: getCRUD,
   postCRUD: postCRUD,
   displayGetCRUD: displayGetCRUD,
   getEditCRUD: getEditCRUD,
   putCRUD: putCRUD,
   deleteCRUD: deleteCRUD,
}