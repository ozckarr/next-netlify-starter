export default function sectionFade({ children }) {
  return (
    <div className="fade-background-container">
      <div className="fade-background-left"></div>
      {children}
      <div className="fade-background-right"></div>
    </div>
  );
}
