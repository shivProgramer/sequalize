const { where } = require("sequelize");
var db = require("../models/index");
var User = db.user;

var addUser = async (req, res) => {
  const jane = await User.create({ firstName: "shubham" });
  console.log(jane instanceof User);
  console.log(jane.firstName);
  await jane.update({ firstName: "Ada" });
  await jane.destroy();
  console.log("Jane was saved to the database!");
  console.log(jane.toJSON());
  res.status(200).json(jane.toJSON());
};

//  for get all api ----------------
var getUser = async (req, res) => {
  const data = await User.findAll();
  res.status(200).json({ data: data });
};

// for get single user by id -----------------------------------
var getSingleUser = async (req, res) => {
  try {
    const data = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (data) {
      res.status(200).json({ data: data });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
//   or --------------

// var getSingleUser = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (user) {
//       res.status(200).json({ data: user });
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// data post ----------------------------------------------

const postUsers = async (req, res) => {
  try {
    const postData = req.body;
    const data = await User.create(postData);
    if (data) {
      res.status(200).json({ data: data });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const postBulkData = async (req, res) => {
  try {
    const postData = req.body;
    let data;
    if (postData.length > 1) {
      data = await User.bulkCreate(postData);
    } else {
      data = await User.create(postData);
    }
    if (data) {
      res.status(200).json({ data: data });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// update
var patchUser = async (req, res) => {
  let updateData = req.body;
  try {
    const [rowsAffected] = await User.update(updateData, {
      where: {
        id: req.params.id,
      },
    });
    if (rowsAffected > 0) {
      // If rows were affected, fetch the updated user data
      const updatedUser = await User.findByPk(req.params.id);
      res.status(200).json({ data: updatedUser });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// delete
var deleteUser = async (req, res) => {
  try {
    const affectedRows = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (affectedRows > 0) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addUser,
  getUser,
  getSingleUser,
  postUsers,
  postBulkData,
  deleteUser,
  patchUser,
};
