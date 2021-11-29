import { sanityClient } from "../../lib/sanity";

export default async function deleteErrand(req, res) {
  const { _id } = JSON.parse(req.body);
  await sanityClient
    .config({
      token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    })
    .delete(_id)
    .catch((err) => {
      console.error(err.message);
    });
  res.status(200).json({ errandSent: true });
}
