import { urlFor } from "../../lib/sanity";
import SectionFade from "../sectionComponents/sectionFade";

export default function SectionBackground({
  children,
  backgroundImage,
  className,
}) {
  return (
    <div
      className={`${backgroundImage ? "backgroundImage-background" : "korv"}`}
    >
      <div
        className={`section ${className} ${
          backgroundImage ? "backgroundImage-background" : "korv"
        }`}
        style={
          backgroundImage && {
            // Control Mazwidth here
            backgroundImage: `url("${urlFor(backgroundImage).url()}")`,
            maxWidth: backgroundImage ? "3000px" : "100vw",
          }
        }
      >
        {backgroundImage ? (
          <SectionFade>{children}</SectionFade>
        ) : (
          <>{children}</>
        )}
      </div>
    </div>
  );
}
