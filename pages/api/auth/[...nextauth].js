import NextAuth, { NextAuthOptions } from "next-auth";

import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import { sanityClient } from "../../../lib/sanity";

const options = {
  providers: [
    SanityCredentials(
      sanityClient.config({
        token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
      })
    ),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60 * 12, // 360 days
  },
  adapter: SanityAdapter(
    sanityClient.config({
      token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    })
  ),
};

export default (req, res) => NextAuth(req, res, options);
