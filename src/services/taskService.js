const Task = require("../Models/task");

module.exports = {
  aTask: async (data) => {
    try {
      if (data.type === "EMPTY-TASK") {
        const result = await Task.create(data);
        return result;
      } else if (data.type === "ADD-USER") {
        let myTask = await Task.updateOne(
          { _id: data.taskId },
          { usersInfo: data.userInfor }
        );
        //    await Task.findById(data.taskId).exec();
        //  console.log(data);
        //   console.log(myTask);
        //   myTask.usersInfo = data.userInfor
        //   let newResult = await myTask.save();
        //   return newResult
        return myTask;
      } else if (data.type === "ADD-PROJECTS") {
        let myTask = Task.findById(data.taskId).exec();
        data.projectArray.forEach((project) => {
          myTask.projectInfor.push(project);
        });
        let newResult = myTask.save();
        return newResult;
      } else if (data.type === "UPDATE-USER") {
        let myTask = await Task.findById(data.taskId)
        myTask.usersInfo.name = data.name
        let newReult = await myTask.save()
        return newReult
      }
    } catch (err) {
      throw err;
    }
  },
};
