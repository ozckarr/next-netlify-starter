import SectionBackground from "../sectionComponents/sectionBackground";

import { Element } from "react-scroll";
import { PortableText } from "../../lib/sanity";

export default function AnlaggningSection({ data }) {
  return (
    <Element name="anlaggningSection">
      <SectionBackground
        backgroundImage={data.backgroundImage}
        className="anlaggningSection"
      >
        <div className="anlaggningSection-container">
          <div className="anlaggningSection-content section-content section-content-mirrored">
            {data.title && <h2 className="header header-blue">{data.title}</h2>}
            {data.body && (
              <div className="text text-black">
                <PortableText blocks={data.body} />
              </div>
            )}
          </div>
        </div>
      </SectionBackground>
    </Element>
  );
}
