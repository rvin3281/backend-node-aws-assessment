const User = require("../model/userModel");

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      satus: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const page = req.query.page || 1; // Get the requested page from the query string
    const perPage = 10; // Set the number of records to retrieve per page
    const offset = (page - 1) * perPage; // Calculate the offset
    const getAllUser = await User.findAndCountAll({
      where: {
        active: 1,
      },
      order: [["createdAt", "DESC"]], // Order by createdAt column in descending order
      offset: offset, // Apply the offset
      limit: perPage, // Apply the limit
    });

    // GET THE TOTAL PAGE TO DISPLAY ON THE PAGINATION
    const numOfpages = Math.ceil(getAllUser.count / perPage);
    const currentPage = Number(page);

    if (getAllUser.length === 0) {
      // No data found; throw a custom error
      throw new Error("No data found");
    }

    res.status(200).json({
      status: "success",
      count: getAllUser.count, // Total number of records
      currentPage, // Current page
      perPage: perPage, // Records per page
      data: getAllUser.rows,
      numOfpages,
    });
  } catch (error) {
    if (error.message === "No data found") {
      // Handle the case where no data is found
      return res.status(404).json({
        message: "No data found",
        error: error,
      });
    }

    res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};

exports.getSingleUser = async (req, res, next) => {
  try {
    const idStr = req.params.id;

    if (!/^\d+$/.test(idStr)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid ID format",
      });
    }

    const id = Number(idStr); // Convert to number

    const data = await User.findByPk(id);

    if (!data) {
      return res.status(400).json({
        status: "No data found",
      });
    }

    res.status(201).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(201).json({
      status: "fail",
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    // UPDATE DATA BASED ON ID
    const [data] = await User.update(req.body, {
      where: {
        id: id,
      },
    });

    if (!data) {
      return res.status(400).json({
        status: "fail",
      });
    }

    // RETRIVE THE DATA
    const query = await User.findByPk(id);

    if (!query) {
      return res.status(400).json({
        status: "fail",
      });
    }

    res.status(200).json({
      status: "success",
      data: query,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const checkDeletedUser = await User.findOne({
      where: {
        id: id,
      },
    });

    console.log(checkDeletedUser);

    if (!checkDeletedUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (!checkDeletedUser.active) {
      return res.status(400).json({
        message: "User already deleted",
      });
    }

    const result = await User.update(
      { active: false },
      {
        where: { id: id },
      }
    );
    console.log(result);
    if (result) {
      res.status(200).json({
        status: "Success",
      });
    } else {
      return res.status(404).json({ status: "fail" });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
};
