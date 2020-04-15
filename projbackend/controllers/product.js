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
            error:"Please include all fields"
        })
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
    console.log(product)
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
