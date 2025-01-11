import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./router/web";
import connectDB from "./config/connectDB";
import cors from "cors";
require('dotenv').config();

let app = express();

const corsOptions = {
   origin: 'http://localhost:3000',
   methods: 'GET,POST'
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }))


viewEngine(app);
initWebRouters(app);

connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
   console.log("Web Backend port: " + port);
})