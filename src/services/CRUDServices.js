const connection = require("../config/database");
const getAllUsers = async () => {
  const [results] = await connection.query(`SELECT * FROM  Users u`);
  return results;
};
const getUserById = async (id) => {
  const [results] = await connection.query(
    `SELECT * from Users u WHERE id = ${id}`
  );
  return results;
};
const updateUserById = async (id, email, name, city) => {
  const [results] = await connection.query(
    `UPDATE Users
SET email = ?, name=?,city=?
WHERE id = ?`,
    [email, name, city, id]
  );
  return results;
};
module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
};
