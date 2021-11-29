import SectionBackground from "../sectionComponents/sectionBackground";
import { PortableText } from "../../lib/sanity";
import SectionFade from "../sectionComponents/sectionFade";

export default function StartSection({ data }) {
  return (
    <SectionBackground
      backgroundImage={data.backgroundImage}
      className="startSection"
    >
      <div className="startSection-restrain">
        <div className="startSection-container">
          <div className="startSection-content section-content">
            {data.title && <h2 className="header header-blue">{data.title}</h2>}
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
