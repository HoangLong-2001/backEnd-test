const { aTask } = require("../services/taskService");

module.exports = {
  postCreateATask: async (req, res) => {
    console.log(req.body);
    
    try {
      const task = await aTask(req.body);
      return res.status(201).json({
        EC: 0,
        data: task,
      });
    } catch (err) {
      return res.status(401).json({
        EC: -1,
        message: err.message,
      });
    }
  },
};
