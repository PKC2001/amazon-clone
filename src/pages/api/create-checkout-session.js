// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export default async (req, res) => {
//   const { items, email } = req.body;

//   const transformedItems = items.map((item) => ({
//     description: item.description,
//     quantity: 1,
//     price_data: {
//       currency: "inr",
//       unit_amount: item.price * 100,
//       product_data: {
//         name: item.title,
//         images: [item.image],
//       },
//     },
//   }));

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     shipping_rates: [
//       "shr_1N2hN1SAfPIyvQrZrbEoU7Lr",
//       "shr_1N2hP2SAfPIyvQrZk8EZXFei",
//     ],
//     shipping_address_collection: {
//       allowed_countries: ["IN"],
//     },
//     line_items: transformedItems,
//     mode: "payment",
//     success_url: `${process.env.HOST}/success`,
//     cancel_url: `${process.env.HOST}/checkout`,
//     metadata: {
//       email,
//       images: JSON.stringify(items.map((item) => item.image)),
//     },
//   });

//   res.status(200).json({ id: session.id });
// };

// ---------------

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // shipping_rates: ['shr_1N2hN1SAfPIyvQrZrbEoU7Lr', 'shr_1N2hP2SAfPIyvQrZk8EZXFei'],
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "inr",
          },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 2,
            },
            maximum: {
              unit: "business_day",
              value: 3,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 100,
            currency: "inr",
          },
          display_name: "Next day delivery",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],

    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    phone_number_collection: {
      enabled: true,
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
