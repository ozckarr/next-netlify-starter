import { sanityClient } from "../../lib/sanity";

export default async function checkErrand(req, res) {
  const {
    _id,
    isDone,
    isInvoiced,
    customer,
    date,
    description,
    hoursTaken,
    milesDriven,
  } = JSON.parse(req.body);

  await sanityClient
    .config({
      token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    })
    .createOrReplace({
      _id,
      isDone,
      isInvoiced,
      customer,
      date,
      description,
      hoursTaken,
      milesDriven,
    })
    .catch((err) => {
      console.error(err.message);
    });
  res.status(200).json({ errandSent: true });
}
