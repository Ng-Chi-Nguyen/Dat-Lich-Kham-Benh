import express from "express";
import homeContrller from "../controller/homeContrller";
import userController from "../controller/userController";

let router = express.Router();

let initWebRouters = (app) => {
   router.get("/", homeContrller.getHomePage);
   router.get("/about", homeContrller.getAboutPage);
   router.get("/crud", homeContrller.getCRUD);

   router.post("/post-crud", homeContrller.postCRUD);
   router.get("/get-crud", homeContrller.displayGetCRUD);
   router.get("/edit-crud", homeContrller.getEditCRUD);
   router.post("/put-crud", homeContrller.putCRUD);
   router.get("/delete-crud", homeContrller.deleteCRUD);


   router.post('/api/login', userController.handleLogin);
   router.get('/api/get-all-user', userController.handleGetAllUesr);
   router.post('/api/create-new-user', userController.handleCreateNewUser);
   router.put('/api/edit-user', userController.handleEditUser);
   router.delete('/api/delete-user', userController.handleDeleteUser);

   router.get("/home", (req, res) => {
      return res.send("Hello Day la trang HOME");
   });

   return app.use("/", router);
}

module.exports = initWebRouters;