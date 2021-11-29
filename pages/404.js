import Link from "next/link";

const NotFound = () => {
  return (
    <div className="error-404">
      <div className="error-404-content">
        <h1>Error 404</h1>
        <h3>Nu har du simmat fel</h3>
        <Link href="/">
          <a>&larr; Gå tillbaka</a>
        </Link>
      </div>
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  );
};
export default NotFound;
