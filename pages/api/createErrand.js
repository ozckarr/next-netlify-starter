import { sanityClient } from "../../lib/sanity";

export default async function createErrand(req, res) {
  const {
    customer,
    description,
    date,
    isDone,
    isInvoiced,
    hoursTaken,
    milesDriven,
    _id,
  } = JSON.parse(req.body);
  await sanityClient
    .config({
      token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    })
    .create({
      _id,
      _type: "errand",
      isDone,
      isInvoiced,
      customer,
      description,
      date,
      hoursTaken,
      milesDriven,
    })
    .catch((err) => {
      console.error(err.message);
    });
  res.status(200).json({ errandSent: true });
}
