const Product = require("../models/product.js");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductByID = (req, res, next, id) => {
  Product.findById({ _id: id })
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "No Product found from this ID"
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image"
      });
    }
    //Destructure the fields
    //Handelling fields
    const { name, description, price, category, stock } = fields;
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }
    let product = new Product(fields);

    //Handelling files
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File Size is too big"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //Save to th DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          err: "Saving TShirt on DB is failed"
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  res.json(req.product);
};
//Middleware
exports.photo = (req, res, next) => {
  if (req.product.photo) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, product) => {
    if (err) {
      return res.status(400).json({
        err: "Failed to delete the product"
      });
    }
    res.json({
      msg: `${product.name} was deleted successfully`
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image"
      });
    }

    //Updating the product
    let product = req.product;
    //For updating product using lodash and "extend()" method
    product = _.extend(product, fields);

    //Handelling files
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File Size is too big"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //Save to th DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          err: "Updation of product failed"
        });
      }
      res.json(product);
    });
  });
};

exports.getAllProducts = (req, res) => {
  //passing limit,sortby from frontend as query (default 8)
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find({})
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          err: "No product found"
        });
      }
      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      res.status(400).json({
        error: "No Category found"
      });
    }
    res.json(category);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map(product => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { stock: -product.count, sold: +product.count } }
      }
    };
  });
  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      res.status(400).json({
        error: "Bulk Operations failed"
      });
    }
    next();
  });
};
