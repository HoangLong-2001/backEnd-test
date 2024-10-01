require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");
const app = express(); // app express
const port = Number(process.env.PORT) || 8081; // port
const hostname = process.env.HOST_NAME;
const connection = require("./config/database");
const fileUpload = require("express-fileupload");
const { MongoClient } = require("mongodb");
configViewEngine(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
// khai bao route
// app.use("/v1", webRoutes);
app.use("/api", apiRoutes);
(async function () {
  try {
    // using moongose
    await connection();

    // using mongodb driver;

    // const url = process.env.DB_HOST_WITH_DRIVER;
    // const client = new MongoClient(url);
    // const dbName = process.env.DB_NAME;
    // await client.connect();
    // console.log("Connected successfully to server");
    // const db = client.db(dbName);
    // const collection = db.collection("customers");
    // collection.insertOne({name:"Nguyen Van A",
    //   address:{
    //     province:'hn',
        
    //   }
    // });
    
    app.listen(port, hostname, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.log(">> ERROR CONNECT TO DB", err);
  }
})();
