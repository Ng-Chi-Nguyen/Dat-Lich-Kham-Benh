import express from "express";
import homeContrller from "../controller/homeContrller";

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


   router.get("/home", (req, res) => {
      return res.send("Hello Day la trang HOME");
   });

   return app.use("/", router);
}

module.exports = initWebRouters;