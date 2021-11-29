import SectionBackground from "../sectionComponents/sectionBackground";
import { Element } from "react-scroll";
import { PortableText } from "../../lib/sanity";

export default function ServiceSection({ data }) {
  return (
    <Element name="serviceSection">
      <SectionBackground
        backgroundImage={data.backgroundImage}
        className="serviceSection"
      >
        <div className="serviceSection-content section-content">
          {data.title && <h2 className="header header-white">{data.title}</h2>}
          {data.body && (
            <div className="text text-white">
              <PortableText blocks={data.body} />
            </div>
          )}
        </div>
      </SectionBackground>
    </Element>
  );
}
