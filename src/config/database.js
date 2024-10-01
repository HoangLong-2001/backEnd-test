require("dotenv").config();
const mysql = require("mysql2/promise");
const mongoose = require("mongoose");
const { options } = require("../routes/web");
// const connection = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT || 3307,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   password:process.env.DB_PASSWORD,
//   waitForConnections:true,
//   connectionLimit:10,
//   queueLimit:0
// });
var dbState = [{
  value: 0,
  label: "disconnected"
},
{
  value: 1,
  label: "connected"
},
{
  value: 2,
  label: "connecting"
},
{
  value: 3,
  label: "disconnecting"
}];

const connection = async () => {
  // moongose.connect().catch(error=>handleError(err))
  try {
    const options = {
      user:process.env.DB_USER,
      pass:process.env.DB_PASSWORD,
      dbName:process.env.DB_NAME
    }
    await mongoose.connect(process.env.DB_HOST,options);
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find(f => f.value == state).label, "to db");
  } catch (err) {
    throw err
  }
};
module.exports = connection;
