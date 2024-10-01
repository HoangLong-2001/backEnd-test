const Customers = require("../Models/customer");
const aqp = require("api-query-params");

const createCustomerService = async (customerData) => {


  try {
    let result = await Customers.create(customerData);
    return result;
  } catch (err) {
    throw new Error(err);
  }
};
const deleteACustomerService = async (id) => {
  try {
    const result = await Customers.find({ _id: id });

    return result;
  } catch (err) {
    throw new Error(err);
  }
};
const getAllCustomersService = async (limit, page,queryString) => {
  try {
    let result = null;
    if (limit && page) {
      let offset = (page - 1) * limit;
      const { filter, skip,  } = aqp(queryString);
      console.log(">>check filter: ",filter);
      // delete filter.page
      
      result = await Customers.find({
     
      })
        .sort({ createAt: -1 })
        .skip()
        .limit();
    } else {
      result = await Customers.find({});
    }

    return result;
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  createCustomerService,
  deleteACustomerService,
  getAllCustomersService,
};
