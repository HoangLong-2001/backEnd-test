const path = require("path");
const uploadSingleFile = async (fileObject) => {
  const uploadPath = path.resolve(__dirname, "../public/images/upload");

  console.log(__dirname, uploadPath);
  // get image extention
  let extName = path.extname(fileObject.name);
  // get image's name
  let baseName = path.basename(fileObject.name, extName);
  let fileName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${fileName}`;
  try {
    await fileObject.mv(finalPath);
    return {
      status: "success",
      path: fileName,
      error: null,
    };
  } catch (err) {
    return {
      status: "failed",
      path: null,
      error: JSON.stringify(err),
    };
  }
  // Use the mv() method to place the file somewhere on your server
};
const uploadMultiFiles = async (fileArr) => {
  const uploadPath = path.resolve(__dirname, "../public/images/upload");
  let resultArr = [];
  let countSuccess = 0;
  for (let i = 0; i < fileArr.length; i++) {
    let extName = path.extname(fileArr[i].name);
    // get image's name
    let baseName = path.basename(fileArr[i].name, extName);
    let fileName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = `${uploadPath}/${fileName}`;
    try {
      await fileArr[i].mv(finalPath);
      resultArr.push({
        status: "success",
        path: fileName,
        error: null,
      });
    } catch (err) {
      resultArr.push({
        status: "failed",
        path: fileName,
        error: JSON.stringify(err),
      });
    }
  }
  return {
    countSuccess: countSuccess,
    detail: resultArr,
  };
};
module.exports = {
  uploadSingleFile,
  uploadMultiFiles,
};
