import { buffer } from "micro";
import * as admin from "firebase-admin";

const serviceAccount = require("../../../permissions.json");

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const addOrderToDb = async (session) => {
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => console.log(`order placed : ${session.id}`));
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log(`err.message`, err.message);
      res.status(400).send(`webhook error : ${err.message} `);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log(`session`, session);

      return addOrderToDb(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`webhook error : ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
