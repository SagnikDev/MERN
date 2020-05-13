const mongoose = require("mongoose"); //Using for importing mongoose
const { ObjectId } = mongoose.Schema; //Using for refer from another Schema
//Creating a schema
const productCartSchema = new mongoose.Schema({
  //Refering Product Schema
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});
//Storing the schema
const ProductCart = mongoose.model("ProductCart", productCartSchema);
//Creating a schema
const orderSchema = new mongoose.Schema(
  {
    products: [productCartSchema],
    transaction_id: {type : String},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: "Recieved",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"],
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
//Storing the schema
const Order = mongoose.model("Order", orderSchema);
//Exprting the modules
module.exports = { Order, ProductCart };
