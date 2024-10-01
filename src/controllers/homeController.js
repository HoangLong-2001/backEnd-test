// const connection = require("../config/database");
const {
  getAllUsers,
  getUserById,
  updateUserById,
} = require("../services/CRUDServices");
const Users = require("../Models/user");
const getHomepage = async (_, res) => {

res.send("hello ")
}
const postUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  // await connection.query(
  //     `INSERT INTO Users (email,name,city) VALUES (?,?,?)`,
  //     [email, name, city]
  //   );
  await Users.create({ email: email, name: name, city: city });
  res.redirect("/v1");
};
const getCreatePage = (_, res) => {
  res.render("create.ejs");
};
const getUpdatePage = async (req, res) => {
  console.log(req.params);
  const result = await Users.findById(req.params.id);

  res.render("edit.ejs", { user: result });
};
const updateUser = async (req, res) => {
  let userId = req.params.id;
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  // const result = await updateUserById(id, email, name, city);
  const result = await Users.updateOne(
    { _id: userId },
    { email: email, name: name, city: city }
  );
  res.redirect("/v1");
  console.log(result);
};
const postDeleteUser = async (req, res) => {
  let user = await Users.find({_id:req.params.id});

  res.render("delete.ejs", { userDel: user });
};
const postHandleDeleteUser = async (req, res) => {
  let id = req.body.id;
  await Users.deleteOne({_id:id});
  res.redirect("/v1");
};
module.exports = {
  getHomepage,
  postUser,
  getCreatePage,
  getUpdatePage,
  updateUser,
  postDeleteUser,
  postHandleDeleteUser,
};
