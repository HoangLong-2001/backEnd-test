const { uploadSingleFile } = require("../services/FileService");
const {
  createCustomerService,
  deleteACustomerService,
  getAllCustomersService,
} = require("../services/customerService");
module.exports = {
  postCreateCustomer: async (req, res) => {
    // {
    //   name: { type: String, require: true },
    //   address: String,
    //   phone: Number,
    //   email: String,
    //   image: String,
    //   description: String,
    // },
    const { name, address, phone, email, description } = req.body;
    const Joi = require("joi");
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      address: Joi.string().required(),
      phone: Joi.string().pattern(new RegExp("^[0-9]{8,10}$")),

      email: Joi.string().email(),
      description: Joi.string(),
      array:Joi.array().sort({
        order:'ascending'
      })
    });
    const result = schema.validate(req.body, { abortEarly: false });
    console.log(">>check result: ", result.error);
    if (result) return res.send("ok");
    else return res.send("err");
    let imgURL = "localhost:8081/images/upload/";
    if (!req.files || Object.keys(req.files).length === 0) {
      // return res.status(400).send("No files were uploaded.");
    } else {
      const result = await uploadSingleFile(req.files.image);
      imgURL = imgURL + result.path;
    }
    let customerData = {
      name,
      address,
      phone,
      email,
      description,
      image: imgURL,
    };
    try {
      let customer = await createCustomerService(customerData);
      return res.status(200).json({
        EC: 0,
        data: customer,
      });
    } catch (err) {
      return res.status(400).json({
        EC: -1,
        message: err.message,
      });
    }
  },
  deleteACustomer: async (req, res) => {
    let id = req.params.id;
    try {
      const customer = await deleteACustomerService(id);
      return res.send(200).json({
        EC: 0,
        data: customer,
      });
    } catch (err) {
      return res.send(400).json({
        EC: -1,
        message: err.message,
      });
    }
  },
  deleteCustomers: async (req, res) => {
    console.log(req.query);
    res.send("");
  },
  getAllCustomers: async (req, res) => {
    console.log(req.query);
    let limit = req.query.limit;
    let page = req.query.page;
    let customers = null;
    try {
      customers = await getAllCustomersService(limit, page, req.query);
      return res.status(200).json({
        EC: 0,
        data: customers,
      });
    } catch (err) {
      return res.status(400).json({
        EC: -1,
        message: err.message,
      });
    }
  },
};
