require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//建立checkout session
const createCheckoutSession = async (req, res) => {
  const domainUrl = process.env.WEB_API_URL;
  const { line_items, customer_email } = req.body;
  //check?
  if (!line_items || !customer_email) {
    return res.status(400).send({ error: "購物車裡沒有東西" });
  }

  try {
    let session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: line_items,
      customer_email: customer_email,
      success_url: `${domainUrl}/checkout/success`,
      cancel_url: `${domainUrl}/checkout/canceled`,
    });

    res.status(200).send({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "出現錯誤，無法建立訂單資訊" });
  }
};

module.exports = {
  createCheckoutSession,
};
