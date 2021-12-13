import SectionBackground from "../sectionComponents/sectionBackground";
import { PortableText } from "../../lib/sanity";
import SectionFade from "../sectionComponents/sectionFade";
import { urlFor } from "../../lib/sanity";

export default function StartSection({ data, logoData }) {
  return (
    <SectionBackground
      backgroundImage={data.backgroundImage}
      className="startSection"
    >
      <div className="startSection-restrain">
        <div className="startSection-container">
          <div className="startSection-content section-content">
            {/*data.title && <h2 className="header header-blue">{data.title}</h2>*/}
            {logoData && logoData[0].logo && (
              <div className="startSection-logo-container header header-blue">
                <img
                  className="startSection-logo"
                  src={urlFor(logoData[0].logo).url()}
                  alt="logo"
                />
              </div>
            )}
            {data.body && (
              <div className="text text-black">
                <PortableText blocks={data.body} />
              </div>
            )}
          </div>
        </div>
        <div className="startSection-empty"></div>
      </div>
    </SectionBackground>
  );
}
