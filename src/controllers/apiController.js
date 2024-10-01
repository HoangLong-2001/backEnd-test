const Users = require("../Models/user");

const {
  uploadSingleFile,
  uploadMultiFiles,
} = require("../services/FileService");
const getAllUsers = async (req, res) => {
  let results = await Users.find({});
  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};
const createAUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  const user = await Users.create({ email: email, name: name, city: city });
  return res.status(201).json({
    EC: 0,
    data: user,
  });
};
const updateAUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  const user = await Users.updateOne(
    { _id: req.params.id },
    { email: email, name: name, city: city }
  );
  return res.status(201).json({
    EC: 0,
    data: user,
  });
};
const deleteAUser = async (req, res) => {
  const user = await Users.deleteOne({ _id: req.params.id });
  return res.status(200).json({
    EC: 0,
    data: user,
  });
};
const postUploadSingleFileApi = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const result = await uploadSingleFile(req.files.image);
  return res.send(result);
};
const postUploadMultipleFilesApi = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  if (Array.isArray(req.files.image)) {
    let result = await uploadMultiFiles(req.files.image);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  } else {
    return await postUploadSingleFileApi(req, res);
  }
};
module.exports = {
  getAllUsers,
  createAUser,
  updateAUser,
  deleteAUser,
  postUploadSingleFileApi,
  postUploadMultipleFilesApi,
};
