const stripe = require("stripe")(process.env.STRIPE_SECRET);
export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: item.quantity,
    price_data: {
      currency: "INR",
      unit_amount: item.amount * 103 * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1JpFdaSAenCmODAd60MIF9cl"],
    shipping_address_collection: {
      allowed_countries: ["IN", "US", "GB"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/cancel`,
    metadata: {
      email: email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });
  console.log(`session.id`, session.id);
  res.status(200).json({
    id: session.id,
  });
};
