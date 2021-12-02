import Head from "next/head";
import StartSection from "../components/sections/startSection";
import SpaOchBadSection from "../components/sections/spaOchBadSection";
import AnlaggningSection from "../components/sections/anlaggningSection";
import ServiceSection from "../components/sections/serviceSection";
import ContactSection from "../components/sections/contactSection";

import Nav from "../components/nav";

import { NextSeo } from "next-seo";

import { sanityClient } from "../lib/sanity";

const logoQuery = `*[_type == "siteSettings"]{
  logo,
  whiteLogo
}`;

const startQuery = `*[_type == "startSection"]{
  _id,
  title,
  body,
  backgroundImage,
}`;

const spaOchBadQuery = `*[_type == "spaOchBadSection"]{
  _id,
  title,
  body,
  backgroundImage,
}`;

const anlaggningQuery = `*[_type == "anlaggningSection"]{
  _id,
  title,
  body,
  backgroundImage,
}`;

const serviceQuery = `*[_type == "serviceSection"]{
  _id,
  title,
  body,
  backgroundImage,
}`;

const contactQuery = `*[_type == "contactSection"]{
  _id,
  title,
  contactInfo[],
}`;

export default function Home({
  logoData,
  startData,
  spaOchBadData,
  anlaggningData,
  serviceData,
  contactData,
}) {
  return (
    <div>
      <NextSeo
        title="TS Spa och Fritid"
        description="Vi kan Spa...och fritid"
        canonical={process.env.NEXT_PUBLIC_URL}
      />
      <Head>
        <title>TS Spa och Fritid</title>
        <meta name="description" content="TS Spa och Fritid" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        ></link>

        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        ></link>

        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      {logoData ? <Nav data={logoData} /> : <p>load</p>}

      {startData ? <StartSection data={startData[0]} /> : <p>load</p>}
      {spaOchBadData ? (
        <SpaOchBadSection data={spaOchBadData[0]} />
      ) : (
        <p>load</p>
      )}
      {anlaggningData ? (
        <AnlaggningSection data={anlaggningData[0]} />
      ) : (
        <p>load</p>
      )}
      {serviceData ? <ServiceSection data={serviceData[0]} /> : <p>load</p>}
      {contactData ? <ContactSection data={contactData[0]} /> : <p>load</p>}
    </div>
  );
}

export async function getStaticProps() {
  const logoData = await sanityClient.fetch(logoQuery);

  const startData = await sanityClient.fetch(startQuery);
  const spaOchBadData = await sanityClient.fetch(spaOchBadQuery);
  const anlaggningData = await sanityClient.fetch(anlaggningQuery);
  const serviceData = await sanityClient.fetch(serviceQuery);
  const contactData = await sanityClient.fetch(contactQuery);

  return {
    props: {
      logoData,
      startData,
      spaOchBadData,
      anlaggningData,
      serviceData,
      contactData,
    },
  };
}
