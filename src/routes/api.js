const express = require("express");
const {
  getAllUsers,
  createAUser,
  updateAUser,
  deleteAUser,
  postUploadSingleFileApi,
  postUploadMultipleFilesApi,
} = require("../controllers/apiController");
const {
  postCreateCustomer,
  deleteACustomer,
  deleteCustomers,
  getAllCustomers,
} = require("../controllers/customerController");
const {
  postCreateAProject,
  getAllProjects,
} = require("../controllers/projectController");
const { postCreateATask } = require("../controllers/taskController");
const router = express.Router();
router.get("/users", getAllUsers);
router.post("/users", createAUser);
router.put("/users/:id", updateAUser);
router.delete("/users/:id", deleteAUser);
router.post("/file", postUploadSingleFileApi);
router.post("/files", postUploadMultipleFilesApi);
router.post("/customers", postCreateCustomer);
router.delete("/customer/:id", deleteACustomer);
router.delete("/customers", deleteCustomers);
router.get("/info/:name/:address", (req, res) => {
  console.log(">>check params", req.params);
  return res.status(200).json({
    data: req.params,
  });
});
router.get("/customers", getAllCustomers);
router.post("/projects", postCreateAProject);
router.get("/projects", getAllProjects);
router.post("/tasks", postCreateATask);
module.exports = router;
