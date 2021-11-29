import { signUpHandler } from "next-auth-sanity";
import { sanityClient } from "../../../lib/sanity";

export default signUpHandler(
  sanityClient.config({
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  })
);
