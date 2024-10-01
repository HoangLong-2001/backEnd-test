const { createAProject, getProject } = require("../services/projectService");

module.exports = {
  postCreateAProject: async (req, res) => {
    try {
      const project = await createAProject(req.body);
      return res.status(201).json({
        EC: 0,
        data: project,
      });
    } catch (err) {
      return res.status(401).json({
        EC: -1,
        message: err.message,
      });
    }
  },
  getAllProjects: async (req, res) => {
    
    let result = await getProject(req.query);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
