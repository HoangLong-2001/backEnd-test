const Project = require("../Models/project");
const aqp = require("api-query-params");
module.exports = {
  createAProject: async (project) => {
    try {
      if (project.type === "EMPTY-PROJECT") {
        const result = await Project.create(project);
        return result;
      } else if (project.type == "ADD-USERS") {
        console.log(">>check data", project);
        console.log(project.userArray[0]);
        // find prodject by ID
        let myProj = await Project.findById(project.projectId).exec();
        myProj.usersInfor = project.userArray
        let newResult = await myProj.save();
        return newResult;
      }else if(project.type === 'DELETE-USERS'){
        let myProj = await Project.findById(project.projectId).exec();
        project.userArray.forEach((user)=>{
          myProj.userArray.pull(user)
        })
        let newResult = await myProj.save();
        return newResult;
      }
      else if(project.type === "ADD-TASKS"){
        let myProj = await Project.findById(project.projectId);
        project.taskArray.forEach((task)=>{
          myProj.tasks.push(task)
        })
        let newResult = await myProj.save();
        return newResult;
      }
      return null;
    } catch (err) {
      throw err;
    }
  },
  getProject: async (queryString) => {
    const page = queryString.page;
    const { filter, limit, population } = aqp(queryString);
    delete filter.page;
    console.log(filter);
    
    let offset = (page - 1) * limit;
    const result = await Project.find(filter)
      .populate(population)
      .skip(offset)
      .limit(limit);


    return result;
  },
};
