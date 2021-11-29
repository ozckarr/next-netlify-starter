import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav className="header"></nav>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
