import Stripe from "stripe";
import { NextApiResponse, NextApiRequest } from "next";
import { buffer } from "micro";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res.status(400).send("Missing the stripe signature");
    
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET_KEY!
    );

  } catch (err) {
    return res.status(400).send("Webhook error" + err);
  }

  switch (event.type) {
    case "charge.succeeded":
      const chargeSucceed: any = event.data.object;

      if (typeof chargeSucceed.payment_intent === "string") {
        await prisma?.order.update({
          where: { paymentIntentId: chargeSucceed.payment_intent },
          data: { status: "complete", address: chargeSucceed.shipping?.address },
        });
      }
      break;
      default:
        console.log(`${event.type}`)
  }
  res.json({ reicived : true});
}
