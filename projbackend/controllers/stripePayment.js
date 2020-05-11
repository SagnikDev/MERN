const stripe = require("stripe")("sk_test_nbHQFpTjb2pbAk2kwLnJq7xy00D0WAOvbu");
const { v4: uuidv4 } = require("uuid"); //For creating unique 'SALT' i.e. an unique id

exports.makePayment = (req, res) => {
  const { token, products } = req.body;
  console.log("PRODUCTS", products);

  let sum = 0;
  products.map((product, index) => {
    sum += product.price;
  });
  console.log("PRICE", sum);
  const idempotencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: sum * 100,
          currency: "USD",
          customer: customer.id,
          receipt_email: token.email,
          description: "A test Account",
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
            },
          },
        },
        { idempotencyKey }
      );
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};
