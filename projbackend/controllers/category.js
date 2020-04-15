const Category = require("../models/category.js");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById({ _id: id }).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        err: "No Category found in DB"
      });
    }
    req.category = category;
  });
  next();
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save category in DB"
      });
    }
    res.json(category);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find({}).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        err: "No Categories found"
      });
    }
    res.jason(category);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to update category in DB"
      });
    }
    res.json(category);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        err: "Failed to delete these category"
      });
    }
    res.json({
      message: `${category.name} is deleted successfully`
    });
  });
};
