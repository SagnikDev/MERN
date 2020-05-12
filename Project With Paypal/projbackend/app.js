require("dotenv").config(); //Importing .env package
const mongoose = require("mongoose"); //Importing package
const express = require("express"); //Importing package
const bodyParser = require("body-parser"); //Importing package
const cookieParser = require("cookie-parser"); //Importing package
const cors = require("cors"); //Importing package
const app = express();
//My Routes Path
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const categoryRoutes = require("./routes/category.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");
const stripePaymentRoute = require("./routes/srtipePayment.js");
const PaymentBRoutes = require("./routes/PaymentBRoutes.js");
//Connection establishment
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB is CONNECTED,AWESOME!");
  })
  .catch(() => {
    console.log("Error! DB NOT CONNECTED");
  });

//Implementing Middlewares

//bodyParser helps to take input from the body
app.use(bodyParser.json());
//cookieParser helps to put or delete some value to user browser cookie
app.use(cookieParser());
app.use(cors());

//My routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripePaymentRoute);
app.use("/api", PaymentBRoutes);
//proess.env.PORT,process.env.DATABASE are comming from .env file
const port = process.env.PORT;

//Starting a Server
app.listen(port, () => {
  console.log(`Server is listening at PORT ${port}`);
});
