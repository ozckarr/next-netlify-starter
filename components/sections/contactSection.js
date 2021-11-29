import { useEffect } from "react";

import SectionBackground from "../sectionComponents/sectionBackground";
import { Element } from "react-scroll";
import { PortableText } from "../../lib/sanity";
import Link from "next/link";

export default function ContactSection({ data }) {
  return (
    <Element name="contactSection">
      <SectionBackground className="contactSection">
        <div className="contactSection-content section-content">
          {data.title && <h2 className="header header-white">{data.title}</h2>}
          {data.contactInfo && (
            <div className="contactSection-container">
              {data.contactInfo.map((info) => (
                <div key={info._key} className="contactSection-box">
                  <h3 className="subheading-white">{info.title}</h3>
                  <div className="text text-white">
                    <PortableText blocks={info.body} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="contact-logo">
          <Link href="/app">
            <img src="/miniwhite.png" alt="mini-logo" />
          </Link>
        </div>
      </SectionBackground>
    </Element>
  );
}
